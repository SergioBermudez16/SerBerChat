using SerberChat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerberChat.Api.Repositories
{
	public interface ISerberChatRepository
	{
		void AddUser(User user);
		void DeleteUser(User user);
		List<BannedWords> GetBannedWordsList();
		IEnumerable<User> GetUsers(string getBy, string value="");
		bool IsUserBanned(string userName);
		User UpdateUser(User user,bool typing, string ConnectionId);
		bool UserNameExists(string userName);
		bool Save();
		void Write(ChatMessage message);
	}
}
