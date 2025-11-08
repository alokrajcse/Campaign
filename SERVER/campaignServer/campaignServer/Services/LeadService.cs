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

        // Get all leads for user's organization
        public async Task<List<Lead>> GetByOrganizationAsync(int organizationId)
        {
            return await _context.Leads
                .Where(l => l.OrganizationId == organizationId)
                .ToListAsync();
        }

        // Get single lead (check organization ownership)
        public async Task<Lead?> GetByIdAsync(string leadId, int organizationId)
        {
            return await _context.Leads
                .FirstOrDefaultAsync(l => l.LeadId == leadId && l.OrganizationId == organizationId);
        }

        // Create new lead for user's organization
        public async Task<Lead> AddAsync(Lead lead, int organizationId)
        {
            lead.CreatedDate = DateTime.UtcNow;
            lead.OrganizationId = organizationId;
            
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();
            return lead;
        }

        // Update lead
        public async Task<Lead> UpdateAsync(Lead lead)
        {
            lead.UpdatedDate = DateTime.UtcNow;
            _context.Leads.Update(lead);
            await _context.SaveChangesAsync();
            return lead;
        }

        // Delete lead (check organization ownership)
        public async Task<bool> DeleteAsync(string leadId, int organizationId)
        {
            var lead = await GetByIdAsync(leadId, organizationId);
            if (lead == null) return false;
            
            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();
            return true;
        }

        // Filter leads by organization and campaign
        public async Task<List<Lead>> GetByFilterAsync(int organizationId, string? campaignId)
        {
            var leads = await _context.Leads
                .Where(l => l.OrganizationId == organizationId)
                .ToListAsync();
            
            if (!string.IsNullOrEmpty(campaignId))
            {
                leads = leads.Where(l => l.CampaignId == campaignId).ToList();
            }
                
            return leads;
        }

        // Add multiple leads for user's organization
        public async Task<List<Lead>> AddBulkAsync(List<Lead> leads, int organizationId)
        {
            foreach (var lead in leads)
            {
                lead.CreatedDate = DateTime.UtcNow;
                lead.OrganizationId = organizationId;
            }
            
            _context.Leads.AddRange(leads);
            await _context.SaveChangesAsync();
            return leads;
        }
    }
}