using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Models
{
	public class BannedWords
	{
		[Key]
		[Required]
		public int Id { get; set; }

		[Required]
		[MaxLength(250)]
		public string String { get; set; }

		public BannedWords() { }
	}
}
