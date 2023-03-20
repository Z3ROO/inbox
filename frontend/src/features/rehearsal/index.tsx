import { RehearsalProvider } from './store/RehearsalContext';
import { Decks } from './components/Decks';
import { AddCardForm } from './components/AddCardForm';
import { DeckRoutine } from './components/DeckRoutine';
import { useState } from 'react';
import { RehearsalByArea, RehearsalCard, RehearsalDeck } from './types';
import { RehearsalConfigContextProvider, useRehearsalConfigContext } from './store/RehearsalConfigContext';

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

const data: RehearsalByArea[] = [
  {
    area: 'Area 1',
    practical: [
      {
        category: 'Category 1',
        cards: [
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card 1',
          }
        ]
      }
    ],
    theoretical: [
      {
        category: 'Category 1',
        cards: [
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card 2',
          }
        ]
      }
    ]
  }
]

export function RehearsalConfig() {
  
  return (
    <RehearsalConfigContextProvider>
      <div className='w-full h-full'>
        <Mode />
        <div>
          {
            data.map(area => {
              return (
                <Area {...{area}} />
              )
            })
          }
        </div>
      </div>
    </RehearsalConfigContextProvider>
  )
}

function Mode() {
  const { mode, setMode } = useRehearsalConfigContext()!;

  return (
    <div className='w-full'>
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

function Area({area}:{area: RehearsalByArea}) {
  const { mode } = useRehearsalConfigContext()!;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <div>
      <div 
        className='bg-tanj-green'
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        {area.area}
      </div>
      {!isCollapsed && 
        area[mode].map(deck => {
          return (
            <Deck {...{deck}} />
          )
        })
      }
    </div>
  );
}

function Deck({deck}:{deck: RehearsalDeck}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <div>
      <div 
        className='bg-tanj-pink'
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        {deck.category}
      </div>
      {!isCollapsed &&
        deck.cards.map(card => {
          return (
            <Card {...{card}} />
          )
        })
      }
    </div>
  );
}

function Card({card}:{card: RehearsalCard }) {
  return (
    <div className='bg-tanj-white text-black'>
      {card.requirements}
    </div>
  );
}


