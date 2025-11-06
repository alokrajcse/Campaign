using campaignServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace campaignServer.Services
{
    public interface ILeadRepository
    {
        Task<Lead?> GetByLeadIdAsync(string leadId);
        Task<List<Lead>> GetFilteredLeadsAsync(string? campaignId, string? segment, string? email);
        Task AddAsync(Lead lead);
        Task UpdateAsync(Lead lead);
        Task SaveAsync();
        Task<List<Lead>> GetByLeadIdsOrEmailsAsync(List<string> identifiers);
        Task<List<Lead>> GetAllAsync();
        Task DeleteAsync(string leadId);
    }
}
