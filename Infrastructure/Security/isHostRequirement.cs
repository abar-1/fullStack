using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Persistence;

namespace Infrastructure.Security;

public class isHostRequirement : IAuthorizationRequirement
{

}

public class isHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
: AuthorizationHandler<isHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, isHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        var attendee = await dbContext.ActivityAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(aa => aa.UserId == userId && aa.Activity.Id == activityId);

        if (attendee == null) return;

        if(attendee.IsHost)
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail();
        }


    }
}