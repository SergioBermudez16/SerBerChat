using Microsoft.EntityFrameworkCore;
using SerberChat.Api.Models;
using System;
using System.Linq;

namespace SerberChat.Api.Context
{
	public class SerberChatContext : DbContext
	{
		public SerberChatContext(DbContextOptions<SerberChatContext> options) : base(options)
		{
		}

		public DbSet<User> User { get; set; }
		public DbSet<BannedWords> BannedWords { get; set; }
	}
}
