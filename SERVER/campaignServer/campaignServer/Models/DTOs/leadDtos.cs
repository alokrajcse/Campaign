using System;
using System.Collections.Generic;

namespace campaignServer.Models.DTOs
{
    public class LeadCreateDto
    {
        public string LeadId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CampaignId { get; set; } = string.Empty;
        public string? Segment { get; set; }
        public string? Status { get; set; } = "Active";
    }

    public class LeadDto : LeadCreateDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class BulkLeadRequestDto
    {
        public List<LeadCreateDto> Leads { get; set; } = new();
        public BulkOptions Options { get; set; } = new();
    }

    public class BulkOptions
    {
        public bool OverwriteExisting { get; set; } = false;
    }

    public class BulkLeadSummaryDto
    {
        public int Processed { get; set; }
        public int Inserted { get; set; }
        public int Updated { get; set; }
        public List<string> Duplicates { get; set; } = new();
        public List<RejectedRow> Rejected { get; set; } = new();

        public class RejectedRow
        {
            public int Row { get; set; }
            public int Index { get; set; }
            public string LeadId { get; set; } = string.Empty;
            public string Reason { get; set; } = string.Empty;
        }
    }
}
