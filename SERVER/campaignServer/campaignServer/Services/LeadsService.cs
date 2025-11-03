using campaignServer.Helpers;
using campaignServer.Models;
using campaignServer.Models.DTOs;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace campaignServer.Services
{
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository _repo;
        public LeadService(ILeadRepository repo) => _repo = repo;

        public async Task<LeadDto> AddLeadAsync(LeadCreateDto dto)
        {
            var existing = await _repo.GetByLeadIdAsync(dto.LeadId);
            if (existing != null)
                throw new System.Exception("Lead with same LeadId already exists");

            var segment = dto.Segment ?? SegmentMapper.AssignSegment(dto.CampaignId, dto.Email, dto.Phone);
            var entity = new Lead
            {
                LeadId = dto.LeadId,
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                CampaignId = dto.CampaignId,
                Segment = segment,
                Status = dto.Status
            };

            await _repo.AddAsync(entity);
            await _repo.SaveAsync();

            return MapToDto(entity);
        }

        public async Task<BulkLeadSummaryDto> AddBulkAsync(BulkLeadRequestDto req)
        {
            var summary = new BulkLeadSummaryDto();

            foreach (var l in req.Leads)
            {
                summary.Processed++;
                var existing = await _repo.GetByLeadIdAsync(l.LeadId);

                if (existing != null && !req.Options.OverwriteExisting)
                {
                    summary.Duplicates.Add(l.LeadId);
                    continue;
                }

                var segment = SegmentMapper.AssignSegment(l.CampaignId, l.Email, l.Phone);

                if (existing == null)
                {
                    await _repo.AddAsync(new Lead
                    {
                        LeadId = l.LeadId,
                        Name = l.Name,
                        Email = l.Email,
                        Phone = l.Phone,
                        CampaignId = l.CampaignId,
                        Segment = segment,
                        Status = l.Status
                    });
                    summary.Inserted++;
                }
                else
                {
                    existing.Name = l.Name;
                    existing.Email = l.Email;
                    existing.Phone = l.Phone;
                    existing.CampaignId = l.CampaignId;
                    existing.Segment = segment;
                    existing.Status = l.Status;
                    await _repo.UpdateAsync(existing);
                    summary.Updated++;
                }
            }

            await _repo.SaveAsync();
            return summary;
        }

        public async Task<BulkLeadSummaryDto> ValidateBulkAsync(BulkLeadRequestDto req)
        {
            var summary = new BulkLeadSummaryDto();

            int index = 0;
            foreach (var l in req.Leads)
            {
                summary.Processed++;
                if (string.IsNullOrWhiteSpace(l.Email))
                {
                    summary.Rejected.Add(new BulkLeadSummaryDto.RejectedRow
                    {
                        Row = index + 1,
                        Index = index,
                        LeadId = l.LeadId,
                        Reason = "Email missing"
                    });
                }
                index++;
            }
            return summary;
        }

        public async Task<LeadDto?> GetLeadByIdAsync(string leadId)
        {
            var lead = await _repo.GetByLeadIdAsync(leadId);
            return lead == null ? null : MapToDto(lead);
        }

        public async Task<List<LeadDto>> GetLeadsAsync(string? campaignId, string? segment, string? email)
        {
            var leads = await _repo.GetFilteredLeadsAsync(campaignId, segment, email);
            return leads.Select(MapToDto).ToList();
        }

        public async Task<LeadDto> UpdateLeadAsync(string leadId, LeadCreateDto dto)
        {
            var existing = await _repo.GetByLeadIdAsync(leadId);
            if (existing == null)
                throw new System.Exception("Lead not found");

            existing.Name = dto.Name;
            existing.Email = dto.Email;
            existing.Phone = dto.Phone;
            existing.CampaignId = dto.CampaignId;
            existing.Segment = dto.Segment ?? SegmentMapper.AssignSegment(dto.CampaignId, dto.Email, dto.Phone);
            existing.Status = dto.Status;
            existing.UpdatedDate = System.DateTime.UtcNow;

            await _repo.UpdateAsync(existing);
            await _repo.SaveAsync();

            return MapToDto(existing);
        }

        public async Task<byte[]> ExportLeadsAsync(string format, string? campaignId, string? segment)
        {
            var leads = await _repo.GetFilteredLeadsAsync(campaignId, segment, null);

            var csv = new StringBuilder();
            csv.AppendLine("LeadId,Name,Email,Phone,CampaignId,Segment,Status,CreatedDate");
            foreach (var l in leads)
            {
                csv.AppendLine($"{l.LeadId},{l.Name},{l.Email},{l.Phone},{l.CampaignId},{l.Segment},{l.Status},{l.CreatedDate:yyyy-MM-dd}");
            }

            return Encoding.UTF8.GetBytes(csv.ToString());
        }

        private LeadDto MapToDto(Lead entity) =>
            new LeadDto
            {
                Id = entity.Id,
                LeadId = entity.LeadId,
                Name = entity.Name,
                Email = entity.Email,
                Phone = entity.Phone,
                CampaignId = entity.CampaignId,
                Segment = entity.Segment,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
                UpdatedDate = entity.UpdatedDate
            };
    }
}
