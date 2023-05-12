import * as InboxAPI from '@/features/inbox/api';
import { Item } from './ListItem';

export function List() {
  const queryTodos = InboxAPI.QueryInboxTodos();

  if (queryTodos.isError)
    return <>Something went wrong</>;
  else if (queryTodos.isLoading)
    return <>Loading...</>
  else if (queryTodos.isIdle)
    return <>Idle...</>

  const todos = queryTodos.data;

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar pr-6">
      {
        todos.map(todo => <Item todo={todo} />)
      }
    </div>
  )
}

