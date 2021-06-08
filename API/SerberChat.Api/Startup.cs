using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using SerberChat.Api.Context;
using SerberChat.Api.Hubs;
using SerberChat.Api.Repositories;

namespace SerberChat.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<SerberChatContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			services.AddScoped<ISerberChatRepository, SerberChatRepository>();
			services.AddControllers();
			services.AddSignalR();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "SerberChat.Api", Version = "v1" });
			});
			services.AddCors(options =>
			{
				options.AddPolicy("ClientPermission", policy =>
				{
					policy.AllowAnyHeader()
						.AllowAnyMethod()
						.WithOrigins("http://localhost:3000")
						.AllowCredentials();
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SerberChat.Api v1"));
			}

			app.UseHttpsRedirection();

			app.UseCors("ClientPermission");

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				endpoints.MapHub<ChatHub>("/hubs/chat");
			});
		}
	}
}
