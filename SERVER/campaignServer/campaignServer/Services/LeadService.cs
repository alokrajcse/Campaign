using campaignServer.Data;
using campaignServer.Models;
using Microsoft.EntityFrameworkCore;

namespace campaignServer.Services
{
    public class LeadService : ILeadService
    {
        private readonly AppDbContext _context;
        
        public LeadService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Lead>> GetAllAsync()
        {
            return await _context.Leads.ToListAsync();
        }

        public async Task<Lead?> GetByIdAsync(string leadId)
        {
            return await _context.Leads.FirstOrDefaultAsync(l => l.LeadId == leadId);
        }

        public async Task<Lead> AddAsync(Lead lead)
        {
            // Set default values
            lead.CreatedDate = DateTime.UtcNow;
            lead.UpdatedDate = DateTime.UtcNow;
            
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();
            return lead;
        }

        public async Task<Lead> UpdateAsync(Lead lead)
        {
            lead.UpdatedDate = DateTime.UtcNow;
            _context.Leads.Update(lead);
            await _context.SaveChangesAsync();
            return lead;
        }

        public async Task<bool> DeleteAsync(string leadId)
        {
            var lead = await GetByIdAsync(leadId);
            if (lead == null) return false;
            
            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Lead>> GetByFilterAsync(string? campaignId, string? segment, string? email)
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

        public async Task<List<Lead>> AddBulkAsync(List<Lead> leads)
        {
            foreach (var lead in leads)
            {
                lead.CreatedDate = DateTime.UtcNow;
                lead.UpdatedDate = DateTime.UtcNow;
            }
            
            _context.Leads.AddRange(leads);
            await _context.SaveChangesAsync();
            return leads;
        }
    }
}