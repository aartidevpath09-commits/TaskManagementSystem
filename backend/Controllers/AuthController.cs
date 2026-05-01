using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using System.Linq;
using BCrypt.Net;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // 🔐 REGISTER
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            // Password hash कर
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        // 🔐 LOGIN (FIXED)
        [HttpPost("login")]
        public IActionResult Login(LoginModel model)   // ✅ इथे change
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == model.Email);

            if (user == null)
                return Unauthorized("User not found");

            // 🔥 DEBUG
            Console.WriteLine("Input Password: " + model.Password);
            Console.WriteLine("DB Password: " + user.Password);

            // 🔐 Verify password
            bool isValid = BCrypt.Net.BCrypt.Verify(model.Password, user.Password);

            if (!isValid)
                return Unauthorized("Invalid credentials");

            // ✅ Token return
            return Ok(new { token = "dummy-token" });
        }
    }
}