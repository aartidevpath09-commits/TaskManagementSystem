using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        // GET comments by task
        [HttpGet("task/{taskId}")]
        public IActionResult GetComments(int taskId)
        {
            var comments = _context.Comments
                .Include(c => c.User)
                .Where(c => c.TaskItemId == taskId)
                .ToList();

            return Ok(comments);
        }

        // POST comment
        [HttpPost]
        public IActionResult AddComment(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);
            _context.SaveChanges();

            return Ok(comment);
        }
    }
}