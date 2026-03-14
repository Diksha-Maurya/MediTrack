using Microsoft.EntityFrameworkCore;
using MediTrack.Api.Data;
using MediTrack.Api.DTOs;
using MediTrack.Api.Models;

namespace MediTrack.Api.Services;

public class AppointmentService
{
    private readonly AppDbContext _context;

    public AppointmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<AppointmentDto>> GetAllAsync()
    {
        return await _context.Appointments
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                PatientId = a.PatientId,
                PatientName = a.Patient.Name,
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor.Name,
                DateTime = a.DateTime,
                Status = a.Status,
                Notes = a.Notes,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<AppointmentDto?> GetByIdAsync(int id)
    {
        return await _context.Appointments
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .Where(a => a.Id == id)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                PatientId = a.PatientId,
                PatientName = a.Patient.Name,
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor.Name,
                DateTime = a.DateTime,
                Status = a.Status,
                Notes = a.Notes,
                CreatedAt = a.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<AppointmentDto> CreateAsync(CreateAppointmentDto dto)
    {
        var appointment = new Appointment
        {
            PatientId = dto.PatientId,
            DoctorId = dto.DoctorId,
            DateTime = dto.DateTime,
            Notes = dto.Notes,
            Status = "scheduled"
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        // Reload with related data
        return await GetByIdAsync(appointment.Id) ?? throw new Exception("Failed to retrieve appointment");
    }

    public async Task<AppointmentDto?> UpdateAsync(int id, UpdateAppointmentDto dto)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null) return null;

        appointment.DateTime = dto.DateTime;
        appointment.Status = dto.Status;
        appointment.Notes = dto.Notes;

        await _context.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null) return false;

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
        return true;
    }
}