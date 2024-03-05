import Inbox from './features/inbox';
import { ToDealList } from './features/toDeal';

export function HomePage() {
  return (
    <div className='flex h-screen' >
      <ToDealList />
      <Inbox />
    </div>
  );
}

