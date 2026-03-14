using Microsoft.AspNetCore.Mvc;
using MediTrack.Api.DTOs;
using MediTrack.Api.Services;

namespace MediTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly AppointmentService _appointmentService;

    public AppointmentsController(AppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var appointments = await _appointmentService.GetAllAsync();
        return Ok(appointments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var appointment = await _appointmentService.GetByIdAsync(id);
        if (appointment == null) return NotFound();
        return Ok(appointment);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAppointmentDto dto)
    {
        var appointment = await _appointmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = appointment.Id }, appointment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateAppointmentDto dto)
    {
        var appointment = await _appointmentService.UpdateAsync(id, dto);
        if (appointment == null) return NotFound();
        return Ok(appointment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _appointmentService.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}