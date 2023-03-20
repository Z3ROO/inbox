import { RehearsalProvider } from './store/RehearsalContext';
import { Decks } from './components/Decks';
import { AddCardForm } from './components/AddCardForm';
import { DeckRoutine } from './components/DeckRoutine';
import { useState } from 'react';

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

export function RehearsalConfig() {
  const [mode, setMode] = useState('practical');
  
  return (
    <div className='w-full h-full'>
      <div className='relative w-48'>
        <div className='relative z-10 w-full flex'>
          <div className='w-24 h-16' onClick={() => setMode('practical')}>
            <span>Practical</span>
          </div>
          <div className='w-24 h-16' onClick={() => setMode('theoretical')}>
            <span>Theoretycal</span>
          </div>
        </div>
        <div 
          className='top-0 absolute left-0 w-24 h-16 bg-tanj-pink rounded-sm'
          style={{
            left: mode === 'practical' ? '0' : '50%'
          }}
        ></div>
      </div>
    </div>
  )
}
