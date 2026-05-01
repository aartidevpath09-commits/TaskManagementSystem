namespace TaskManagementAPI.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string? Text { get; set; }

        public DateTime CreatedAt { get; set; }

        // 🔗 Relations (IDs required)
        public int TaskItemId { get; set; }

        public int UserId { get; set; }

        // 🔥 FIX: navigation properties optional केले
        public TaskItem? TaskItem { get; set; }

        public User? User { get; set; }
    }
}