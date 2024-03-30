import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { InputDataListAttributes } from ".";

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
export const UseInputDataListContext = () => useContext(Context);

export function InputDataListContextProvider(props: InputDataListAttributes & {children: ReactNode}) {
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
      {props.children}
    </Context.Provider>
  )
}

