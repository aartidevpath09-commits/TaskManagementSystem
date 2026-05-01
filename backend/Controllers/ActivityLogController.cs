using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityLogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/activitylog
        [HttpGet]
        public IActionResult GetLogs()
        {
            return Ok(_context.ActivityLogs.ToList());
        }
    }
}