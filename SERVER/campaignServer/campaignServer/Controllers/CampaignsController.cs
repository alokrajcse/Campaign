using campaignServer.Models;
using campaignServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace campaignServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController : ControllerBase
    {
        private readonly ICampaignService _service;

        public CampaignsController(ICampaignService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? name, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate,
                                                [FromQuery] string? agency, [FromQuery] string? buyer, [FromQuery] string? brand, [FromQuery] string? status)
        {
            var campaigns = await _service.GetFilteredAsync(name, startDate, endDate, agency, buyer, brand, status);
            return Ok(campaigns);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var campaign = await _service.GetByIdAsync(id);
            if (campaign == null) return NotFound();
            return Ok(campaign);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Campaign campaign)
        {
            var created = await _service.AddAsync(campaign);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Campaign campaign)
        {
            if (id != campaign.Id) return BadRequest("ID mismatch");
            var updated = await _service.UpdateAsync(campaign);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return Ok("Campaign deleted successfully");
        }

        [HttpGet("{id}/analytics")]
        public async Task<IActionResult> GetAnalytics(int id)
        {
            var analytics = await _service.GetCampaignAnalyticsAsync(id);
            if (analytics == null) return NotFound();
            return Ok(analytics);
        }

        [HttpGet("dropdown-data")]
        public IActionResult GetDropdownData()
        {
            var data = new
            {
                agencies = new[] { "Agency A", "Agency B", "Agency C" },
                buyers = new[] { "Buyer X", "Buyer Y", "Buyer Z" },
                brands = new[] { "Brand One", "Brand Two", "Brand Three" }
            };
            return Ok(data);
        }
    }
}
