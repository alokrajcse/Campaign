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
            // Initialize metrics to zero when campaign is created
            c.TotalLeads = 0;
            c.OpenRate = 0;
            c.ClickRate = 0;
            c.ConversionRate = 0;
            c.Revenue = 0;
            await _repo.AddAsync(c);
        }
        public async Task UpdateAsync(Campaign c)
        {
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


    }
}
