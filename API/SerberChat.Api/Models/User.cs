using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
