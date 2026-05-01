namespace TaskManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        // 🔐 New field for authentication
        public string? Password { get; set; }
    }
}