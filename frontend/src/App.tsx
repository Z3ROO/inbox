import { QueryClient, QueryClientProvider } from 'react-query';
import Inbox from './features/inbox';
import { FocusedProjectsWidget } from './features/projects';
import { Rehearsal } from './features/rehearsal';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`w-screen h-screen flex flex-col items-center bg-gray-800`}>
        <div className='relative'>
          <div className='absolute right-[105%] top-16 w-full'>
            <FocusedProjectsWidget />
          </div>
          <Inbox />
        </div>
        <Rehearsal />
      </div>
    </QueryClientProvider>
  );
}

export default App;
