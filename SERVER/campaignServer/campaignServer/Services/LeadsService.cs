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
        private readonly ICampaignRepository _campaignRepo;
        public LeadService(ILeadRepository repo, ICampaignRepository campaignRepo) 
        {
            _repo = repo;
            _campaignRepo = campaignRepo;
        }

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
                Status = dto.Status,
                OpenRate = dto.OpenRate,
                ClickRate = dto.ClickRate,
                Conversions = dto.Conversions
            };

            await _repo.AddAsync(entity);
            await _repo.SaveAsync();
            
            // Update campaign metrics when lead is added
            try
            {
                Console.WriteLine($"Lead added successfully. Updating metrics for campaign: '{dto.CampaignId}'");
                await UpdateCampaignMetrics(dto.CampaignId);
                Console.WriteLine($"Campaign metrics updated successfully for: '{dto.CampaignId}'");
            }
            catch (Exception ex)
            {
                // Log error but don't fail the lead creation
                Console.WriteLine($"Error updating campaign metrics: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }

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
                        Status = l.Status,
                        OpenRate = l.OpenRate,
                        ClickRate = l.ClickRate,
                        Conversions = l.Conversions
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
                    existing.OpenRate = l.OpenRate;
                    existing.ClickRate = l.ClickRate;
                    existing.Conversions = l.Conversions;
                    await _repo.UpdateAsync(existing);
                    summary.Updated++;
                }
            }

            await _repo.SaveAsync();
            
            // Update campaign metrics for all affected campaigns
            var affectedCampaigns = req.Leads.Select(l => l.CampaignId).Distinct();
            foreach (var campaignId in affectedCampaigns)
            {
                await UpdateCampaignMetrics(campaignId);
            }
            
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
            existing.OpenRate = dto.OpenRate;
            existing.ClickRate = dto.ClickRate;
            existing.Conversions = dto.Conversions;
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

        private LeadDto MapToDto(Lead entity)
        {
            return new LeadDto
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
                UpdatedDate = entity.UpdatedDate,
                
                // Use stored engagement metrics
                OpenRate = entity.OpenRate,
                ClickRate = entity.ClickRate,
                Conversions = entity.Conversions,
                LastEngagementDate = entity.OpenRate > 0 ? entity.CreatedDate.AddDays(1) : null
            };
        }



        public async Task<MultiLeadSearchResponseDto> SearchMultipleLeadsAsync(MultiLeadSearchRequestDto request)
        {
            var identifiers = new List<string>();

            if (request.Identifiers != null && request.Identifiers.Any())
                identifiers.AddRange(request.Identifiers);

            if (!string.IsNullOrWhiteSpace(request.RawInput))
            {
                var lines = request.RawInput
                    .Split(new[] { '\n', '\r', ',', ';' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(x => x.Trim())
                    .Where(x => !string.IsNullOrWhiteSpace(x))
                    .ToList();

                identifiers.AddRange(lines);
            }

            identifiers = identifiers.Distinct(StringComparer.OrdinalIgnoreCase).ToList();

            if (!identifiers.Any())
            {
                return new MultiLeadSearchResponseDto
                {
                    Found = new List<LeadDto>(),
                    NotFound = new List<string>(),
                    Summary = new SearchSummaryDto
                    {
                        Requested = 0,
                        Found = 0,
                        NotFound = 0
                    }
                };
            }

            var searchTerms = identifiers.Select(i => i.ToLower()).ToList();
            var leads = await _repo.GetAllAsync();

            var found = leads
                .Where(l =>
                    searchTerms.Contains(l.LeadId.ToLower()) ||
                    searchTerms.Contains(l.Email.ToLower()) ||
        searchTerms.Contains(l.Name.ToLower())
                )
                .Select(MapToDto)
                .ToList();

            var foundIdentifiers = found
                .SelectMany(l => new[] { l.LeadId.ToLower(), l.Email.ToLower(), l.Name.ToLower() })
                .ToList();

            var notFound = searchTerms
                .Where(x => !foundIdentifiers.Contains(x))
                .Distinct()
                .ToList();

            return new MultiLeadSearchResponseDto
            {
                Found = found,
                NotFound = notFound,
                Summary = new SearchSummaryDto
                {
                    Requested = searchTerms.Count,
                    Found = found.Count,
                    NotFound = notFound.Count
                }
            };
        }

        public async Task<bool> DeleteLeadAsync(string leadId)
        {
            var existing = await _repo.GetByLeadIdAsync(leadId);
            if (existing == null)
                return false;

            await _repo.DeleteAsync(leadId);
            await _repo.SaveAsync();
            return true;
        }

        public async Task UpdateCampaignMetricsManually(string campaignName)
        {
            await UpdateCampaignMetrics(campaignName);
        }
        
        private async Task UpdateCampaignMetrics(string campaignName)
        {
            Console.WriteLine($"Updating metrics for campaign: {campaignName}");
            
            var campaigns = await _campaignRepo.GetAllAsync();
            var campaign = campaigns.FirstOrDefault(c => c.Name.Equals(campaignName, StringComparison.OrdinalIgnoreCase));
            
            if (campaign == null) 
            {
                Console.WriteLine($"Campaign not found: {campaignName}. Available campaigns: {string.Join(", ", campaigns.Select(c => c.Name))}");
                return;
            }
            
            var leads = await _repo.GetFilteredLeadsAsync(campaignName, null, null);
            var totalLeads = leads.Count();
            
            Console.WriteLine($"Found {totalLeads} leads for campaign {campaignName}");
            
            if (totalLeads > 0)
            {
                // Calculate actual engagement metrics from lead data
                var totalOpens = leads.Sum(l => l.OpenRate);
                var totalClicks = leads.Sum(l => l.ClickRate);
                var totalConversions = leads.Sum(l => l.Conversions);
                
                // Update campaign with calculated values
                var oldOpenRate = campaign.OpenRate;
                campaign.TotalLeads = totalLeads;
                campaign.OpenRate = totalLeads > 0 ? (int)((totalOpens * 100.0) / totalLeads) : 0;
                campaign.ClickRate = totalLeads > 0 ? (int)((totalClicks * 100.0) / totalLeads) : 0;
                campaign.ConversionRate = totalLeads > 0 ? (int)((totalConversions * 100.0) / totalLeads) : 0;
                campaign.Revenue = totalConversions * 150; // $150 average revenue per conversion
                
                Console.WriteLine($"Calculated from {totalLeads} leads: Opens={totalOpens}, Clicks={totalClicks}, Conversions={totalConversions}");
                Console.WriteLine($"Updated metrics - OpenRate: {oldOpenRate} -> {campaign.OpenRate}, ClickRate: {campaign.ClickRate}, ConversionRate: {campaign.ConversionRate}");
                
                await _campaignRepo.UpdateAsync(campaign);
                Console.WriteLine("Campaign metrics updated successfully in database");
            }
        }
    }
}
