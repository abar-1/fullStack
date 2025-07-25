using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        // Implementation to retrieve the user asynchronously
        return await dbContext.Users.FindAsync(GetUserId()) 
               ?? throw new UnauthorizedAccessException("No user found");
    }

    public string GetUserId()
    {
        // Implementation to retrieve the user ID
        return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier) 
               ?? throw new Exception("No user found");
    }

}