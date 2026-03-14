namespace MediTrack.Api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Specialization { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
