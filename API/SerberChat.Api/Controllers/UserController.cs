using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SerberChat.Api.Hubs;
using SerberChat.Api.Hubs.Clients;
using SerberChat.Api.Models;
using SerberChat.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UserController : ControllerBase
	{
		private readonly IHubContext<ChatHub, IChatClient> _chatHub;
		private readonly ISerberChatRepository _repository;

		public UserController(IHubContext<ChatHub, IChatClient> chatHub, ISerberChatRepository repository)
		{
			_chatHub = chatHub;
			_repository = repository;
		}

		[HttpGet()]
		public IActionResult GetUsers()
		{
			var users = _repository.GetUsers(null);
			return Ok(users);
		}

		[HttpPost("login")]
		public IActionResult AddUser(User user)
		{
			if (user == null)
			{
				return BadRequest();
			}
			if (_repository.IsUserBanned(user.Name))
			{
				return BadRequest();
			}
			if (_repository.UserNameExists(user.Name))
			{
				return BadRequest();
			}

			_repository.AddUser(user);
			if (!_repository.Save())
			{
				return BadRequest();
			}
			return Ok(user);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteUser(string id)
		{
			var user = _repository.GetUsers("id",id);
			_repository.DeleteUser(user.ElementAt(0));

			if (!_repository.Save())
			{
				throw new Exception($"Deleting author {id} failed on save.");
			}
			return Ok();
		}
	}
}
