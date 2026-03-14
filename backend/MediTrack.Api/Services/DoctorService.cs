using Microsoft.EntityFrameworkCore;
using MediTrack.Api.Data;
using MediTrack.Api.DTOs;
using MediTrack.Api.Models;

namespace MediTrack.Api.Services;

public class DoctorService
{
    private readonly AppDbContext _context;

    public DoctorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DoctorDto>> GetAllAsync()
    {
        return await _context.Doctors
            .Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Specialization = d.Specialization,
                Email = d.Email,
                CreatedAt = d.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<DoctorDto?> GetByIdAsync(int id)
    {
        return await _context.Doctors
            .Where(d => d.Id == id)
            .Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Specialization = d.Specialization,
                Email = d.Email,
                CreatedAt = d.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<DoctorDto> CreateAsync(CreateDoctorDto dto)
    {
        var doctor = new Doctor
        {
            Name = dto.Name,
            Specialization = dto.Specialization,
            Email = dto.Email
        };

        _context.Doctors.Add(doctor);
        await _context.SaveChangesAsync();

        return new DoctorDto
        {
            Id = doctor.Id,
            Name = doctor.Name,
            Specialization = doctor.Specialization,
            Email = doctor.Email,
            CreatedAt = doctor.CreatedAt
        };
    }

    public async Task<DoctorDto?> UpdateAsync(int id, UpdateDoctorDto dto)
    {
        var doctor = await _context.Doctors.FindAsync(id);
        if (doctor == null) return null;

        doctor.Name = dto.Name;
        doctor.Specialization = dto.Specialization;
        doctor.Email = dto.Email;

        await _context.SaveChangesAsync();

        return new DoctorDto
        {
            Id = doctor.Id,
            Name = doctor.Name,
            Specialization = doctor.Specialization,
            Email = doctor.Email,
            CreatedAt = doctor.CreatedAt
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var doctor = await _context.Doctors.FindAsync(id);
        if (doctor == null) return false;

        _context.Doctors.Remove(doctor);
        await _context.SaveChangesAsync();
        return true;
    }
}