import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";

import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetUnread } from "../utils/perform_on_chat";
import ChatBody from "../components/ChatBody";
import { useSocket } from "../context/SocketContext";
import UnReadMesages from "./UnReadMessage";
import axios from "axios";

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setloading] = useState(false);
  const { socket, connectSocket, disconnectSocket } = useSocket();
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const chat_id = queryParams.get("chat_id");
  const chat_with = JSON.parse(queryParams.get("chat_with"));

  useEffect(() => {
    connectSocket();

    async function getChats() {
      const { user_id } = user;
      if (!user_id) {
        navigate("/");
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chats?user_id=${user_id}`,
          { withCredentials: true }
        );
        const chatData = res.data;
        console.log("chats", chatData);
        setChats(chatData || []);
      } catch (error) {
        console.log(error);
      }
    }

    getChats();
  }, [user.id]);

  const handleChatClick = (chat_id, chat_With) => {
    queryParams.set("chat_id", chat_id);
    queryParams.set("chat_with", JSON.stringify(chat_With));

    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className="mt-20 h-[80vh]">
      <Navbar />
      <div className="flex h-[80vh] bg-gray-100 p-4">
        {/* Sidebar */}
        <div className="w-1/3 bg-white p-4 border-r">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div class="relative mb-5">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiSearch size={17} />
            </div>
            <input
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Search Chat"
            />
          </div>

          <div className="space-y-3">
            {chats.length ? (
              chats.map((chat, idx) => {
                const chat_With =
                  chat.members[0].user_id === user.id
                    ? chat.members[1]
                    : chat.members[0];
                return (
                  <div
                    onClick={() => handleChatClick(chat._id, chat_With)}
                    className="flex items-center p-2 rounded-lg cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="w-full">
                      <div className="flex justify-between w-full ">
                        <p className="font-semibold">{chat_With.user_name}</p>
                        <p className="text-sm text-gray-500">3 min ago</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">hello</p>
                        <UnReadMesages chat_id={chat._id} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[50vh] w-full flex items-center justify-center">
                <span>No Chats!</span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        {chat_id ? (
          <ChatBody chat_id={chat_id} chat_with={chat_with} />
        ) : (
          <div className="flex items-center justify-center w-2/3">
            <p>Select one chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
// Using react-icons for simplicity
