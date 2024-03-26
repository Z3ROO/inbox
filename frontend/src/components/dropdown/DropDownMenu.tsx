import { ReactNode } from "react";
import { DropDownContent, DropDownContentType, DropDownEngine, DropDownTriggerOnClick, useDropDown } from "./DropDownEngine";

export function DropDownMenu({children}: {children?: ReactNode}) {
  return (
    <DropDownEngine>
      {children}
    </DropDownEngine>
  )
}

export function DropDownMenuTrigger({children, icon}: {children?: ReactNode, icon?: boolean}) {
  return (
    <DropDownTriggerOnClick>
      <button className={`${icon ? 'px-1' : 'px-2'} py-1 hover:bg-gray-500 rounded-sm`}>
        {children}
      </button>
    </DropDownTriggerOnClick>
  )
}

export function DropDownMenuContent({children, position, align}: DropDownContentType) {
  return (
    <DropDownContent {...{position, align}}>
      <div className="p-1 bg-gray-700 border border-gray-800 rounded-sm">
        {children}
      </div>
    </DropDownContent>
  )
}

export function DropDownMenuItem(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const {onClick, className} = props;
  const dropDown = useDropDown();
  
  if (!dropDown)
    return null;

  return (
    <button {...props} 
      className={`px-2 py-1 w-full hover:bg-gray-550 rounded-sm text-left ${className}`} 
      onClick={(e) => { onClick && onClick(e); dropDown.close(); }} 
    />
  )
}