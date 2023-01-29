import React, { useEffect, useState } from "react";
import {HiExclamationCircle} from 'react-icons/hi';

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


export interface InputWithOptionsAttributes<T> {
  initValue: T
  value: T
  setValue: (value:T) => void
  options: { label: string, value: T }[]
  className?: string
  ulClassName?: string
  liClassName?: string
}

export function InputWithOptions<T>(props: InputWithOptionsAttributes<T>) {
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
  },[inputText, options]);

  return (
    <div className="relative">
      <Input 
        className={' '+(className || 'w-64')} 
        value={inputText} type="text"
        onChange={(e) => {
          const textContent = e.target.value;
          setInputText(textContent);

          const option = options.find(opt => textContent === opt.label);
          if (option) {
            setValue(option.value);
            toggleList(false);
          }
          else {
            setValue(initValue);
            toggleList(true);
          }
        }}
        onFocus={() => {
          if (value === initValue)
            toggleList(true)
        }} 
        onBlur={
          (e) => setTimeout(()=> {
            if (document.activeElement !== e.target)
              toggleList(false);
          }, 150)
        }
      />
      {
        initValue !== inputText && !value && 
        <HiExclamationCircle className="absolute right-2 top-2.5 fill-red-400 w-5 h-5" />
      }
      { displayList && <OptionsDataList<T> {...{setInputText, setValue, liClassName, ulClassName, options:filteredOptions, toggleList}}/> }
    </div>
  )
}

function OptionsDataList<T>(props: { 
    options: { label: string, value: T }[]
    liClassName?: string
    ulClassName?: string
    toggleList: (state: boolean) => void
    setValue: (value: T) => void
    setInputText: React.Dispatch<React.SetStateAction<string>>
  }) {
  const { options, liClassName, ulClassName, toggleList, setValue, setInputText } = props;

  return (
    <ul
      className={'text-input-data-list absolute top-[calc(100%-2px)] left-0 overflow-auto bg-tanj-white border-2 border-tanj-green rounded-sm border-t-0 shadow-md '+ (ulClassName || ' w-full max-h-48')}
    >
      {
        options.map(option => {
          const { label, value } = option;
          return (
            <li 
              className={'p-1.5 hover:bg-tanj-green hover:font-bold cursor-pointer '+(liClassName || ' w-full ')}
              onClick={(e) => {
                e.stopPropagation();
                setValue(value);
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