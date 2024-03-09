import * as ToDealAPI from '@/features/toDeal/api';
import { Item } from './ListItem';

export function List() {
  const queryToDeals = ToDealAPI.QueryToDeals();

  if (queryToDeals.isError)
    return <>Something went wrong</>;
  else if (queryToDeals.isLoading)
    return <>Loading...</>
  else if (queryToDeals.isIdle)
    return <>Idle...</>

  const toDeals = queryToDeals.data;

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar pr-6">
      {
        toDeals.map(toDeal => <Item toDeal={toDeal} />)
      }
    </div>
  )
}

