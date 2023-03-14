import { FaCheck } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { FaTrashAlt } from "react-icons/fa";
import { GoThumbsup, GoThumbsdown, GoPrimitiveDot } from 'react-icons/go';
import { Modal } from "@/components/Modal";
import { useEffect, useRef, useState } from "react";
import { BtnSecondary } from '@/components/Buttons';
import { useRehearsalContext } from '@/features/rehearsal/store/RehearsalContext';
import * as Icons from '@/components/icons/kagura'

export function DeckRoutine() {
  const { performingRoutine, setPerformingRoutine } = useRehearsalContext()!;

  return (
    <Modal isModalOpen={!!performingRoutine} closeFn={()=> {setPerformingRoutine(null)}}>
      <RoutineHeader />
      <RoutineBody />
    </Modal>
  )
}

function RoutineHeader() {
  const { performingRoutine } = useRehearsalContext()!;

  const [type, category] = performingRoutine!;

  const icon:string = category || 'Routine';
  const Icon = Icons[icon as keyof typeof Icons] || Icons['Routine' as keyof typeof Icons];

  return (
    <div className={`relative select-none p-1.5 my-5 rounded-sm bg-gradient-to-br from-tanj-green to-tanj-gray`}>
      <div className={`p-1.5 mr-6 rounded-sm border-2 border-tanj-gray w-min inline-block`}>
        <Icon className={`fill-tanj-gray w-12 h-12 inline-block`} />
      </div>
      <span className='font-bold text-lg'>{category.replace(/_/g, ' ')}</span>
      <span className='absolute text-xs text-tanj-green bottom-1 right-1'>{type.replace(/_/g, ' ')}</span>
    </div>
  )
}

function RoutineBody() {
  const { rehearsalDecks, performingRoutine, evaluateCard } = useRehearsalContext()!;

  const [type, category] = performingRoutine!;
  const { _id, requirements } = rehearsalDecks.data?.find(k => k.type === type)?.decks.find(r => r.category === category)?.cards[0]!||{};

  const cardEngageDate = useRef<Date>(new Date());

  useEffect(() => {
    cardEngageDate.current = new Date();
  },[requirements]);

  return (
    <div className='relative'>
      <RoutineOptions card_id={_id} />
      <div className='w-80 h-64 p-4 m-2 overflow-auto custom-scrollbar'>
        <pre>
          <span className='text-tanj-green select-none whitespace-pre-wrap break-words'>
              {requirements}
          </span>
        </pre>
      </div>
      <div className='flex justify-center mt-6'>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            evaluateCard({ card_id: _id, note: -1, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoThumbsdown className='p-1 w-7 h-7' />
        </BtnSecondary>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            evaluateCard({ card_id: _id, note: 0, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoPrimitiveDot className='p-1 w-7 h-7' />
        </BtnSecondary>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            evaluateCard({ card_id: _id, note: 1, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoThumbsup className='p-1 w-7 h-7' />   
        </BtnSecondary>
      </div>
    </div>
  )
}

function RoutineOptions({card_id}: {card_id: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeCard } = useRehearsalContext()!;

  const divStyle: React.CSSProperties = {
    backgroundColor: 'rgba(70, 176, 119, .1)',
    backdropFilter: 'blur(8px)'
  };

  return (
    <div style={isOpen ? divStyle : {} } className='absolute -top-4 right-0 rounded-sm'>
      <BtnSecondary icon 
        className='' 
        onClick={e => setIsOpen(prev => !prev)} 
      >
        <GoGear />
      </BtnSecondary>

      {
        isOpen &&
        <div className='flex flex-col'>
          <RoutineOptionsItem confirm 
            action={async () => {
              removeCard({card_id}, {
                onSuccess: () => {
                  setIsOpen(false);
                }
              });
            }}
          >
            <FaTrashAlt />
          </RoutineOptionsItem>          
        </div>
      }
    </div>
  )
}

function RoutineOptionsItem(props: { action: () => void, confirm?: boolean, children: JSX.Element}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { action, confirm, children } = props;

  return (
    <div className='relative'>
      <BtnSecondary icon 
        className=''
        onClick={e => {
          if (confirm) {
            setIsConfirmOpen(prev => !prev);
            return;
          }
          action();
        }}
      >
        {children}
      </BtnSecondary>
      { 
        isConfirmOpen && ( 
          <ConfirmationWidget 
            className='absolute top-0.5 left-[calc(100%+.5rem)]'
            y={() => { action(); setIsConfirmOpen(false); }} 
            n={() => setIsConfirmOpen(false)} 
          /> 
        )
      }
    </div>
  )
}

function ConfirmationWidget({y, n, className}: { y: () => void, n: () => void, className?: string}) {
  return (
    <div 
      style={{
        backdropFilter: 'blur(8px)'
      }}
      className={`flex rounded-sm bg-tanj-green bg-opacity-10 ${className}`}>
      <BtnSecondary icon onClick={n}>
        <ImCross className='w-2.5 h-2.5' />
      </BtnSecondary>
      <BtnSecondary icon onClick={y}>
        <FaCheck className='w-2.5 h-2.5' />
      </BtnSecondary>
    </div>
  )
}
