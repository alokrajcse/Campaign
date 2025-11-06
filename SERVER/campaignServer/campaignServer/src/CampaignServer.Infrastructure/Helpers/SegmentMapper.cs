namespace campaignServer.Helpers
{
    public static class SegmentMapper
    {
        public static string AssignSegment(string campaignId, string email, string phone)
        {
            // Campaign-based rules (exact and partial matches)
            if (campaignId.Equals("Summer Sale 2025", StringComparison.OrdinalIgnoreCase) || 
                campaignId.Contains("Summer", StringComparison.OrdinalIgnoreCase))
                return "Seasonal";
            
            if (campaignId.Equals("Corporate Offer", StringComparison.OrdinalIgnoreCase) || 
                campaignId.Contains("Corporate", StringComparison.OrdinalIgnoreCase))
                return "Corporate";
            
            if (campaignId.Equals("New Product Launch", StringComparison.OrdinalIgnoreCase) || 
                campaignId.Contains("Launch", StringComparison.OrdinalIgnoreCase))
                return "Early Adopters";

            // Email domain-based rules
            if (email.EndsWith("@company.com", StringComparison.OrdinalIgnoreCase))
                return "Corporate Leads";
            
            if (email.EndsWith("@edu.org", StringComparison.OrdinalIgnoreCase))
                return "Student/Academic";
            
            if (email.EndsWith("@gmail.com", StringComparison.OrdinalIgnoreCase) || 
                email.EndsWith("@yahoo.com", StringComparison.OrdinalIgnoreCase))
                return "General Public";

            // Phone number-based rules (country codes)
            if (phone.StartsWith("+1"))
                return "US Leads";
            
            if (phone.StartsWith("+91"))
                return "India Leads";

            // Default segment
            return "General";
        }
    }
}
