using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/project
        [HttpGet]
        public IActionResult GetProjects()
        {
            return Ok(_context.Projects.ToList());
        }

        // POST: api/project
        [HttpPost]
        public IActionResult AddProject(Project project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();
            return Ok(project);
        }

        // PUT: api/project/1
        [HttpPut("{id}")]
        public IActionResult UpdateProject(int id, Project project)
        {
            var existing = _context.Projects.Find(id);
            if (existing == null) return NotFound();

            existing.Name = project.Name;
            existing.Description = project.Description;

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/project/1
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            var project = _context.Projects.Find(id);
            if (project == null) return NotFound();

            _context.Projects.Remove(project);
            _context.SaveChanges();

            return Ok();
        }
    }
}