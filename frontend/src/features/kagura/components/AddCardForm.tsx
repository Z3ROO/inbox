import { BtnPrimary } from "@/components/Buttons";
import { Textarea } from "@/components/form/Input";
import { InputDataList } from "@/components/form/InputDataList";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { useKagura } from "@/features/kagura/store/KaguraContext";
import * as KaguraAPI from '@/features/kagura/api/index';

export function AddCardForm() {
const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`absolute top-4 right-4`}>
      <OpenModalButton {...{setIsModalOpen}} />
      <Modal {...{isModalOpen, closeFn: () => setIsModalOpen(false)}}>
        <Form {...{setIsModalOpen}} />
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

function Form({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [typesOptions, setTypesOptions] = useState<{label: string, value: string}[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<{label: string, value: string}[]>([]);

  const [difficulty, setDifficulty] = useState<1|2|3>(3);
  const [typeInput, setTypeInput] = useState({value: '', label: ''});
  const [requirementsInput, setRequirementsInput] = useState('');
  const [categoryInput, setCategoryInput] = useState({value: '', label: ''});

  useEffect(() => {
    (async () => {
      const data = await KaguraAPI.getKaguraMetaData();
      const { types, categories } = data;

      setTypesOptions(types.map(t =>
        ({label: t.replace(/_/g, ' '), value: t})
      ));

      setCategoriesOptions(categories.map(c => 
        ({label: c.replace(/_/g, ' '), value: c})
      ));
    })();
  },[]);

  return (
    <div className='p-2'>
      <h4 className='text-tanj-white'>Insert a new card</h4>
      <form id="insert-card-form" className='flex flex-col mb-4 w-72'>
        <DifficultyField {...{difficulty, setDifficulty}} />
        <label>
          <div className='text-tanj-white '>Type: </div>
          <InputDataList className='w-full' options={typesOptions} value={typeInput} setValue={val => setTypeInput(val)} />
        </label>
        <label>
          <div className='text-tanj-white '>Category: </div>
          <InputDataList className='w-full' options={categoriesOptions} value={categoryInput} setValue={val => setCategoryInput(val)} />
        </label>
        <label>
          <div className='text-tanj-white '>Requirements: </div>
          <Textarea className={`w-full resize-none h-32`} value={requirementsInput} onChange={e => setRequirementsInput(e.target.value)} />
        </label>
      </form>
      <Submit {...{typeInput, categoryInput, requirementsInput, difficulty, setIsModalOpen }} />
    </div>
  )
}

function DifficultyField({ difficulty, setDifficulty }: {difficulty: ( 1 | 2 | 3 ), setDifficulty: React.Dispatch<React.SetStateAction<2 | 1 | 3>>}) {
  return (
    <div className='flex justify-end'>
      <div className='flex'>
        <DifficultyStar {...{position: 1, difficulty, setDifficulty }} />
        <DifficultyStar {...{position: 2, difficulty, setDifficulty }} />
        <DifficultyStar {...{position: 3, difficulty, setDifficulty }} />
      </div>
    </div>
  )
}

function DifficultyStar({ position, difficulty, setDifficulty }: { position: ( 1 | 2 | 3 ), difficulty: ( 1 | 2 | 3 ), setDifficulty: React.Dispatch<React.SetStateAction<2 | 1 | 3>>}) {
  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        setDifficulty(position)
      }}
    >
      {difficulty >= position ? <AiFillStar className='fill-tanj-green w-5 h-5' /> : <AiOutlineStar className='fill-tanj-green w-5 h-5' />}
    </div> 
  )
}

function Submit(props: {typeInput: { label: string, value: string }, categoryInput: { label: string, value: string }, requirementsInput: string, difficulty: ( 1 | 2 | 3 ) , setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const { insertCard } = useKagura()!;
  const { typeInput, categoryInput, requirementsInput, difficulty, setIsModalOpen } = props;

  return (
    <BtnPrimary type="submit" 
      form='insert-card-form'
      onClick={e => {
        e.preventDefault();
        
        insertCard.mutate(
          { 
            difficulty,
            type: typeInput.value !== '' ? typeInput.value : typeInput.label, 
            category: categoryInput.value !== '' ? categoryInput.value : categoryInput.label,
            requirements: requirementsInput, 
          },
          {
            onSuccess: () => {
              setIsModalOpen(false);
            }
          }
        );
      }}
    >Create</BtnPrimary>
  )
}
