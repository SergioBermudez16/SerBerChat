using System.ComponentModel.DataAnnotations;

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
