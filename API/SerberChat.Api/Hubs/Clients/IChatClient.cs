using SerberChat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Hubs.Clients
{
	public interface IChatClient
	{
		Task AddUser(User user);
		Task GetUsers(IEnumerable<User> users);
		Task UserTyping(User user, IEnumerable<User> users);
		Task SendMessage(ChatMessage message);
		Task SendNotification(Notification notification);
		Task DeleteMessage(string id);
	}
}
