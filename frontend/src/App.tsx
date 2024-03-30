import { Root } from '@/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`w-screen h-screen bg-gray-900`}>
        <Root />
      </div>
    </QueryClientProvider>
  );
}
