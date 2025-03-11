import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { GetUnread } from "../utils/perform_on_chat";
import { useAuth } from "../context/AuthContext";

export default function UnReadMessages({ chat_id }) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [unreads, setUnreads] = useState(0);

  useEffect(() => {
    const getUnreads = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/chats/unread?chat_id=${chat_id}&user_id=${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch unread count");
        const data = await res.json();
        return typeof data === "number" ? data : data.count;
      } catch (error) {
        console.error("Error fetching unreads:", error);
        return 0;
      }
    };

    getUnreads().then((unreadCount) => setUnreads(unreadCount));

    socket.on("unRead", ({ chat_id: socketChatId, user_id, unreads }) => {
      if (socketChatId === chat_id && user_id === user.id) {
        setUnreads(() => unreads);
      }
    });

    socket.on(
      "unReadOnMessage",
      ({ chat_id: socketChatId, user_id, unreads }) => {
        if (socketChatId === chat_id && user_id !== user.id) {
          setUnreads(() => unreads);
        }
      }
    );

    return () => {
      socket.off("unRead");
      socket.off("unReadOnMessage");
    };
  }, [chat_id, socket, user.id]);

  return (
    <div
      className={`bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full  border border-purple-400 ${
        unreads === 0 ? "hidden" : ""
      }`}
    >
      <span>{unreads}</span>
    </div>
  );
}
