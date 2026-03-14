using Microsoft.EntityFrameworkCore;
using MediTrack.Api.Models;

namespace MediTrack.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Patient> Patients { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Appointment> Appointments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Patient
        modelBuilder.Entity<Patient>()
            .Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        // Doctor
        modelBuilder.Entity<Doctor>()
            .Property(d => d.Email)
            .IsRequired()
            .HasMaxLength(150);

        modelBuilder.Entity<Doctor>()
            .HasIndex(d => d.Email)
            .IsUnique();

        // Appointment
        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Patient)
            .WithMany(p => p.Appointments)
            .HasForeignKey(a => a.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Doctor)
            .WithMany(d => d.Appointments)
            .HasForeignKey(a => a.DoctorId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}