import { useState, useEffect, createContext, ReactNode, useContext } from "react"
import { HiExclamationCircle } from "react-icons/hi2"
import { Input } from "./Input"

export interface InputDataListAttributes {
  value: { label: string, value: string }
  setValue: (value: { label: string, value: string }) => void
  options: { label: string, value: string }[]
  className?: string
  ulClassName?: string
  liClassName?: string
}

interface InputDataListContext {
  value: {
    label: string;
    value: string;
  };
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

const Context = createContext<InputDataListContext|null>(null);

export function InputDataList(props: InputDataListAttributes) {
  let { value, setValue, options, className, ulClassName, liClassName } = props;

  const [isDataListOpen, setIsDataListOpen] = useState(false);
  const toggleDataList = (state: boolean) => setIsDataListOpen(state);

  const [inputText, setInputText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  if (!className)
    className = '';

  function autoSelectOptionIfMatch(textContent: string) {
    const option = options.find(opt => textContent === opt.label);
    if (option) {
      setValue({label: option.label, value: option.value});
      toggleDataList(false);
    }
    else {
      setValue({label: textContent, value: ''});
      toggleDataList(true);
    }
  }

  function openDataList() {
    if (value.value === '')
      toggleDataList(true);
  }
  
  function closeDataList(event: React.ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      if (document.activeElement !== event.target)
        toggleDataList(false);
    }, 150);
  }

  function chooseOption(label: string, value: string) {
    setValue({ label, value });
    setInputText(label);
    toggleDataList(false);
  }

  useEffect(() => {
    setInputText(value.label)
  },[value])

  useEffect(() => {
    const regex = new RegExp(inputText);
    const refiltered = options.filter(option => option.label.match(regex));
    setFilteredOptions(refiltered);
  }, [inputText, options]);

  const contextValue = {
    value, className, ulClassName, liClassName,
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
          e.stopPropagation();
          const textContent = e.target.value;
          setInputText(textContent);
          autoSelectOptionIfMatch(textContent);
          console.log('aasdasd: ', textContent);
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
  const { inputText, value } = useContext(Context)!;

  if (inputText !== '' && !value.value)
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