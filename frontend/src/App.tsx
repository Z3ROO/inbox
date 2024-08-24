import { Root } from '@/routes';
import { QueryClientProvider } from './lib/query';

export default function App() {
  return (
    <QueryClientProvider>
      <div className={`w-screen h-screen bg-gray-900`}>
        <Root />
      </div>
    </QueryClientProvider>
  );
}
