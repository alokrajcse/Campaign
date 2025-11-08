using campaignServer.Models;
using campaignServer.Models.DTOs;

namespace campaignServer.Services
{
    public interface ILeadService
    {
        Task<List<Lead>> GetAllAsync();
        Task<Lead?> GetByIdAsync(string leadId);
        Task<Lead> AddAsync(Lead lead);
        Task<Lead> UpdateAsync(Lead lead);
        Task<bool> DeleteAsync(string leadId);
        Task<List<Lead>> GetByFilterAsync(string? campaignId, string? segment, string? email);
        Task<List<Lead>> AddBulkAsync(List<Lead> leads);
    }
}