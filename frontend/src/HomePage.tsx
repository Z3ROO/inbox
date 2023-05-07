import Inbox from './features/inbox';
import { Todo } from './features/todo-list';

export function HomePage() {
  return (
    <div className='flex h-screen' >
      <Todo />
      <Inbox />
    </div>
  );
}

