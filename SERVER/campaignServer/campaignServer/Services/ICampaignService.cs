using campaignServer.Models;
using campaignServer.Models.DTOs;

namespace campaignServer.Services
{
    public interface ICampaignService
    {
        Task<List<Campaign>> GetAllAsync();
        Task<Campaign?> GetByIdAsync(int id);
        Task<Campaign> AddAsync(Campaign campaign);
        Task<Campaign> UpdateAsync(Campaign campaign);
        Task<bool> DeleteAsync(int id);
        Task<List<Campaign>> GetFilteredAsync(string? name, DateTime? startDate, DateTime? endDate, string? agency, string? buyer, string? brand, string? status);
        Task<CampaignAnalyticsResponseDto?> GetCampaignAnalyticsAsync(int campaignId);
    }
}