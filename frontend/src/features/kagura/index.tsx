import { HiPlus } from 'react-icons/hi';
import { FaReact } from 'react-icons/fa';
import { GoThumbsup, GoThumbsdown, GoPrimitiveDot } from 'react-icons/go';
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { BtnPrimary, BtnSecondary } from '@/components/Buttons';
import { KaguraProvider, useKagura } from './store/KaguraContext';

export function Kagura() {
  return (
    <KaguraProvider>
      <div className='w-full flex justify-center'>
        <div className='relative w-3/6'>
          <Categories />
          <AddItem />
          <Routine />
        </div>      
      </div>
    </KaguraProvider>
  )
}

function Categories() {
  const { kagura, setRoutine } = useKagura()!;
  
  if (kagura.isLoading)
    return <>Loading...</>

  if (kagura.isError)
    return <>Something went wrong...</>

  const data = kagura.data!

  return (
    <div className='p-4 w-full flex flex-col'>
      {
        data.map(value => {
          const { type, routines } = value;
          return (
            <div>
              <h4>{type}</h4>
              <div className='p-4 w-full flex'>
                {
                  routines.map(routine => {
                    const { category, cards } = routine;
                    return (
                      <Category
                        notifications={cards.length}
                        onClick={() => {
                          if (cards.length)
                            setRoutine([type, category]);
                        }} 
                      />
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
      <div className='p-4 w-full flex'>
        <Category1 />
        <Category1 />
        <Category1 />
      </div>
      <div className='p-4 w-full flex'>
        <Category2 />
        <Category2 />
        <Category2 />
      </div>
    </div>
  )
}

function Category(props: any) {
  return (
    <div {...props} className={`relative p-1.5 m-3 
        rounded-sm bg-gradient-to-br from-tanj-green to-[#46b07779] 
        transition-all ${props.className}
        ${props.notifications ? ' cursor-pointer hover:scale-105 ' : ' opacity-30 '}
      `}>
      <div className={`p-1.5 rounded-sm border-2 border-tanj-gray`}>
        <FaReact className={`fill-tanj-gray w-12 h-12`} />
      </div>
      <Notifications qtd={props.notifications} />
    </div>
  )
}

function Category1() {
  return (
    <div className={`relative p-1.5 m-3 rounded-sm bg-gradient-to-br from-yellow-500 to-red-500 cursor-pointer hover:scale-105 transition-all`}>
      <div className={`p-1.5 rounded-sm border-2 border-red-200`}>
        <FaReact className={`fill-red-200 w-12 h-12`} />
      </div>
      <Notifications qtd={8} />
    </div>
  )
}

function Category2() {
  return (
    <div className={`relative p-1.5 m-3 rounded-sm bg-gradient-to-br from-blue-400 to-blue-700  cursor-pointer hover:scale-105 transition-all`}>
      <div className={`p-1.5 rounded-sm border-2 border-blue-100`}>
        <FaReact className={`fill-blue-100 w-12 h-12`} />
      </div>
      <Notifications qtd={8} />
    </div>
  )
}

function Notifications({ qtd }: { qtd: number }) {
  if (qtd)
    return (
      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-tanj-pink flex justify-center items-center`}>
        <span className={`text-tanj-white text-sm`}>{qtd}</span>
      </div>
    )

  return null
}

function AddItem() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`absolute top-4 right-4`}>
      <BtnPrimary icon round
        onClick={() => setIsOpen(true)}
      >
        <HiPlus />
      </BtnPrimary>
      {
        isOpen && (
          <Modal closeFn={() => setIsOpen(false)}>
            <AddItemForm />
          </Modal>
        )
      }
    </div>
  )
}

function AddItemForm() {
  return (
    <div className='p-2'>
      <h4 className='text-tanj-white'>Insert a new card</h4>
      <form className='flex flex-col mb-4'>
        <label>
          <div className='text-tanj-white '>Type: </div>
          <input type="text" />
        </label>
        <label>
          <div className='text-tanj-white '>Requirements: </div>
          <textarea />
        </label>
        <label>
          <div className='text-tanj-white '>Category: </div>
          <input type="text" />
        </label>
      </form>
      <BtnPrimary type="submit">Create</BtnPrimary>
    </div>
  )
}

function Routine() {
  const { kagura, routine, setRoutine, evaluateCard } = useKagura()!;

  if (routine == null)
    return null;

  const [type, category] = routine;
  const { _id, requirements } = kagura.data?.find(k => k.type === type)?.routines.find(r => r.category === category)?.cards[0]!||{}
  
  const { mutate: takeNote } = evaluateCard;

  return (
    <Modal closeFn={()=> {setRoutine(null)}}>
      <div className={`relative select-none p-1.5 my-5 rounded-sm bg-gradient-to-br from-tanj-green to-tanj-gray`}>
        <div className={`p-1.5 mr-6 rounded-sm border-2 border-tanj-gray w-min inline-block`}>
          <FaReact className={`fill-tanj-gray w-12 h-12 inline-block`} />
        </div>
        <span className='font-bold text-lg'>{category}</span>
        <span className='absolute text-xs text-tanj-green bottom-1 right-1'>{type}</span>
      </div>
      <div className=''>
        <div className='w-80 h-64 p-4 m-2 overflow-auto custom-scrollbar'>
          <span className='text-tanj-green select-none'>
            {requirements}
          </span>
        </div>
        <div className='flex justify-center mt-6'>
          <BtnSecondary
            onClick={() => {
              takeNote({ card_id: _id, note: -1})
            }}
          >
            <GoThumbsdown className='p-1 w-7 h-7' />
          </BtnSecondary>
          <BtnSecondary
            onClick={() => {
              takeNote({ card_id: _id, note: 0})
            }}
          >
            <GoPrimitiveDot className='p-1 w-7 h-7' />
          </BtnSecondary>
          <BtnSecondary
            onClick={() => {
              takeNote({ card_id: _id, note: 1})
            }}
          >
            <GoThumbsup className='p-1 w-7 h-7' />   
          </BtnSecondary>
        </div>
      </div>
    </Modal>
  )
}