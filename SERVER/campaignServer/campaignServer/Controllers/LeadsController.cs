using Microsoft.AspNetCore.Mvc;
using campaignServer.Models;
using campaignServer.Services;

namespace campaignServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadService _service;
        
        public LeadsController(ILeadService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leads = await _service.GetAllAsync();
            return Ok(leads);
        }

        [HttpGet("{leadId}")]
        public async Task<IActionResult> GetById(string leadId)
        {
            var lead = await _service.GetByIdAsync(leadId);
            if (lead == null) return NotFound();
            return Ok(lead);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetByFilter([FromQuery] string? campaignId, [FromQuery] string? segment, [FromQuery] string? email)
        {
            var leads = await _service.GetByFilterAsync(campaignId, segment, email);
            return Ok(leads);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Lead lead)
        {
            var created = await _service.AddAsync(lead);
            return CreatedAtAction(nameof(GetById), new { leadId = created.LeadId }, created);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateBulk([FromBody] List<Lead> leads)
        {
            var created = await _service.AddBulkAsync(leads);
            return Ok(new { message = $"Added {created.Count} leads successfully", leads = created });
        }

        [HttpPut("{leadId}")]
        public async Task<IActionResult> Update(string leadId, [FromBody] Lead lead)
        {
            if (leadId != lead.LeadId) return BadRequest("ID mismatch");
            var updated = await _service.UpdateAsync(lead);
            return Ok(updated);
        }

        [HttpDelete("{leadId}")]
        public async Task<IActionResult> Delete(string leadId)
        {
            var deleted = await _service.DeleteAsync(leadId);
            if (!deleted) return NotFound();
            return Ok("Lead deleted successfully");
        }
    }
}
