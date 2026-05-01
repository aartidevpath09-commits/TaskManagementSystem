using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/task
        [HttpGet]
        public IActionResult GetTasks()
        {
            try
            {
                var tasks = _context.Tasks
                    .Include(t => t.Project)
                    .Include(t => t.User)
                    .ToList();

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // 🔥 real error show
            }
        }

        // POST: api/task
        [HttpPost]
        public IActionResult AddTask(TaskItem task)
        {
            _context.Tasks.Add(task);

            // 🔥 Activity Log
            _context.ActivityLogs.Add(new ActivityLog
            {
                Action = "Task Created",
                CreatedAt = DateTime.Now
            });

            _context.SaveChanges();
            return Ok(task);
        }

        // PUT: api/task/1
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem task)
        {
            var existing = _context.Tasks.Find(id);
            if (existing == null) return NotFound();

            existing.Title = task.Title;
            existing.Status = task.Status;
            existing.ProjectId = task.ProjectId;
            existing.UserId = task.UserId;

            // 🔥 Activity Log
            _context.ActivityLogs.Add(new ActivityLog
            {
                Action = "Task Updated",
                CreatedAt = DateTime.Now
            });

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/task/1
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);

            // 🔥 Activity Log
            _context.ActivityLogs.Add(new ActivityLog
            {
                Action = "Task Deleted",
                CreatedAt = DateTime.Now
            });

            _context.SaveChanges();

            return Ok();
        }
    }
}