import React, { useState } from 'react';

const Slack = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels] = useState(['general', 'random', 'development']);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({
    general: [
      { id: 1, user: 'Slackbot', avatar: 'SB', color: 'bg-purple-900', textColor: 'text-purple-100', time: '10:00 AM', text: 'Welcome to the #general channel!' },
      { id: 2, user: 'User One', avatar: 'U1', color: 'bg-blue-900', textColor: 'text-blue-100', time: '10:05 AM', text: 'Hello everyone! Excited to be here.' }
    ],
    random: [
      { id: 1, user: 'User Two', avatar: 'U2', color: 'bg-green-900', textColor: 'text-green-100', time: '11:00 AM', text: 'Anyone want to get lunch?' }
    ],
    development: [
      { id: 1, user: 'Dev Guru', avatar: 'DG', color: 'bg-red-900', textColor: 'text-red-100', time: '9:00 AM', text: 'The new deploy is live!' }
    ]
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'User One',
      avatar: 'U1',
      color: 'bg-blue-900',
      textColor: 'text-blue-100',
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
    <div className="flex h-screen bg-[#1A1D21] text-[#D1D2D3] font-sans overflow-hidden w-full text-left">
      {/* Workspace Sidebar */}
      <div className="w-16 bg-[#121013] flex flex-col items-center py-4 space-y-4 flex-shrink-0 border-r border-[#313235]">
        <div className="w-10 h-10 bg-[#3F0E40] rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-[#4A154B]">
          W
        </div>
        <div className="w-10 h-10 bg-[#313235] rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-gray-500 text-2xl">
          +
        </div>
      </div>

      {/* Channel Sidebar */}
      <div className="w-64 bg-[#19171D] text-[#D1D2D3] flex flex-col flex-shrink-0 border-r border-[#313235]">
        <div className="p-4 border-b border-[#313235] flex justify-between items-center">
          <h1 className="font-bold text-lg truncate text-white m-0">Workspace Name</h1>
          <button className="p-1 hover:bg-[#313235] rounded text-[#D1D2D3]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-[#D1D2D3] text-sm font-semibold opacity-70 uppercase tracking-wider">Channels</div>
          <nav className="space-y-0.5">
            {channels.map(channel => (
              <div
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`px-4 py-1 cursor-pointer transition-colors ${activeChannel === channel ? 'bg-[#1164A3] text-white font-bold' : 'hover:bg-[#313235] text-[#D1D2D3]'}`}
              >
                # {channel}
              </div>
            ))}
          </nav>

          <div className="px-4 mt-6 mb-2 text-[#D1D2D3] text-sm font-semibold opacity-70 uppercase tracking-wider">Direct Messages</div>
          <nav className="space-y-0.5">
            <div className="px-4 py-1 hover:bg-[#313235] cursor-pointer text-[#D1D2D3] flex items-center">
              <span className="w-2 h-2 bg-[#2BAC76] rounded-full mr-2"></span>
              Slackbot
            </div>
            <div className="px-4 py-1 hover:bg-[#313235] cursor-pointer text-[#D1D2D3] flex items-center">
              <span className="w-2 h-2 bg-[#2BAC76] rounded-full mr-2"></span>
              User One (you)
            </div>
          </nav>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1A1D21]">
        {/* Header */}
        <header className="h-14 border-b border-[#313235] flex items-center px-4 justify-between flex-shrink-0 bg-[#1A1D21]">
          <div className="flex items-center">
            <h2 className="font-bold text-lg text-white m-0"># {activeChannel}</h2>
            <button className="ml-2 p-1 hover:bg-[#313235] rounded text-[#D1D2D3]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#222529] border border-[#313235] focus:bg-[#1A1D21] focus:border-[#1164A3] rounded px-2 py-1 text-sm w-64 transition-all text-[#D1D2D3] outline-none"
              />
            </div>
            <button className="p-1 hover:bg-[#313235] rounded text-[#D1D2D3]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages[activeChannel].map(msg => (
            <div key={msg.id} className="flex items-start group hover:bg-[#222529] -mx-4 px-4 py-1 transition-colors">
              <div className={`w-9 h-9 ${msg.color} rounded mr-3 flex-shrink-0 flex items-center justify-center font-bold ${msg.textColor}`}>{msg.avatar}</div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-bold mr-2 text-white hover:underline cursor-pointer">{msg.user}</span>
                  <span className="text-xs text-[#D1D2D3] opacity-60">{msg.time}</span>
                </div>
                <p className="text-[#D1D2D3] mt-0.5 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 flex-shrink-0">
          <div className="border border-[#313235] rounded-lg focus-within:border-[#D1D2D3] bg-[#1A1D21]">
            <div className="flex items-center p-2 border-b border-[#313235] bg-[#222529] rounded-t-lg">
              <button className="p-1 hover:bg-[#313235] rounded text-[#D1D2D3]">
                <span className="font-bold">B</span>
              </button>
              <button className="p-1 hover:bg-[#313235] rounded text-[#D1D2D3] ml-1 italic">
                I
              </button>
            </div>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${activeChannel}`}
                className="w-full p-3 bg-transparent focus:outline-none resize-none text-[#D1D2D3]"
                rows="2"
              ></textarea>
              <div className="flex justify-between items-center p-2">
                <div className="flex space-x-1">
                  <button type="button" className="p-1 hover:bg-[#313235] rounded text-[#D1D2D3]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className={`p-1 rounded transition-colors ${messageInput.trim() ? 'bg-[#007A5A] text-white hover:bg-[#005A43]' : 'bg-transparent text-[#D1D2D3] opacity-30 cursor-not-allowed'}`}
                  disabled={!messageInput.trim()}
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
