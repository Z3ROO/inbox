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
      },
      {
        category: 'Category 1 A2',
        cards: [
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card 1',
          },
          {
            _id: 'qweqweqweqwe',
            requirements: 'lllllllas sadasdasdas asdasdasdasCard 1',
          },
          {
            _id: 'qweqweqweqwe',
            requirements: 'Questions can come in some many shapes and sizes that I should find a better way to display them.',
          }
        ]
      }

    ]
  },
  {
    area: 'Area 2',
    practical: [
      {
        category: 'Category 1 A2',
        cards: [
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card 1',
          },
          {
            _id: 'qweqweqweqwe',
            requirements: 'lllllllas sadasdasdas asdasdasdasCard 1',
          },
          {
            _id: 'qweqweqweqwe',
            requirements: `Questions can come in some many shapes and sizes that I should find a better way to display them.
Maybe this will solve my problems, at least I hope so.`,
          }
        ]
      }
    ],
    theoretical: [
      {
        category: 'Category 1 A2',
        cards: [
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card 2 question about somthing',
          },
          {
            _id: 'qweqweqweqwe',
            requirements: 'Card questino of that one thing that its not that other one',
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
    <div className='w-full pt-8 pb-16 flex justify-center items-center'>
      <div className='relative w-64'>
        <div className='relative z-10 w-full flex text-tanj-green font-bold text-lg select-none '>
          <div 
            className='w-32 h-12 flex justify-center items-center opacity-60 hover:opacity-100' 
            onClick={() => setMode('practical')}
            style={{
              cursor: mode === 'theoretical' ? 'pointer' : undefined,
              opacity: mode === 'practical' ? '1' : undefined
            }}
          >
            <span>Practical</span>
          </div>
          <div 
            className='w-32 h-12 flex justify-center items-center opacity-60 hover:opacity-100' 
            onClick={() => setMode('theoretical')}
            style={{
              cursor: mode === 'practical' ? 'pointer' : undefined,
              opacity: mode === 'theoretical' ? '1' : undefined
            }}
          >
            <span>Theoretycal</span>
          </div>
        </div>
        <div 
          className='top-0 absolute left-0 w-32 h-12 bg-tanj-gray rounded-sm transition'
          style={{
            transform: mode === 'practical' ? 'translateX(0)' : 'translateX(100%)'
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
  const [isPre, setIsPre] = useState<boolean>(false);
  return (
    <div 
      className='bg-tanj-white text-black' 
      style={{whiteSpace: isPre ? 'pre': undefined}} 
      onClick={() => setIsPre(prev => !prev)} 
    >
      {card.requirements}
    </div>
  );
}


