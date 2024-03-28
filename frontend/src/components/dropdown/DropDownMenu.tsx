import { ReactNode } from "react";
import { DropDownContent, DropDownContentType, DropDownEngine, DropDownTriggerOnClick, DropDownTriggerOnHover, useDropDown } from "./DropDownEngine";
import { Button, NanoButtonProps } from "../Buttons";

export function DropDownMenu({children}: {children?: ReactNode}) {
  return (
    <DropDownEngine>
      {children}
    </DropDownEngine>
  )
}

export function DropDownMenuTriggerOnHover(props : NanoButtonProps) {
  return (
    <DropDownTriggerOnHover>
      <Button outline {...props} />
    </DropDownTriggerOnHover>
  )
}

export function DropDownMenuTriggerOnClick(props: NanoButtonProps) {
  return (
    <DropDownTriggerOnClick>
      <Button outline {...props} />
    </DropDownTriggerOnClick>
  )
}

export function DropDownMenuContent({children, position, align, direction}: DropDownContentType) {
  return (
    <DropDownContent className="p-1 bg-gray-700 border border-gray-500 hover:border-gray-450 rounded-sm shadow-md " {...{position, align, direction}}>
      {children}
    </DropDownContent>
  )
}

export function DropDownMenuItem(props: NanoButtonProps) {
  const {onClick, className} = props;
  const dropDown = useDropDown();
  
  if (!dropDown)
    return null;

  return (
    <Button variant="discret" {...props} 
      className={`my-0.5 w-full text-left whitespace-nowrap ${className}`} 
      onClick={(e) => { onClick && onClick(e); dropDown.close(); }} 
    />
  )
}