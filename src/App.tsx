import { QueryClient, QueryClientProvider } from 'react-query';
import Inbox from './features/inbox';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`w-screen h-screen flex justify-center bg-gray-800`}>
        <Inbox />
      </div>
    </QueryClientProvider>
  );
}

export default App;
