
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDtos {
    [Required]
    public string DisplayName {get; set; } = "";
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    public string Password { get; set; } = "";
}