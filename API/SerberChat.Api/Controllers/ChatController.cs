using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SerberChat.Api.Context;
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
	public class ChatController : ControllerBase
	{
		private readonly IHubContext<ChatHub, IChatClient> _chatHub;
		private readonly ISerberChatRepository _repository;

		public ChatController(IHubContext<ChatHub, IChatClient> chatHub, ISerberChatRepository repository)
		{
			_chatHub = chatHub;
			_repository = repository;
		}

		[HttpPut("UserTyping")]
		public async Task UserTyping(string id, bool typing)
		{
			if (typing)
			{
				var userfromRepo = _repository.GetUsers("id",id).ElementAt(0);
				var userToPut = _repository.UpdateUser(userfromRepo,typing, null);

				if (!_repository.Save())
				{
					throw new Exception($"Updating user {id} failed on save.");
				}
				var users = _repository.GetUsers(null);
				await _chatHub.Clients.All.UserTyping(userToPut, users);
			}
		}

		[HttpPost("message")]
		public async Task SendMessage(ChatMessage chatMessage)
		{
			_repository.Write(chatMessage);
			await _chatHub.Clients.All.SendMessage(chatMessage);
		}

		[HttpPost("notification")]
		public async Task SendNotification(Notification notification)
		{
			notification.Id = System.Guid.NewGuid().ToString();
			await _chatHub.Clients.All.SendNotification(notification);
		}

		[HttpDelete("{id}")]
		public async Task DeleteMessage(string id)
		{
			await _chatHub.Clients.All.DeleteMessage(id);
		}

	}
}
