namespace Application.DTO;

public class BaseActivityDTO {
     
    public string Title { get; set; } = "";
    
    
    public DateTime Date { get;set; }
    
    
    public string Description { get; set; } = String.Empty;
    
    
    public string Category { get; set; } = "";
    
    
    public string City { get; set; } = "";
    
    
    public string Venue { get; set; } = "";
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
}