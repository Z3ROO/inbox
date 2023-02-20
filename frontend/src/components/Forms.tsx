import React, { useEffect, useState } from "react";
import { HiExclamationCircle } from 'react-icons/hi';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`
    text-tanj-gray bg-tanj-white rounded-sm p-1.5 
    shadow-inner shadow-[rgba(0,0,0,0.2)] 
    border-2 border-tanj-pink focus:border-tanj-green outline-none 
  ` + props.className} />
}

export function Textarea(props: React.InputHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`
    text-tanj-gray bg-tanj-white rounded-sm p-1.5 
    shadow-inner shadow-[rgba(0,0,0,0.2)] 
    border-2 border-tanj-pink focus:border-tanj-green outline-none 
  ` + props.className} />
}


export interface InputWithOptionsAttributes {
  initValue: string
  value: string[]
  setValue: (value: string[]) => void
  options: { label: string, value: string }[]
  className?: string
  ulClassName?: string
  liClassName?: string
}

export function InputWithOptions(props: InputWithOptionsAttributes) {
  let { initValue, value, setValue, options, className, ulClassName, liClassName } = props;

  const [displayList, setDisplayList] = useState(false);
  const toggleList = (state: boolean) => setDisplayList(state);

  const [inputText, setInputText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  if (!className)
    className = '';

  useEffect(() => {
    const regex = new RegExp(inputText);
    setFilteredOptions(options.filter(option => option.label.match(regex)));
  }, [inputText, options]);

  return (
    <div className="relative">
      <Input
        className={' ' + (className || 'w-64')}
        value={inputText} type="text"
        onChange={(e) => {
          const textContent = e.target.value;
          setInputText(textContent);

          const option = options.find(opt => textContent === opt.label);
          if (option) {
            setValue([option.value, option.value]);
            toggleList(false);
          }
          else {
            setValue([textContent, initValue]);
            toggleList(true);
          }
        }}
        onFocus={() => {
          if (value[0] === initValue)
            toggleList(true)
        }}
        onBlur={
          (e) => setTimeout(() => {
            if (document.activeElement !== e.target)
              toggleList(false);
          }, 150)
        }
      />
      {
        initValue !== inputText && !value[1] &&
        <HiExclamationCircle className="absolute right-2 top-2.5 fill-red-400 w-5 h-5" />
      }
      {displayList && <OptionsDataList {...{ setInputText, setValue, liClassName, ulClassName, options: filteredOptions, toggleList }} />}
    </div>
  )
}

function OptionsDataList(props: {
  options: { label: string, value: string }[]
  liClassName?: string
  ulClassName?: string
  toggleList: (state: boolean) => void
  setValue: (value: string[]) => void
  setInputText: React.Dispatch<React.SetStateAction<string>>
}) {
  const { options, liClassName, ulClassName, toggleList, setValue, setInputText } = props;

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
                setValue([value, value]);
                setInputText(label);
                toggleList(false);
              }}
            >{label}</li>
          )
        })
      }
    </ul>
  )
}

export interface DetailedDataList {
  value: string
  setValue: (value: string) => void
  options: {
    value: string
    label: string
  }[]
}

export function InputDetailedDataList(props: DetailedDataList) {
  return (
    <div>
    </div>
  )
}

