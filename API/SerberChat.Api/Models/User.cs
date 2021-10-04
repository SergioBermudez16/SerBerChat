using System.ComponentModel.DataAnnotations;

namespace SerberChat.Api.Models
{
    public class User
	{
		[Key]
		[Required]
		public string Id { get; set; }

		public string ConnectionId { get; set; }

		[Required]
		[MaxLength(250)]
		public string Name { get; set; }

		[Required]
		public bool IsTyping { get; set; }

		public User(string id, string name)
		{
			Id = id;
			Name = name;
		}
	}
}
