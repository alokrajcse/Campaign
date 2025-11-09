//using campaignServer.Helpers;

//namespace campaignServer.Tests
//{
//    public static class SegmentMapperTests
//    {
//        public static void RunTests()
//        {
//            // Campaign-based rules
//            Console.WriteLine("=== Campaign-Based Segment Tests ===");
//            Console.WriteLine($"Summer Sale 2025: {SegmentMapper.AssignSegment("Summer Sale 2025", "test@test.com", "+1234567890")}"); // Expected: Seasonal
//            Console.WriteLine($"Corporate Offer: {SegmentMapper.AssignSegment("Corporate Offer", "test@test.com", "+1234567890")}"); // Expected: Corporate
//            Console.WriteLine($"New Product Launch: {SegmentMapper.AssignSegment("New Product Launch", "test@test.com", "+1234567890")}"); // Expected: Early Adopters
            
//            // Email domain-based rules
//            Console.WriteLine("\n=== Email Domain-Based Segment Tests ===");
//            Console.WriteLine($"@company.com: {SegmentMapper.AssignSegment("Random Campaign", "john@company.com", "+1234567890")}"); // Expected: Corporate Leads
//            Console.WriteLine($"@edu.org: {SegmentMapper.AssignSegment("Random Campaign", "student@university.edu.org", "+1234567890")}"); // Expected: Student/Academic
//            Console.WriteLine($"@gmail.com: {SegmentMapper.AssignSegment("Random Campaign", "user@gmail.com", "+1234567890")}"); // Expected: General Public
//            Console.WriteLine($"@yahoo.com: {SegmentMapper.AssignSegment("Random Campaign", "user@yahoo.com", "+1234567890")}"); // Expected: General Public
            
//            // Phone number-based rules
//            Console.WriteLine("\n=== Phone Number-Based Segment Tests ===");
//            Console.WriteLine($"+1 (US): {SegmentMapper.AssignSegment("Random Campaign", "test@unknown.com", "+1234567890")}"); // Expected: US Leads
//            Console.WriteLine($"+91 (India): {SegmentMapper.AssignSegment("Random Campaign", "test@unknown.com", "+919876543210")}"); // Expected: India Leads
            
//            // Default segment
//            Console.WriteLine("\n=== Default Segment Test ===");
//            Console.WriteLine($"No match: {SegmentMapper.AssignSegment("Random Campaign", "test@unknown.com", "+44123456789")}"); // Expected: General
            
//            // Priority test (Campaign rules should take precedence)
//            Console.WriteLine("\n=== Priority Test ===");
//            Console.WriteLine($"Summer + @company.com: {SegmentMapper.AssignSegment("Summer Sale 2025", "john@company.com", "+1234567890")}"); // Expected: Seasonal (campaign takes priority)
//        }
//    }
//}