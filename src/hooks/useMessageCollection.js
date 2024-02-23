import { useState } from 'react';

const useMessageCollection = () => {
  const initialMsg = {
    id: 1,
    text: 'Hello, how I can help you?',
    ai: true
  }
  const [messages, setMessages] = useState([initialMsg]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  }

  const clearMessages = () => setMessages([initialMsg])

  return [messages, addMessage, clearMessages];
}

export default useMessageCollection
