import { Time } from '@/components/icons/UI';
import { InfoTag } from "./Tag";

export function TimePassed({value, metric}: { value: number, metric: string}) {
  let color = 'bg-gray-300';
  
  if (metric === 'year')
    color = 'bg-red-500';
  else if (metric === 'month')
    color = 'bg-orange-500';
  else if (metric === 'week')
    color = 'bg-yellow-400';

  return (
    <InfoTag className={` ${color} `} Icon={Time.passing}>
      {`${value} ${metric}s`}
    </InfoTag>
  )
}
