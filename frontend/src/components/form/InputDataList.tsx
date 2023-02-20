import { useState, useEffect, createContext, ReactNode, useContext } from "react"
import { HiExclamationCircle } from "react-icons/hi2"
import { Input } from "./Input"

export interface InputDataListAttributes {
  initValue: string
  value: string[]
  setValue: (value: string[]) => void
  options: { label: string, value: string }[]
  className?: string
  ulClassName?: string
  liClassName?: string
}

const Context = createContext<IContext|null>(null);
interface IContext {
  initValue: string;
  value: string[];
  className: string;
  ulClassName: string | undefined;
  liClassName: string | undefined;
  options: {
    label: string;
    value: string;
  }[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isDataListOpen: boolean;
  autoSelectOptionIfMatch: (textContent: string) => void;
  openDataList: () => void;
  closeDataList: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chooseOption: (label: string, value: string) => void;
}

export function InputDataList(props: InputDataListAttributes) {
  let { initValue, value, setValue, options, className, ulClassName, liClassName } = props;

  const [isDataListOpen, setIsDataListOpen] = useState(false);
  const toggleList = (state: boolean) => setIsDataListOpen(state);

  const [inputText, setInputText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  if (!className)
    className = '';

  function autoSelectOptionIfMatch(textContent: string) {
    const option = options.find(opt => textContent === opt.label);
    if (option) {
      setValue([option.value, option.value]);
      toggleList(false);
    }
    else {
      setValue([textContent, initValue]);
      toggleList(true);
    }
  }

  function openDataList() {
    if (value[0] === initValue)
      toggleList(true)
  }
  
  function closeDataList(event: React.ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      if (document.activeElement !== event.target)
        toggleList(false);
    }, 150)
  }

  function chooseOption(label: string, value: string) {
    setValue([value, value]);
    setInputText(label);
    toggleList(false);
  }

  useEffect(() => {
    const regex = new RegExp(inputText);
    setFilteredOptions(options.filter(option => option.label.match(regex)));
  }, [inputText, options]);

  const contextValue = {
    initValue, value, className, ulClassName, liClassName,
    options: filteredOptions,
    inputText, setInputText,
    isDataListOpen,
    autoSelectOptionIfMatch,
    openDataList,
    closeDataList,
    chooseOption
  }

  return(
    <Context.Provider value={contextValue}>
      <InputContainer />
    </Context.Provider>
  )
}


function InputContainer() {
  const { className, inputText, setInputText, isDataListOpen, autoSelectOptionIfMatch, openDataList, closeDataList } = useContext(Context)!;

  return (
    <div className="relative">
      <Input 
      type="text" 
      className={' ' + (className || 'w-64')}
        value={inputText}
        onChange={(e) => {
          const textContent = e.target.value;
          setInputText(textContent);
          autoSelectOptionIfMatch(textContent);
        }}
        onFocus={openDataList}
        onBlur={closeDataList}
      />
      <InexistentOptionIconWarning />
      {isDataListOpen && <OptionsDataList />}
    </div>
  )
}

function InexistentOptionIconWarning() {
  const { initValue, inputText, value } = useContext(Context)!;

  if (initValue !== inputText && !value[1])
    return (
      <HiExclamationCircle className="absolute right-2 top-2.5 fill-red-400 w-5 h-5" />
    )
  
  return null;
}

function OptionsDataList() {
  const { options, liClassName, ulClassName, chooseOption } = useContext(Context)!;

  return (
    <ul
      className={'z-10 text-input-data-list absolute top-[calc(100%-2px)] left-0 overflow-auto bg-tanj-white border-2 border-tanj-green rounded-sm border-t-0 shadow-md ' + (ulClassName || ' w-full max-h-48')}
    >
      {
        options.map(option => {
          const { label, value } = option;
          return (
            <li
              className={'p-1.5 hover:bg-tanj-green hover:font-bold cursor-pointer ' + (liClassName || ' w-full ')}
              onClick={(e) => {
                e.stopPropagation();
                chooseOption(label, value);
              }}
            >{label}</li>
          )
        })
      }
    </ul>
  )
}