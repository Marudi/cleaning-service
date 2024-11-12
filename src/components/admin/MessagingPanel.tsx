import React, { useState } from 'react';
import { Send, Paperclip, Image, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

export default function MessagingPanel() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const chats = [
    { id: '1', name: 'Sarah Johnson', unread: 2 },
    { id: '2', name: 'Mike Wilson', unread: 0 }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: "I'll be at the next location in 10 minutes",
      timestamp: new Date(),
      type: 'text',
      status: 'read'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-3 h-[600px]">
        {/* Chat List */}
        <div className="border-r">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-65px)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{chat.name}</span>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                  {chats.find(c => c.id === selectedChat)?.name}
                </h3>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-xs opacity-75">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Image className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <button
                    disabled={!message.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}