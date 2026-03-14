namespace MediTrack.Api.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateOnly Dob { get; set; }
        public string? Gender { get; set; }
        public string? Contact { get; set; }
        public string? BloodGroup { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
