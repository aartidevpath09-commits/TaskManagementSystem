using System.Text.Json.Serialization;

namespace TaskManagementAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string? Title { get; set; }
        public string? Status { get; set; }

        public int ProjectId { get; set; }

        public Project? Project { get; set; }   // 🔥 nullable

        public int UserId { get; set; }

        public User? User { get; set; }         // 🔥 nullable
    }
}