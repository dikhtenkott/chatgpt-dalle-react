import React from 'react';
import { MdComputer, MdAccountCircle } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from './Image';

const ChatMessage = (props) => {
  const { id, text, ai = false, selected, original } = props.message;

  return (
    <div
      className={`message-wrap ${ai ? 'ai-response' : ''}`}
      key={id}>
      <div className='message-icon'>
        {ai ? <MdComputer /> : <MdAccountCircle />}
      </div>
      {selected === 'DALLE' && ai ? (
        <Image url={text} message={original} />
      ) : (
        <div className='message'>
          <ReactMarkdown
            children={text}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || 'language-js');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{' '}
                  </code>
                );
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
