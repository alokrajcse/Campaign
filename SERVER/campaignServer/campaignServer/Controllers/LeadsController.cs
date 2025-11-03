using Microsoft.AspNetCore.Mvc;
using campaignServer.Models.DTOs;
using campaignServer.Services;
using System.Threading.Tasks;

namespace campaignServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadService _service;
        public LeadsController(ILeadService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> AddLead([FromBody] LeadCreateDto dto)
        {
            var result = await _service.AddLeadAsync(dto);
            return Ok(result);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> AddBulk([FromBody] BulkLeadRequestDto req)
        {
            var result = await _service.AddBulkAsync(req);
            return Ok(result);
        }

        [HttpGet("{leadId}")]
        public async Task<IActionResult> GetLead(string leadId)
        {
            var lead = await _service.GetLeadByIdAsync(leadId);
            if (lead == null) return NotFound();
            return Ok(lead);
        }

        [HttpGet]
        public async Task<IActionResult> GetLeads([FromQuery] string? campaignId, [FromQuery] string? segment, [FromQuery] string? email)
        {
            var leads = await _service.GetLeadsAsync(campaignId, segment, email);
            return Ok(leads);
        }

        [HttpPut("{leadId}")]
        public async Task<IActionResult> UpdateLead(string leadId, [FromBody] LeadCreateDto dto)
        {
            var result = await _service.UpdateLeadAsync(leadId, dto);
            return Ok(result);
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportLeads([FromQuery] string format = "csv", [FromQuery] string? campaignId = null, [FromQuery] string? segment = null)
        {
            var bytes = await _service.ExportLeadsAsync(format, campaignId, segment);
            return File(bytes, "text/csv", "leads.csv");
        }
    }
}
