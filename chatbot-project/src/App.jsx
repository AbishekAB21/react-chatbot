import { useState,useEffect,useRef } from "react";
import { Chatbot } from "supersimpledev";
import "./App.css";
import RobotProfileImage from'./assets/robot.png'
import UserProfileImage from'./assets/user.png'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);

    setInputText("");
  }

  return (
    <div className="text-field-container">
      <input
        className="text-field"
        placeholder="Send a message to chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div className={sender == "robot" ? "robot-message" : "user-message"}>
      {
        // if the value on the left of && is true the value to the right is taken
        sender == "robot" && (
          <img src={RobotProfileImage} className="chat-message-profile" />
        )
      }
      <div className="chat-message-text">{message}</div>
      {
        // if the value on the left of && is true the value to the right is taken
        sender == "user" && (
          <img src={UserProfileImage} className="chat-message-profile" />
        )
      }
    </div>
  );
}

function Messages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello chatbot",
      sender: "user",
      id: "id1",
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id: "id2",
    },
    {
      message: "Can you get me today's date?",
      sender: "user",
      id: "id3",
    },
    {
      message: "Today is September 30",
      sender: "robot",
      id: "id4",
    },
  ]);

  //const [chatMessages, setChatMessages] = array; // Array Destructuring ORDER MATTERS
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      <Messages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
