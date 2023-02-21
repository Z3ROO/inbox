import { createContext, useContext, useEffect, useState } from "react";
import { GiCaravel } from 'react-icons/gi';
import { BtnPrimary } from "../Buttons";
import { Input } from "./Input";

type optionType = {
  value: string;
  label: string;
}

export interface DetailedDataList {
  value: optionType|undefined;
  setValue: (value: optionType) => void;
  options: optionType[];
  className?: string;
  onSubmit?: () => void
}

interface InputDetailedDataListContext {
  onSubmit: (() => void) | undefined;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  filteredOptions: optionType[];
}

const Context = createContext<InputDetailedDataListContext|null>(null);

export function InputDetailedDataList(props: DetailedDataList) {
  const { value, setValue, options, className, onSubmit } = props;

  const [inputText, setInputText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<optionType[]>([]);

  useEffect(() => {
    const regex = new RegExp(inputText);
    const filtered = options.filter(opt => opt.label.match(regex));
    setFilteredOptions(filtered);
  }, [inputText, options]);

  const contextValue = {
    onSubmit,
    inputText, setInputText,
    filteredOptions, 
  }

  return (
    <Context.Provider value={contextValue} >
      <div className={`p-8 h-full flex flex-col ${className}`}>
        <InputContainer />
      </div>
    </Context.Provider>
  )
}

function InputContainer() {
  const { inputText, setInputText, onSubmit } = useContext(Context)!;
  return (
    <>
      <div className="flex">
        <Input className="mx-2 grow" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        {
          onSubmit && <BtnPrimary className="m-0 mx-2" onClick={onSubmit}>Submit</BtnPrimary>
        }
      </div>
      <DataList  />
    </>
  )
}

function DataList() {
  const { filteredOptions } = useContext(Context)!;

  return (
    <div className="h-full overflow-auto overflow-x-hidden pl-2 mr-4 pt-1 mt-3 flex flex-wrap custom-scrollbar">
      {
        filteredOptions.map(option => {
          return (
            <div className="relative w-14 h-14 mx-2 mb-4 hover:scale-110 transition-all">
              <div className="absolute w-14 h-14 hover:w-max flex flex-col items-center rounded-sm bg-tanj-green group hover:left-1/2 hover:-translate-x-1/2 cursor-pointer">
                <GiCaravel className="w-full h-full p-1 fill-black" />
                <div className="h-5 max-w-[3rem] group-hover:max-w-none overflow-hidden group-hover:overflow-visible shrink-0">
                  <span className="text-xs whitespace-nowrap align-text-top group-hover:mx-2">{option.label}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
