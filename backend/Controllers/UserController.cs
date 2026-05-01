using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/user
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_context.Users.ToList());
        }

        // POST: api/user
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        // PUT: api/user/1
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            var existing = _context.Users.Find(id);
            if (existing == null) return NotFound();

            existing.Name = user.Name;
            existing.Email = user.Email;

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/user/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok();
        }
    }
}