import { ChatContextProvider } from './context/chatContext';
import ChatView from './components/ChatView';

const App = () => {

  return (
    <ChatContextProvider>
      <ChatView />
    </ChatContextProvider>
  );
};

export default App;
