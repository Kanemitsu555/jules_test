import React, { useState } from 'react';

const Slack = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels] = useState(['general', 'random', 'development']);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({
    general: [
      { id: 1, user: 'Slackbot', avatar: 'SB', color: 'bg-purple-200', textColor: 'text-purple-700', time: '10:00 AM', text: 'Welcome to the #general channel!' },
      { id: 2, user: 'User One', avatar: 'U1', color: 'bg-blue-200', textColor: 'text-blue-700', time: '10:05 AM', text: 'Hello everyone! Excited to be here.' }
    ],
    random: [
      { id: 1, user: 'User Two', avatar: 'U2', color: 'bg-green-200', textColor: 'text-green-700', time: '11:00 AM', text: 'Anyone want to get lunch?' }
    ],
    development: [
      { id: 1, user: 'Dev Guru', avatar: 'DG', color: 'bg-red-200', textColor: 'text-red-700', time: '9:00 AM', text: 'The new deploy is live!' }
    ]
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'User One',
      avatar: 'U1',
      color: 'bg-blue-200',
      textColor: 'text-blue-700',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageInput
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...prev[activeChannel], newMessage]
    }));
    setMessageInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      {/* Workspace Sidebar */}
      <div className="w-16 bg-indigo-950 flex flex-col items-center py-4 space-y-4 flex-shrink-0">
        <div className="w-10 h-10 bg-indigo-800 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-indigo-300">
          W
        </div>
        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-indigo-300">
          +
        </div>
      </div>

      {/* Channel Sidebar */}
      <div className="w-64 bg-indigo-900 text-indigo-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-indigo-800 flex justify-between items-center">
          <h1 className="font-bold text-lg truncate">Workspace Name</h1>
          <button className="p-1 hover:bg-indigo-800 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4 text-indigo-300 text-sm font-semibold uppercase tracking-wider">Channels</div>
          <nav className="space-y-0.5">
            {channels.map(channel => (
              <div
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`px-4 py-1 cursor-pointer ${activeChannel === channel ? 'bg-blue-600 text-white' : 'hover:bg-indigo-800 text-indigo-200'}`}
              >
                # {channel}
              </div>
            ))}
          </nav>

          <div className="px-4 mt-6 mb-4 text-indigo-300 text-sm font-semibold uppercase tracking-wider">Direct Messages</div>
          <nav className="space-y-0.5">
            <div className="px-4 py-1 hover:bg-indigo-800 cursor-pointer text-indigo-200 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Slackbot
            </div>
            <div className="px-4 py-1 hover:bg-indigo-800 cursor-pointer text-indigo-200 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              User One (you)
            </div>
          </nav>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b flex items-center px-4 justify-between flex-shrink-0">
          <div className="flex items-center">
            <h2 className="font-bold text-lg"># {activeChannel}</h2>
            <button className="ml-2 p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 border border-transparent focus:bg-white focus:border-indigo-500 rounded px-2 py-1 text-sm w-64 transition-all"
              />
            </div>
            <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages[activeChannel].map(msg => (
            <div key={msg.id} className="flex items-start">
              <div className={`w-9 h-9 ${msg.color} rounded mr-3 flex-shrink-0 flex items-center justify-center font-bold ${msg.textColor}`}>{msg.avatar}</div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-bold mr-2">{msg.user}</span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-800">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 flex-shrink-0">
          <div className="border-2 border-gray-200 rounded-lg focus-within:border-gray-400">
            <div className="flex items-center p-2 border-b border-gray-100 bg-gray-50">
              <button className="p-1 hover:bg-gray-200 rounded text-gray-600">
                <span className="font-bold">B</span>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded text-gray-600 ml-1 italic">
                I
              </button>
            </div>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${activeChannel}`}
                className="w-full p-3 focus:outline-none resize-none"
                rows="2"
              ></textarea>
              <div className="flex justify-between items-center p-2">
                <div className="flex space-x-1">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-1 rounded hover:bg-green-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slack;
