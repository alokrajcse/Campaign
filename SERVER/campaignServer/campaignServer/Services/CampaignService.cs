using campaignServer.Data;
using campaignServer.Models;
using campaignServer.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace campaignServer.Services
{
    public class CampaignService : ICampaignService
    {
        private readonly AppDbContext _context;
        
        public CampaignService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Campaign>> GetAllAsync()
        {
            return await _context.Campaigns.ToListAsync();
        }

        public async Task<Campaign?> GetByIdAsync(int id)
        {
            return await _context.Campaigns.FindAsync(id);
        }

        public async Task<Campaign> AddAsync(Campaign campaign)
        {
            campaign.TotalLeads = 0;
            campaign.OpenRate = 0;
            campaign.ClickRate = 0;
            campaign.ConversionRate = 0;
            campaign.Revenue = 0;
            
            _context.Campaigns.Add(campaign);
            await _context.SaveChangesAsync();
            return campaign;
        }

        public async Task<Campaign> UpdateAsync(Campaign campaign)
        {
            _context.Campaigns.Update(campaign);
            await _context.SaveChangesAsync();
            return campaign;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null) return false;
            
            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Campaign>> GetFilteredAsync(string? name, DateTime? startDate, DateTime? endDate, string? agency, string? buyer, string? brand, string? status)
        {
            var query = _context.Campaigns.AsQueryable();
            
            if (!string.IsNullOrEmpty(name))
                query = query.Where(c => c.Name.Contains(name));
            if (startDate.HasValue)
                query = query.Where(c => c.StartDate >= startDate.Value);
            if (endDate.HasValue)
                query = query.Where(c => c.EndDate <= endDate.Value);
            if (!string.IsNullOrEmpty(agency))
                query = query.Where(c => c.Agency == agency);
            if (!string.IsNullOrEmpty(buyer))
                query = query.Where(c => c.Buyer == buyer);
            if (!string.IsNullOrEmpty(brand))
                query = query.Where(c => c.Brand == brand);
            if (!string.IsNullOrEmpty(status))
                query = query.Where(c => c.Status == status);
                
            return await query.ToListAsync();
        }

        public async Task<CampaignAnalyticsResponseDto?> GetCampaignAnalyticsAsync(int campaignId)
        {
            var campaign = await GetByIdAsync(campaignId);
            if (campaign == null) return null;

            // Get leads for this campaign
            var leads = await _context.Leads
                .Where(l => l.CampaignId == campaign.Name)
                .ToListAsync();
            
            // Simple segment breakdown
            var segmentBreakdown = leads
                .GroupBy(l => l.Segment ?? "General")
                .Select(g => new SegmentBreakdownDto
                {
                    Name = g.Key,
                    Count = g.Count(),
                    Percentage = leads.Count > 0 ? (g.Count() * 100) / leads.Count : 0
                })
                .ToList();

            // Simple metrics calculation
            var totalLeads = leads.Count;
            var openedEmails = leads.Count(l => l.OpenRate > 0);
            var clickedLeads = leads.Count(l => l.ClickRate > 0);
            var convertedLeads = leads.Count(l => l.Conversions > 0);

            var metrics = new AnalyticsMetricsDto
            {
                TotalLeads = totalLeads,
                OpenRate = totalLeads > 0 ? (openedEmails * 100) / totalLeads : 0,
                ClickRate = totalLeads > 0 ? (clickedLeads * 100) / totalLeads : 0,
                ConversionRate = totalLeads > 0 ? (convertedLeads * 100) / totalLeads : 0,
                Revenue = convertedLeads * 150,
                CampaignDuration = (int)(campaign.EndDate - campaign.StartDate).TotalDays
            };

            return new CampaignAnalyticsResponseDto
            {
                Campaign = campaign,
                Segments = segmentBreakdown,
                Metrics = metrics
            };
        }
    }
}
