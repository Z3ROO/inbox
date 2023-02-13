import { Notifications } from '@/components/Notifications';
import { FaReact, FaCheck } from 'react-icons/fa';
import { useKagura } from '@/features/kagura/store/KaguraContext';
import * as Icons from '@/components/icons/kagura'

export function Categories() {
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