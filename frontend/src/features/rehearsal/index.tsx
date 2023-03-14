import { RehearsalProvider } from './store/RehearsalContext';
import { Decks } from './components/Decks';
import { AddCardForm } from './components/AddCardForm';
import { DeckRoutine } from './components/DeckRoutine';

export function Rehearsal() {
  return (
    <RehearsalProvider>
      <div className='w-full flex justify-center'>
        <div className='relative w-3/6'>
          <Decks />
          <AddCardForm />
          <DeckRoutine />
        </div>
      </div>
    </RehearsalProvider>
  )
}
