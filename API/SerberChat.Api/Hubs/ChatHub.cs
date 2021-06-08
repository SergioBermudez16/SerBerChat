using Microsoft.AspNetCore.SignalR;
using SerberChat.Api.Models;
using SerberChat.Api.Hubs.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SerberChat.Api.Repositories;

namespace SerberChat.Api.Hubs
{
	public class ChatHub : Hub<IChatClient>
	{
		private readonly ISerberChatRepository _repository;

		public ChatHub(ISerberChatRepository repository)
		{
			_repository = repository;
		}

		public override async Task OnConnectedAsync()
		{
			var newUserId = Context.GetHttpContext().Request.Query["userid"].ToString();
			var newUserName = Context.GetHttpContext().Request.Query["username"].ToString();
			var user = _repository.GetUsers("id", newUserId).ElementAt(0);
			if (user == null)
			{
				user = new User(newUserId, newUserName);
				_repository.AddUser(user);
			}
			_repository.UpdateUser(user, false, Context.ConnectionId);
			if (!_repository.Save())
			{
				throw new Exception($"Updating user {newUserId} failed on save.");
			}
			var users = _repository.GetUsers(null);
			await Clients.All.GetUsers(users);
		}

		public override async Task OnDisconnectedAsync(Exception exception)
		{
			var userConnectionId = Context.ConnectionId;
			var user = _repository.GetUsers("connectionId",userConnectionId).ElementAt(0);

			_repository.DeleteUser(user);

			if (!_repository.Save())
			{
				throw new Exception($"Deleting user {user.Id} failed on save.");
			}

			var users = _repository.GetUsers(null);
			await Clients.All.GetUsers(users);
		}
	}
}
