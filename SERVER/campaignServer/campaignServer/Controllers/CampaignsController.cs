using campaignServer.Models;
using campaignServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace campaignServer.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController: ControllerBase
    {

        private readonly CampaignService _service;

        public CampaignsController(CampaignService service) {
            _service = service;
                }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? name, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate,
                                                [FromQuery] string? agency, [FromQuery] string? buyer, [FromQuery] string? brand, [FromQuery] string? status)
        {
            var items = await _service.GetFilteredAsync(name, startDate, endDate, agency, buyer, brand, status);
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Campaign campaign)
        {
            await _service.AddAsync(campaign);
            return CreatedAtAction(nameof(GetById), new { id = campaign.Id }, campaign);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Campaign campaign)
        {
            if (id != campaign.Id) return BadRequest();
            await _service.UpdateAsync(campaign);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

        // Example: bulk upload endpoint — accepts parsed leads from frontend
        [HttpPost("leads/bulk")]
        public IActionResult BulkUpload([FromBody] object payload)
        {
            // Frontend should parse CSV/Excel and send JSON rows.
            // Implement lead->segment mapping logic here (per your rules).
            // For now return a stubbed response.
            return Ok(new { processed = 10, updated = 2, rejected = 1 });
        }
    }
}
