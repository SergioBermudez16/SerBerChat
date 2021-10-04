using System.ComponentModel.DataAnnotations;

namespace SerberChat.Api.Models
{
    public class Notification
	{
		[Key]
		[Required]
		public string Id { get; set; }
		[Required]
		public string UserName { get; set; }

		[Required]
		[MaxLength(250)]
		public string Case { get; set; }

		[Required]
		public string Time { get; set; }

		public Notification() { }
	}
}
