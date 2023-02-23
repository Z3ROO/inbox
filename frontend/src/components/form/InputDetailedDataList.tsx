import { createContext, useContext, useEffect, useState } from "react";
import { GiCaravel } from 'react-icons/gi';
import { HiExclamationCircle } from "react-icons/hi2";
import { BtnPrimary } from "../Buttons";
import { Input } from "./Input";

type OptionType = {
  value: string;
  label: string;
}

export interface DetailedDataList {
  value: OptionType|undefined;
  setValue: (value: OptionType) => void;
  options: OptionType[];
  className?: string;
  onSubmit?: () => void
  onSelect?: (option: OptionType) => void
}

interface InputDetailedDataListContext {
  value: OptionType|undefined;
  onSubmit: (() => void) | undefined;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  filteredOptions: OptionType[];
  autoSelectOptionIfMatch: (textContent: string) => void;
  selectOption: (option: OptionType) => void;
}

const Context = createContext<InputDetailedDataListContext|null>(null);

export function InputDetailedDataList(props: DetailedDataList) {
  const { value, setValue, options, className, onSubmit, onSelect } = props;

  const [inputText, setInputText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);

  function autoSelectOptionIfMatch(textContent: string) {
    const option = options.find(opt => textContent === opt.label);
    if (option) {
      setValue({label: option.label, value: option.value});
    }
    else {
      setValue({label: textContent, value: ''});
    }
  }

  function selectOption(option: OptionType) {
    setInputText(option.label);
    setValue(option);
    if (onSelect)
      onSelect(option);
  }

  useEffect(() => {
    const regex = new RegExp(inputText);
    const filtered = options.filter(opt => opt.label.match(regex));
    setFilteredOptions(filtered);
  }, [inputText, options]);

  const contextValue = {
    value,
    onSubmit,
    inputText, setInputText,
    filteredOptions, 
    autoSelectOptionIfMatch,
    selectOption
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
  const { inputText, setInputText, onSubmit, autoSelectOptionIfMatch } = useContext(Context)!;
  return (
    <>
      <div className="flex">
        <div className="mx-2 w-full relative">
          <Input 
            className="w-full" 
            value={inputText} 
            onChange={(e) => { 
              setInputText(e.target.value);
              autoSelectOptionIfMatch(e.target.value);
            }} />
          <InexistentOptionIconWarning />
        </div>
        {
          onSubmit && <BtnPrimary className="m-0 mx-2" onClick={onSubmit}>Submit</BtnPrimary>
        }
      </div>
      <DataList  />
    </>
  )
}

function InexistentOptionIconWarning() {
  const { inputText, value } = useContext(Context)!;

  if (inputText !== '' && !value?.value)
    return (
      <HiExclamationCircle className="absolute right-2 top-2.5 fill-red-400 w-5 h-5" />
    )
  
  return null;
}

function DataList() {
  const { filteredOptions, selectOption } = useContext(Context)!;

  return (
    <div className="h-full overflow-auto overflow-x-hidden pl-2 mr-4 pt-1 mt-3 flex flex-wrap custom-scrollbar">
      {
        filteredOptions.map(option => {
          return (
            <div className="relative w-14 h-14 mx-2 mb-4 hover:scale-110 transition-all">
              <div onClick={() => selectOption(option)} className="absolute w-14 h-14 hover:w-max flex flex-col items-center rounded-sm bg-tanj-green group hover:left-1/2 hover:-translate-x-1/2 cursor-pointer">
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
