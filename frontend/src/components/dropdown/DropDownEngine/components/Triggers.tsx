import { ReactNode, useEffect, useRef } from "react";
import { useDropDown } from "../store/Hooks";

export function DropDownTriggerOnClick({children}: {children?: ReactNode}) {
  const menuContext = useDropDown();
  
  if (!menuContext)
    return null;

  return (
    <button
      onClick={e => {
        menuContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{children}</button>
  )
}

export function DropDownTriggerOnHover({children}: {children?: ReactNode}) {
  const menuContext = useDropDown();
  
  if (!menuContext)
    return null;

  useEffect(() => {
    menuContext.triggerType.current = 'mousemove';
  },[]);

  return (
    <button
      onMouseEnter={e => {
        if (menuContext.isDropDownOpen === false)
          menuContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{children}</button>
  )
}

function DropDownTriggerOnHold({children}: {children?: ReactNode}) {
  const menuContext = useDropDown();
  
  if (!menuContext)
    return null;

  const timeout = useRef<NodeJS.Timeout>();
  const releaseClick = useRef(true);

  const mouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    timeout.current = setTimeout(()=>{
      menuContext.setIsDropDownOpen(prev => !prev);
      releaseClick.current = false;
    }, 250);
  }

  const mouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    clearTimeout(timeout.current)

    if (releaseClick.current) {
      menuContext.setIsDropDownOpen(false);
    }
    else
      releaseClick.current = true;
  }

  return (
    <button
      onMouseUp={mouseUp}
      onMouseDown={mouseDown} 
    >{children}</button>
  )
}