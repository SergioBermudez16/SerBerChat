using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using SerberChat.Api.Models;
using System.Configuration;

namespace SerberChat.Api.Context
{
	public class SerberChatContext : DbContext
	{
		public SerberChatContext(DbContextOptions<SerberChatContext> options) : base(options)
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			//base.OnConfiguring(optionsBuilder);
			//var config = ConfigurationManager.ConnectionStrings["DefaultConnection"];
			//var conn = new SqlConnection(config.ConnectionString);
			var conn = new SqlConnection("Data Source=localhost\\SQLEXPRESS;Initial Catalog=SerberChat;Integrated Security=False;");
			optionsBuilder.UseSqlServer(conn);

			//optionsBuilder.UseSqlServer(@"Data Source=(localdb)\LAPTOP-B66RMO8Q;Initial Catalog=SerberChat;");
			//optionsBuilder.UseSqlServer(@"data source =.\SQLEXPRESS; Integrated Security = SSPI; AttachDBFilename =| DataDirectory | aspnetdb.mdf; User Instance = true;");
		}

		public DbSet<User> User { get; set; }
		public DbSet<BannedWords> BannedWords { get; set; }
	}
}
