using campaignServer.Models;
using campaignServer.Models.DTOs;

namespace campaignServer.Services
{
    public class CampaignService
    {
        private readonly ICampaignRepository _repo;
        private readonly ILeadService _leadService;
        
        public CampaignService(ICampaignRepository repo, ILeadService leadService)
        {
            _repo = repo;
            _leadService = leadService;
        }

        public Task<IEnumerable<Campaign>> GetAllAsync() => _repo.GetAllAsync();
        public Task<Campaign?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
        public async Task AddAsync(Campaign c)
        {
            // Generate engagement metrics when campaign is created
            GenerateEngagementMetrics(c);
            await _repo.AddAsync(c);
        }
        public async Task UpdateAsync(Campaign c)
        {
            // Recalculate engagement metrics if total leads changed
            var existing = await _repo.GetByIdAsync(c.Id);
            if (existing != null && existing.TotalLeads != c.TotalLeads)
            {
                GenerateEngagementMetrics(c);
            }
            await _repo.UpdateAsync(c);
        }
        public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
        public Task<IEnumerable<Campaign>> GetFilteredAsync(string? name, DateTime? startDate, DateTime? endDate, string? agency, string? buyer, string? brand, string? status) =>
            _repo.GetFilteredAsync(name, startDate, endDate, agency, buyer, brand, status);

        public async Task<CampaignAnalyticsResponseDto?> GetCampaignAnalyticsAsync(int campaignId)
        {
            var campaign = await _repo.GetByIdAsync(campaignId);
            if (campaign == null) return null;

            // Get leads for this campaign - need to get actual Lead entities with engagement data
            var leadDtos = await _leadService.GetLeadsAsync(campaign.Name, null, null);
            
            // Calculate segment breakdown
            var segmentBreakdown = leadDtos
                .GroupBy(l => l.Segment ?? "General")
                .Select(g => new SegmentBreakdownDto
                {
                    Name = g.Key,
                    Count = g.Count(),
                    Percentage = leadDtos.Count > 0 ? (int)Math.Round((double)g.Count() / leadDtos.Count * 100) : 0
                })
                .ToList();

            // Calculate engagement metrics from actual lead data
            var totalLeads = leadDtos.Count;
            var openedEmails = leadDtos.Count(l => l.OpenRate > 0); // Assuming OpenRate > 0 means opened
            var clickedLeads = leadDtos.Count(l => l.ClickRate > 0); // Assuming ClickRate > 0 means clicked
            var convertedLeads = leadDtos.Count(l => l.Conversions > 0); // Assuming Conversions > 0 means converted

            // Calculate percentages
            var openRate = totalLeads > 0 ? (int)Math.Round((double)openedEmails / totalLeads * 100) : 0;
            var clickRate = totalLeads > 0 ? (int)Math.Round((double)clickedLeads / totalLeads * 100) : 0;
            var conversionRate = totalLeads > 0 ? (int)Math.Round((double)convertedLeads / totalLeads * 100) : 0;
            
            // Calculate revenue based on conversions
            var revenue = convertedLeads * 150; // Average revenue per conversion

            var metrics = new AnalyticsMetricsDto
            {
                TotalLeads = totalLeads,
                OpenRate = openRate,
                ClickRate = clickRate,
                ConversionRate = conversionRate,
                Revenue = revenue,
                CampaignDuration = (int)(campaign.EndDate - campaign.StartDate).TotalDays
            };

            // Don't update campaign metrics here - only update when leads are added

            return new CampaignAnalyticsResponseDto
            {
                Campaign = campaign,
                Segments = segmentBreakdown,
                Metrics = metrics
            };
        }

        private void GenerateEngagementMetrics(Campaign campaign)
        {
            var rand = new Random();
            int totalLeads = campaign.TotalLeads > 0 ? campaign.TotalLeads : 100; // Default to 100 if not set
            
            // Generate realistic engagement stats
            int opens = rand.Next((int)(totalLeads * 0.3), (int)(totalLeads * 0.8));  // 30–80% open rate
            int clicks = rand.Next((int)(opens * 0.2), (int)(opens * 0.6));           // 20–60% of opens clicked
            int conversions = rand.Next((int)(clicks * 0.1), (int)(clicks * 0.3));    // 10–30% of clicks converted
            
            // Calculate percentages
            campaign.OpenRate = (int)((opens * 100.0) / totalLeads);
            campaign.ClickRate = (int)((clicks * 100.0) / totalLeads);
            campaign.ConversionRate = (int)((conversions * 100.0) / totalLeads);
            campaign.Revenue = conversions * 150; // $150 average revenue per conversion
        }
    }
}
