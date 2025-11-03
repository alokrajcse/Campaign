using campaignServer.Data;
using campaignServer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace campaignServer.Services
{
    public class LeadRepository : ILeadRepository
    {
        private readonly AppDbContext _context;
        public LeadRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Lead?> GetByLeadIdAsync(string leadId)
        {
            return await _context.Leads.FirstOrDefaultAsync(l => l.LeadId == leadId);
        }

        public async Task AddAsync(Lead lead)
        {
            await _context.Leads.AddAsync(lead);
        }

        public async Task UpdateAsync(Lead lead)
        {
            _context.Leads.Update(lead);
            await Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<Lead>> GetFilteredLeadsAsync(string? campaignId, string? segment, string? email)
        {
            var query = _context.Leads.AsQueryable();

            if (!string.IsNullOrEmpty(campaignId))
                query = query.Where(l => l.CampaignId == campaignId);

            if (!string.IsNullOrEmpty(segment))
                query = query.Where(l => l.Segment == segment);

            if (!string.IsNullOrEmpty(email))
                query = query.Where(l => l.Email.Contains(email));

            return await query.ToListAsync();
        }
    }
}
