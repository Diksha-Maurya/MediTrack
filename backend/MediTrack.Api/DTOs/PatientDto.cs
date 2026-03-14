namespace MediTrack.Api.DTOs;

public class PatientDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateOnly Dob { get; set; }
    public string? Gender { get; set; }
    public string? Contact { get; set; }
    public string? BloodGroup { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreatePatientDto
{
    public string Name { get; set; } = string.Empty;
    public DateOnly Dob { get; set; }
    public string? Gender { get; set; }
    public string? Contact { get; set; }
    public string? BloodGroup { get; set; }
}

public class UpdatePatientDto
{
    public string Name { get; set; } = string.Empty;
    public DateOnly Dob { get; set; }
    public string? Gender { get; set; }
    public string? Contact { get; set; }
    public string? BloodGroup { get; set; }
}