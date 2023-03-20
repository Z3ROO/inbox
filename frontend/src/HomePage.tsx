import Inbox from './features/inbox';
import { Rehearsal } from './features/rehearsal';

export function HomePage() {
  return (
    <div className='flex flex-col items-center' >
      <Inbox />
      <Rehearsal />
    </div>
  );
}

