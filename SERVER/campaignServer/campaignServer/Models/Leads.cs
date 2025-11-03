using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace campaignServer.Models
{
    public class Lead
    {
        public int Id { get; set; }
        public string LeadId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CampaignId { get; set; } = string.Empty;
        public string? Segment { get; set; }
        public string? Status { get; set; } = "Active";

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }



    //public class Leads
    //{
    //    [Table("leads")]
    //    public class Lead
    //    {
    //        [Key]
    //        [Column("id")]
    //        public int Id { get; set; }

    //        [Required]
    //        [Column("lead_code")]
    //        [MaxLength(100)]
    //        public string LeadCode { get; set; } // maps from leadId in DTO

    //        [Required]
    //        [Column("name")]
    //        [MaxLength(150)]
    //        public string Name { get; set; }

    //        [Required]
    //        [Column("email")]
    //        [MaxLength(150)]
    //        public string Email { get; set; }

    //        [Column("phone")]
    //        [MaxLength(20)]
    //        public string Phone { get; set; }

    //        [Column("country_code")]
    //        [MaxLength(10)]
    //        public string CountryCode { get; set; }

    //        [Column("segment")]
    //        [MaxLength(100)]
    //        public string Segment { get; set; }

    //        [Column("campaign_id")]
    //        public int? CampaignId { get; set; }

    //        [Column("created_at")]
    //        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    //        [Column("updated_at")]
    //        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    //    }
    //}

}
