using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using campaignServer.Models;
using campaignServer.Services;

namespace campaignServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LeadsController : BaseController
    {
        private readonly ILeadService _service;
        
        public LeadsController(ILeadService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var organizationId = GetUserOrganizationId();
            var leads = await _service.GetByOrganizationAsync(organizationId);
            return Ok(leads);
        }

        [HttpGet("{leadId}")]
        public async Task<IActionResult> GetById(string leadId)
        {
            var organizationId = GetUserOrganizationId();
            var lead = await _service.GetByIdAsync(leadId, organizationId);
            if (lead == null) return NotFound();
            return Ok(lead);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetByFilter([FromQuery] string? campaignId)
        {
            var organizationId = GetUserOrganizationId();
            var leads = await _service.GetByFilterAsync(organizationId, campaignId);
            return Ok(leads);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Lead lead)
        {
            var organizationId = GetUserOrganizationId();
            var created = await _service.AddAsync(lead, organizationId);
            return CreatedAtAction(nameof(GetById), new { leadId = created.LeadId }, created);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateBulk([FromBody] List<Lead> leads)
        {
            var organizationId = GetUserOrganizationId();
            var created = await _service.AddBulkAsync(leads, organizationId);
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
            var organizationId = GetUserOrganizationId();
            var deleted = await _service.DeleteAsync(leadId, organizationId);
            if (!deleted) return NotFound();
            return Ok("Lead deleted successfully");
        }

        [HttpGet("export")]
        public async Task<IActionResult> Export([FromQuery] string format = "csv", [FromQuery] string? campaignId = null)
        {
            var organizationId = GetUserOrganizationId();
            var leads = await _service.GetByFilterAsync(organizationId, campaignId);
            
            if (format.ToLower() == "csv")
            {
                var csv = GenerateCsv(leads);
                var bytes = System.Text.Encoding.UTF8.GetBytes(csv);
                return File(bytes, "text/csv", $"leads-{campaignId ?? "all"}.csv");
            }
            
            return BadRequest("Unsupported format");
        }

        private string GenerateCsv(IEnumerable<Lead> leads)
        {
            var csv = new System.Text.StringBuilder();
            csv.AppendLine("LeadId,Name,Email,Phone,CampaignId,Segment,Status,CreatedDate");
            
            foreach (var lead in leads)
            {
                csv.AppendLine($"{lead.LeadId},{lead.Name},{lead.Email},{lead.Phone},{lead.CampaignId},{lead.Segment},{lead.Status},{lead.CreatedDate:yyyy-MM-dd}");
            }
            
            return csv.ToString();
        }
    }
}
