import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend } from 'react-icons/md';
import { davinci } from '../utils/davinci';
import { dalle } from '../utils/dalle';

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const options = ['ChatGPT', 'DALLE'];
  const [selected, setSelected] = useState(options[0]);
  const [messages, addMessage] = useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = (newValue, ai = false, selected, original) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      text: newValue,
      ai: ai,
      selected: `${selected}`,
      original,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const aiModel = selected;

    setLoading(true);
    setFormValue('');
    updateMessage(formValue, false, aiModel);
    try {
      if (aiModel === options[0]) {
        const response = await davinci(formValue);
        const data = response.data.choices[0].message.content;
        data && updateMessage(data, true, aiModel);
      } else {
        const response = await dalle(formValue);
        const data = response.data.data[0].url;
        data && updateMessage(data, true, aiModel, formValue);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className='chat-wrap'>
      <div className='messages'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        {loading && <div className='loading'>Loading...</div>}

        <span ref={messagesEndRef}></span>
      </div>
      <form onSubmit={sendMessage}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}>
          {options.map(item => (<option>{item}</option>))}
        </select>
        <textarea
          ref={inputRef}
          value={formValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button
          disabled={!formValue}>
          <MdSend size={30} />
        </button>
      </form>
    </div>
  );
};

export default ChatView;
