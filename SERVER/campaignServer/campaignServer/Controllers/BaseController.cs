using Microsoft.AspNetCore.Mvc;

namespace campaignServer.Controllers
{
    public class BaseController : ControllerBase
    {
        // Get user's organization ID from JWT token
        protected int GetUserOrganizationId()
        {
            var orgId = User.FindFirst("OrganizationId")?.Value;
            return int.Parse(orgId ?? "0");
        }
    }
}