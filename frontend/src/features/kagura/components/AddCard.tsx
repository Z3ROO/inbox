import { BtnPrimary } from "@/components/Buttons";
import { InputWithOptions, Textarea } from "@/components/Forms";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { useQuery } from "react-query";
import { useKagura } from "@/features/kagura/store/KaguraContext";
import * as KaguraAPI from '@/features/kagura/api/index'

export function AddCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`absolute top-4 right-4`}>
      <OpenModalButton {...{setIsModalOpen}} />
      <Modal {...{isModalOpen, closeFn: () => setIsModalOpen(false)}}>
        <AddCardForm {...{setIsModalOpen}} />
      </Modal>
    </div>
  )
}

function OpenModalButton({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <BtnPrimary icon round
      onClick={() => setIsModalOpen(true)}
    >
      <HiPlus className="w-4 h-4" />
    </BtnPrimary>
  )
}

function AddCardForm({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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

  const [difficulty, setDifficulty] = useState<1|2|3>(3);
  const [typeInput, setTypeInput] = useState(['', '']);
  const [requirementsInput, setRequirementsInput] = useState('');
  const [categoryInput, setCategoryInput] = useState(['', '']);

  return (
    <div className='p-2'>
      <h4 className='text-tanj-white'>Insert a new card</h4>
      <form id="insert-card-form" className='flex flex-col mb-4 w-72'>
        <DifficultyField {...{difficulty, setDifficulty}} />
        <label>
          <div className='text-tanj-white '>Type: </div>
          <InputWithOptions className='w-full' initValue={''} options={typesOptions} value={typeInput} setValue={e => setTypeInput(e)} />
        </label>
        <label>
          <div className='text-tanj-white '>Category: </div>
          <InputWithOptions className='w-full' initValue={''} options={categoriesOptions} value={categoryInput} setValue={e => setCategoryInput(e)} />
        </label>
        <label>
          <div className='text-tanj-white '>Requirements: </div>
          <Textarea className={`w-full resize-none h-32`} value={requirementsInput} onChange={e => setRequirementsInput(e.target.value)} />
        </label>
      </form>
      <BtnPrimary type="submit" 
        form='insert-card-form'
        onClick={e => {
          e.preventDefault();
          
          insertCard.mutate(
            { 
              type: typeInput[1] !== '' ? typeInput[1] : typeInput[0], 
              requirements: requirementsInput, 
              category: categoryInput[1] !== '' ? categoryInput[1] : categoryInput[0],
              difficulty
            },
            {
              onSuccess: () => {
                setIsModalOpen(false);
              }
            }
          );
        }}
      >Create</BtnPrimary>
    </div>
  )
}


function DifficultyField({ difficulty, setDifficulty }: {difficulty: ( 1 | 2 | 3 ), setDifficulty: React.Dispatch<React.SetStateAction<2 | 1 | 3>>}) {
  return (
    <div className='flex justify-end'>
      <div className='flex'>
        <div
          className='cursor-pointer'
          onClick={() => {
            setDifficulty(1)
          }}
        >
          {difficulty >= 1 ? <AiFillStar className='fill-tanj-green w-5 h-5' /> : <AiOutlineStar className='fill-tanj-green w-5 h-5' />}
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            setDifficulty(2)
          }}
        >
          {difficulty >= 2 ? <AiFillStar className='fill-tanj-green w-5 h-5' /> : <AiOutlineStar className='fill-tanj-green w-5 h-5' />}
        </div> 
        <div
          className='cursor-pointer'
          onClick={() => {
            setDifficulty(3)
          }}
        >
          {difficulty >= 3 ? <AiFillStar className='fill-tanj-green w-5 h-5' /> : <AiOutlineStar className='fill-tanj-green w-5 h-5' />}
        </div>           
      </div>
    </div>
  )
}