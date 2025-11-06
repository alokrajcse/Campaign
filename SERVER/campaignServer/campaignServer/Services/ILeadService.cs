using campaignServer.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace campaignServer.Services
{
    public interface ILeadService
    {
        Task<LeadDto> AddLeadAsync(LeadCreateDto dto);
        Task<BulkLeadSummaryDto> AddBulkAsync(BulkLeadRequestDto req);
        Task<BulkLeadSummaryDto> ValidateBulkAsync(BulkLeadRequestDto req);
        Task<LeadDto?> GetLeadByIdAsync(string leadId);
        Task<List<LeadDto>> GetLeadsAsync(string? campaignId, string? segment, string? email);
        Task<LeadDto> UpdateLeadAsync(string leadId, LeadCreateDto dto);
        Task<byte[]> ExportLeadsAsync(string format, string? campaignId, string? segment);
        Task<MultiLeadSearchResponseDto> SearchMultipleLeadsAsync(MultiLeadSearchRequestDto request);
        Task<bool> DeleteLeadAsync(string leadId);
    }
}
