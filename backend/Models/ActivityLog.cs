namespace TaskManagementAPI.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public string? Action { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
