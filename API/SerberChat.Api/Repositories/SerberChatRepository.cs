using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SerberChat.Api.Context;
using SerberChat.Api.Hubs;
using SerberChat.Api.Hubs.Clients;
using SerberChat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Repositories
{
	public class SerberChatRepository : ISerberChatRepository
	{
		private readonly SerberChatContext _context;

		public SerberChatRepository(SerberChatContext context)
		{
			_context = context;
		}

		public void AddUser(User user)
		{
			if (user.Id == "0" || user.Id == "")
			{
				user.Id = System.Guid.NewGuid().ToString();
			}
			_context.User.Add(user);
		}

		public void DeleteUser(User user)
		{
			_context.User.Remove(user);
		}

		public List<BannedWords> GetBannedWordsList()
		{
			var bannedWords = _context.BannedWords.OrderBy(ob => ob.Id).ToList();
			bannedWords.ForEach(fe =>
			{
				fe.String = fe.String.ToLower();
			});
			return bannedWords;
		}

		public IEnumerable<User> GetUsers(string getBy, string value="")
		{
			List<User> users = new List<User>();
			switch (getBy)
			{
				case "id":
					users.Add(_context.User.FirstOrDefault(u => u.Id == value));
					break;

				case "connectionId":
					users.Add(_context.User.FirstOrDefault(u => u.ConnectionId == value));
					break;
				case "name":
					users.Add(_context.User.FirstOrDefault(u => u.Name == value));
					break;
				case null:
					users = _context.User.OrderBy(p => p.Name).ToList();
					break;
			}
			return users.ToList();
		}

		public bool IsUserBanned(string userName)
		{
			var bannedWords = GetBannedWordsList();
			foreach (var word in bannedWords)
			{
				if (userName.Contains(word.String))
				{
					return true;
				}
			}
			return false;
		}

		public bool Save()
		{
			return (_context.SaveChanges() >= 0);
		}

		public User UpdateUser(User user, bool typing, string connectionId)
		{
			if (connectionId != "" && connectionId != null)
			{
				user.ConnectionId = connectionId;
			}
			if (typing)
			{
				user.IsTyping = !user.IsTyping;
			}
			return user;
		}

		public bool UserNameExists(string userName)
		{
			var user = _context.User.FirstOrDefault(u => u.Name == userName);
			if (user == null)
				return false;

			return true;
		}

		public void Write(ChatMessage chatMessage)
		{
			chatMessage.Id = System.Guid.NewGuid().ToString();
			var message = chatMessage.Message.ToLower();
			var bannedWords = GetBannedWordsList();
			foreach (var word in bannedWords)
			{
				if (message.Contains(word.String))
				{
					chatMessage.Message = "Este mensaje se ha eliminado por incumplimiento de las normas";
					chatMessage.IsDeleted = true;
					break;
				}
			}
		}
	}
}
