using campaignServer.Models;

namespace campaignServer.Services
{
    public class CampaignService
    {
        private readonly ICampaignRepository _repo;
        public CampaignService(ICampaignRepository repo) => _repo = repo;

        public Task<IEnumerable<Campaign>> GetAllAsync() => _repo.GetAllAsync();
        public Task<Campaign?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
        public Task AddAsync(Campaign c) => _repo.AddAsync(c);
        public Task UpdateAsync(Campaign c) => _repo.UpdateAsync(c);
        public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
        public Task<IEnumerable<Campaign>> GetFilteredAsync(string? name, DateTime? startDate, DateTime? endDate, string? agency, string? buyer, string? brand, string? status) =>
            _repo.GetFilteredAsync(name, startDate, endDate, agency, buyer, brand, status);
    }
}
