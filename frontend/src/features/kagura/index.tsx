import { HiPlus } from 'react-icons/hi';
import { FaReact } from 'react-icons/fa';
import { GoThumbsup, GoThumbsdown, GoPrimitiveDot } from 'react-icons/go';
import { Modal } from "@/components/Modal";
import { useEffect, useMemo, useRef, useState } from "react";
import { BtnPrimary, BtnSecondary } from '@/components/Buttons';
import { KaguraProvider, useKagura } from './store/KaguraContext';
import { InputWithOptions, Textarea } from '@/components/Forms';
import { useQuery } from 'react-query';
import * as KaguraAPI from './api/index'

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
  const { kagura, setPerformingRoutine } = useKagura()!;
  
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
                    if (cards.length)
                      return (
                        <Category
                          notifications={cards.length}
                          onClick={() => {
                            setPerformingRoutine([type, category]);
                          }} 
                        />
                      )

                    return null;
                  })
                }
                {
                  routines.map(routine => {
                    const { category, cards } = routine;

                    if (cards.length === 0)
                      return (
                        <Category />
                      )

                    return null
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
    <div className={`relative p-1.5 m-3 rounded-sm bg-gradient-to-br from-white to-yellow-500 cursor-pointer hover:scale-105 transition-all`}>
      <div className={`p-1.5 rounded-sm border-2 border-red-400`}>
        <FaReact className={`fill-red-400 w-12 h-12`} />
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
            <AddItemForm {...{setIsOpen}} />
          </Modal>
        )
      }
    </div>
  )
}

function AddItemForm({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { insertCard } = useKagura()!;

  const kaguraMetaData = useQuery('kagura-meta-data', KaguraAPI.getKaguraMetaData, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      const { types, categories } = data;

      setTypesOptions(types.map(t => 
        ({label: t.replace(/_/g, ' '), value: t})
      ));

      setCategoriesOptions(categories.map(c => 
        ({label: c.replace(/_/g, ' '), value: c})
      ));
    }
  });  

  const [typesOptions, setTypesOptions] = useState<{label: string, value: string}[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<{label: string, value: string}[]>([]);

  const [typeInput, setTypeInput] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  return (
    <div className='p-2'>
      <h4 className='text-tanj-white'>Insert a new card</h4>
      <form id="insert-card-form" className='flex flex-col mb-4 w-72'>
        <label>
          <div className='text-tanj-white '>Type: </div>
          <InputWithOptions className='w-full' initValue={''} options={typesOptions} value={typeInput} setValue={e => setTypeInput(e)} />
        </label>
        <label>
          <div className='text-tanj-white '>Requirements: </div>
          <Textarea className={`w-full resize-none h-32`} value={requirementsInput} onChange={e => setRequirementsInput(e.target.value)} />
        </label>
        <label>
          <div className='text-tanj-white '>Category: </div>
          <InputWithOptions className='w-full' initValue={''} options={categoriesOptions} value={categoryInput} setValue={e => setCategoryInput(e)} />
        </label>
      </form>
      <BtnPrimary type="submit" 
        form='insert-card-form'
        onClick={e => {
          e.preventDefault();
          insertCard.mutate(
            {type: typeInput, requirements: requirementsInput, category: categoryInput},
            {
              onSuccess: () => {
                setIsOpen(false);
              }
            }
          );
        }}
      >Create</BtnPrimary>
    </div>
  )
}

function Routine() {
  const { performingRoutine, setPerformingRoutine } = useKagura()!;
  
  if (performingRoutine == null)
    return null;

  return (
    <Modal closeFn={()=> {setPerformingRoutine(null)}}>
      <RoutineHeader />
      <RoutineBody />
    </Modal>
  )
}

function RoutineHeader() {
  const { performingRoutine } = useKagura()!;

  const [type, category] = performingRoutine!;

  return (
    <div className={`relative select-none p-1.5 my-5 rounded-sm bg-gradient-to-br from-tanj-green to-tanj-gray`}>
      <div className={`p-1.5 mr-6 rounded-sm border-2 border-tanj-gray w-min inline-block`}>
        <FaReact className={`fill-tanj-gray w-12 h-12 inline-block`} />
      </div>
      <span className='font-bold text-lg'>{category}</span>
      <span className='absolute text-xs text-tanj-green bottom-1 right-1'>{type}</span>
    </div>
  )
}

function RoutineBody() {
  const { kagura, performingRoutine, evaluateCard } = useKagura()!;

  const [type, category] = performingRoutine!;
  const { _id, requirements } = kagura.data?.find(k => k.type === type)?.routines.find(r => r.category === category)?.cards[0]!||{}
  
  const { mutate: takeNote } = evaluateCard;

  const cardEngageDate = useRef<Date>(new Date());

  useEffect(() => {
    cardEngageDate.current = new Date();
  },[requirements]);

  return (
    <div className=''>
      <div className='w-80 h-64 p-4 m-2 overflow-auto custom-scrollbar'>
        <span className='text-tanj-green select-none'>
          {requirements}
        </span>
      </div>
      <div className='flex justify-center mt-6'>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            takeNote({ card_id: _id, note: -1, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoThumbsdown className='p-1 w-7 h-7' />
        </BtnSecondary>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            takeNote({ card_id: _id, note: 0, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoPrimitiveDot className='p-1 w-7 h-7' />
        </BtnSecondary>
        <BtnSecondary
          onClick={() => {
            const finished_at = new Date();
            takeNote({ card_id: _id, note: 1, started_at: cardEngageDate.current, finished_at})
          }}
        >
          <GoThumbsup className='p-1 w-7 h-7' />   
        </BtnSecondary>
      </div>
    </div>
  )
}