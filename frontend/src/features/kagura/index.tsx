import { HiPlus } from 'react-icons/hi';
import { FaReact, FaCheck } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { FaTrashAlt } from "react-icons/fa";
import { GoThumbsup, GoThumbsdown, GoPrimitiveDot } from 'react-icons/go';
import { Modal } from "@/components/Modal";
import { useEffect, useMemo, useRef, useState } from "react";
import { BtnPrimary, BtnSecondary } from '@/components/Buttons';
import { KaguraProvider, useKagura } from './store/KaguraContext';
import { InputWithOptions, Textarea } from '@/components/Forms';
import { useQuery } from 'react-query';
import * as KaguraAPI from './api/index'
import * as Icons from '@/components/icons/kagura'

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
              <h4 className='text-tanj-green'>{type}</h4>
              <div className='p-4 w-full flex'>
                {
                  routines.map(routine => {
                    const { category, cards } = routine;
                    if (cards.length)
                      return (
                        <Category
                          notifications={cards.length}
                          category={category}
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
                        <Category category={category} />
                      )

                    return null
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

function Category(props: any) {
  const icon:string = props.category || 'Routine';
  const Icon = Icons[icon as keyof typeof Icons] || Icons['Routine' as keyof typeof Icons];

  return (
    <div {...props} className={`relative p-1.5 m-3 
        rounded-sm bg-gradient-to-br from-tanj-green to-[#46b07779] 
        transition-all ${props.className}
        ${props.notifications ? ' cursor-pointer hover:scale-105 ' : ' opacity-30 '}
      `}>
      <div className={`p-1.5 rounded-sm border-2 border-tanj-gray`}>
        <Icon className={`fill-tanj-gray w-12 h-12`} />
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

  const [typeInput, setTypeInput] = useState(['', '']);
  const [requirementsInput, setRequirementsInput] = useState('');
  const [categoryInput, setCategoryInput] = useState(['', '']);

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
            {type: typeInput[1] !== '' ? typeInput[1] : typeInput[0], requirements: requirementsInput, category: categoryInput[1] !== '' ? categoryInput[1] : categoryInput[0]},
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
  const { kagura, performingRoutine, evaluateCard } = useKagura()!;

  const [type, category] = performingRoutine!;
  const { _id, requirements } = kagura.data?.find(k => k.type === type)?.routines.find(r => r.category === category)?.cards[0]!||{}
  
  const { mutate: takeNote } = evaluateCard;

  const cardEngageDate = useRef<Date>(new Date());

  useEffect(() => {
    cardEngageDate.current = new Date();
  },[requirements]);

  return (
    <div className='relative'>
      <RoutineOptions card_id={_id} />
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

function RoutineOptions({card_id}: {card_id: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeCard } = useKagura()!;

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
              removeCard.mutate({card_id}, {
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