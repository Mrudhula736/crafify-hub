import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerChat = () => {
  const [messages, setMessages] = useState([]);
  const message = useRef();
  const { receiverId } = useParams();
  const customer = JSON.parse(localStorage.getItem("customer"));
  const customerId = customer?.customer?.id;

  useEffect(() => {
    if (customerId) {
      fetchMessages();
    }
  }, [receiverId, customerId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/message/${customerId}/${receiverId}`
      );
      if (response.data.success) {
        setMessages(response.data.msg);
      } else {
        console.error("Error fetching messages:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (message.current.value.trim() === "") return;
      console.log(message.current.value, "message");
      const body = {
        content: message.current.value,
      };
      const response = await axios.post(
        `http://localhost:8080/message/customer/${customerId}/sending/${receiverId}`,
        body
      );
      if (response.data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: message.current.value,
            customer: true,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        console.error("Error sending message:", response.data.msg);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col h-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-y-auto px-4 py-2">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.senderId && message.senderId === customerId ? "text-right" : "text-left"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs mb-1">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                  <div
                    className={`inline-block rounded-lg px-3 py-2 ${
                      message.senderId === customerId
                        ? "bg-blue-500 text-white text-right"
                        : "bg-gray-200 text-gray-800 text-left"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-gray-200 py-2 px-4 flex items-center">
          <input
            type="text"
            className="flex-grow bg-white border border-gray-300 rounded-full py-2 px-4 mr-2 focus:outline-none"
            placeholder="Type a message..."
            ref={message}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
