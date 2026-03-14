namespace MediTrack.Api.DTOs;

public class AppointmentDto
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string PatientName { get; set; } = string.Empty;
    public int DoctorId { get; set; }
    public string DoctorName { get; set; } = string.Empty;
    public DateTime DateTime { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateAppointmentDto
{
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateTime DateTime { get; set; }
    public string? Notes { get; set; }
}

public class UpdateAppointmentDto
{
    public DateTime DateTime { get; set; }
    public string Status { get; set; } = "scheduled";
    public string? Notes { get; set; }
}