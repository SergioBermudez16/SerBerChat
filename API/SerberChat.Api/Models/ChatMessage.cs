﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Models
{
	public class ChatMessage
	{
		[Key]
		[Required]
		public string Id { get; set; }

		[Required]
		[MaxLength(250)]
		public string UserName { get; set; }

		[Required]
		public string Message { get; set; }

		[Required]
		public bool IsDeleted { get; set; }

		public ChatMessage() { }
	}
}
