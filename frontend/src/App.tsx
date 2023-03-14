import { QueryClient, QueryClientProvider } from 'react-query';
import Inbox from './features/inbox';
import { Rehearsal } from './features/rehearsal';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`w-screen h-screen flex flex-col items-center bg-gray-800`}>
        <Inbox />
        <Rehearsal />
      </div>
    </QueryClientProvider>
  );
}

export default App;
