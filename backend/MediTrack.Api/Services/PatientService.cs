using Microsoft.EntityFrameworkCore;
using MediTrack.Api.Data;
using MediTrack.Api.DTOs;
using MediTrack.Api.Models;

namespace MediTrack.Api.Services;

public class PatientService
{
    private readonly AppDbContext _context;

    public PatientService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PatientDto>> GetAllAsync()
    {
        return await _context.Patients
            .Select(p => new PatientDto
            {
                Id = p.Id,
                Name = p.Name,
                Dob = p.Dob,
                Gender = p.Gender,
                Contact = p.Contact,
                BloodGroup = p.BloodGroup,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<PatientDto?> GetByIdAsync(int id)
    {
        return await _context.Patients
            .Where(p => p.Id == id)
            .Select(p => new PatientDto
            {
                Id = p.Id,
                Name = p.Name,
                Dob = p.Dob,
                Gender = p.Gender,
                Contact = p.Contact,
                BloodGroup = p.BloodGroup,
                CreatedAt = p.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<PatientDto> CreateAsync(CreatePatientDto dto)
    {
        var patient = new Patient
        {
            Name = dto.Name,
            Dob = dto.Dob,
            Gender = dto.Gender,
            Contact = dto.Contact,
            BloodGroup = dto.BloodGroup
        };

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return new PatientDto
        {
            Id = patient.Id,
            Name = patient.Name,
            Dob = patient.Dob,
            Gender = patient.Gender,
            Contact = patient.Contact,
            BloodGroup = patient.BloodGroup,
            CreatedAt = patient.CreatedAt
        };
    }

    public async Task<PatientDto?> UpdateAsync(int id, UpdatePatientDto dto)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null) return null;

        patient.Name = dto.Name;
        patient.Dob = dto.Dob;
        patient.Gender = dto.Gender;
        patient.Contact = dto.Contact;
        patient.BloodGroup = dto.BloodGroup;

        await _context.SaveChangesAsync();

        return new PatientDto
        {
            Id = patient.Id,
            Name = patient.Name,
            Dob = patient.Dob,
            Gender = patient.Gender,
            Contact = patient.Contact,
            BloodGroup = patient.BloodGroup,
            CreatedAt = patient.CreatedAt
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null) return false;

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();
        return true;
    }
}