using campaignServer.Data;
using campaignServer.Models;
using Microsoft.EntityFrameworkCore;

namespace campaignServer.Services
{
    public class CampaignRepository : ICampaignRepository
    {
        private readonly AppDbContext _db;

        public CampaignRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task AddAsync(Campaign campaign)
        {
            _db.Campaigns.Add(campaign);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var e = await _db.Campaigns.FindAsync(id);
            if (e != null) { _db.Campaigns.Remove(e); await _db.SaveChangesAsync(); }
        }

        public async Task<IEnumerable<Campaign>> GetAllAsync() =>
           await _db.Campaigns.AsNoTracking().ToListAsync();

        public async Task<Campaign?> GetByIdAsync(int id) =>
            await _db.Campaigns.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);

        public async Task UpdateAsync(Campaign campaign)
        {
            _db.Campaigns.Update(campaign);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Campaign>> GetFilteredAsync(string? name, DateTime? startDate, DateTime? endDate, string? agency, string? buyer, string? brand, string? status)
        {
            var q = _db.Campaigns.AsQueryable();
            if (!string.IsNullOrEmpty(name)) q = q.Where(c => EF.Functions.Like(c.Name, $"%{name}%"));
            if (startDate.HasValue) q = q.Where(c => c.StartDate >= startDate.Value);
            if (endDate.HasValue) q = q.Where(c => c.EndDate <= endDate.Value);
            if (!string.IsNullOrEmpty(agency)) q = q.Where(c => c.Agency == agency);
            if (!string.IsNullOrEmpty(buyer)) q = q.Where(c => c.Buyer == buyer);
            if (!string.IsNullOrEmpty(brand)) q = q.Where(c => c.Brand == brand);
            if (!string.IsNullOrEmpty(status)) q = q.Where(c => c.Status == status);
            return await q.AsNoTracking().ToListAsync();
        }



    }
}
