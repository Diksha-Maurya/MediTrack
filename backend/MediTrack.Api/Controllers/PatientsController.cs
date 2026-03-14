using Microsoft.AspNetCore.Mvc;
using MediTrack.Api.DTOs;
using MediTrack.Api.Services;

namespace MediTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly PatientService _patientService;

    public PatientsController(PatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var patients = await _patientService.GetAllAsync();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var patient = await _patientService.GetByIdAsync(id);
        if (patient == null) return NotFound();
        return Ok(patient);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePatientDto dto)
    {
        var patient = await _patientService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = patient.Id }, patient);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdatePatientDto dto)
    {
        var patient = await _patientService.UpdateAsync(id, dto);
        if (patient == null) return NotFound();
        return Ok(patient);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _patientService.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}