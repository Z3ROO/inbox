import {Inbox} from './features/inbox';
import { TaskList } from './features/tasks/components/TaskList';
import { ToDealList } from './features/toDeal';

export function HomePage() {
  return (
    <div className='flex h-screen' >
      <ToDealList />
      <Inbox />
      <TaskList />
    </div>
  );
}

