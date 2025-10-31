namespace campaignServer.Models
{
    public class Campaign
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalLeads { get; set; }
        public int OpenRate { get; set; }    // percentage e.g. 45
        public int ConversionRate { get; set; } // percentage e.g. 12
        public string? Status { get; set; }   // Active | Completed | Draft
        public string? Agency { get; set; }
        public string? Buyer { get; set; }
        public string? Brand { get; set; }
    }
}
