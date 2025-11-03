namespace campaignServer.Helpers
{
    public static class SegmentMapper
    {
        public static string AssignSegment(string campaignId, string email, string phone)
        {
            if (campaignId.Contains("Summer", System.StringComparison.OrdinalIgnoreCase))
                return "Seasonal";
            if (campaignId.Contains("Corporate", System.StringComparison.OrdinalIgnoreCase))
                return "Corporate";
            if (campaignId.Contains("Launch", System.StringComparison.OrdinalIgnoreCase))
                return "Early Adopters";

            if (email.EndsWith("@company.com"))
                return "Corporate Leads";
            if (email.EndsWith("@edu.org"))
                return "Student/Academic";
            if (email.EndsWith("@gmail.com") || email.EndsWith("@yahoo.com"))
                return "General Public";

            if (phone.StartsWith("+1"))
                return "US Leads";
            if (phone.StartsWith("+91"))
                return "India Leads";

            return "General";
        }
    }
}
