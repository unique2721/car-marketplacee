import React, { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { IoAdd, IoSearch, IoBulb, IoMic } from "react-icons/io5";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

const ChatInput = ({ inputValue, sendMessage, setInput }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-lg">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything"
        className="w-full p-3 text-sm text-gray-400  rounded-t-lg border-none focus:ring-0 focus:outline-none"
      />

      {/* Buttons Container (Below the Input) */}
      <div className="flex justify-between items-center p-2 bg-white  rounded-b-xl gap-2">
        {/* Plus Button */}
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoAdd size={18} />
          </button>

          {/* Search Button (Globe) */}
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearch size={18} />
          </button>

          {/* Reason Button (Lightbulb) */}
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100  rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoBulb size={18} />
          </button>
        </div>

        {/* Voice Button (Mic) */}
        <button
          onClick={sendMessage}
          type="submit"
          className="text-white flex items-center gap-2 absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          <BsSend size={20} />
          Send
        </button>
      </div>
    </div>
  );
};

const Message = ({ msg, onVisible, chat_with }) => {
  const messageRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible(msg);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current);
      }
    };
  }, [msg, onVisible]);

  return (
    <div
      ref={messageRef}
      className={`mb-4 flex ${
        msg.user_id === user.id ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"
        alt="avatar"
        className="w-10 h-10 rounded-full mx-3"
      />
      <div className="flex-col flex">
        <div
          className={`flex gap-4 items-center mb-2 ${
            msg.user_id === user.id
              ? "justify-end flex-end"
              : "justify-start flex-start"
          }`}
        >
          <p>{chat_with.user_name}</p>
          <p className="text-xs text-gray-500">
            {(() => {
              const isoDate = msg.sent_at;
              const date = new Date(isoDate);
              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");
              return `${hours}:${minutes}`;
            })()}
          </p>
        </div>
        <div
          className={`inline-block p-3 rounded-lg ${
            msg.user_id === user.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {msg.content}
        </div>
      </div>
    </div>
  );
};

export default function ChatBody({ chat_id, chat_with }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { socket, connectSocket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    connectSocket();
    const getChat = async () => {
      const res = await fetch(
        `http://localhost:3000/api/chats/messages?chat_id=${chat_id}`
      );
      return await res.json();
    };
    getChat()
      .then((messages) => {
        setMessages(messages || []);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("receiveMessage", (data) => {
      console.log(data);
      if (data.chat_id === chat_id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleMessageVisible = async (msg) => {
    if (!msg.is_read && msg.user_id !== user.id) {
      socket.emit("readMessage", {
        message_id: msg._id,
        chat_id,
        user_id: user.id,
      });
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      console.log("should send the message");
      const message = {
        content: input,
        user_id: user.id,
        chat_id,
      };
      socket.emit("sendMessage", message);
      setInput("");
    }
  };
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{chat_with.user_name}</p>

          <p className="text-sm text-gray-500">Last visit Sep 16, 2024</p>
        </div>
      </div>

      {/* Messages Area with Fixed Height and Scroll */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message
              key={index}
              msg={msg}
              onVisible={handleMessageVisible}
              chat_with={chat_with}
            />
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-[20px] font-semibold text-black ">Say Hi👋!</p>
          </div>
        )}
      </div>

      <div className="px-2">
        <ChatInput
          sendMessage={sendMessage}
          setInput={setInput}
          inputValue={input}
        />
      </div>
    </div>
  );
}
