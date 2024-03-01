import Inbox from './features/inbox';
import { TodoList } from './features/todo-list';

export function HomePage() {
  return (
    <div className='flex h-screen' >
      <TodoList />
      <Inbox />
    </div>
  );
}

