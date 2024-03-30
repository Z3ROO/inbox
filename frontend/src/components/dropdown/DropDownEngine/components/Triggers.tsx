import { ReactNode, useEffect, useRef } from "react";
import { useDropDown } from "../store/Hooks";

export function DropDownTriggerOnClick(props: {children: ReactNode}) {
  const dropDownContext = useDropDown();
  
  if (!dropDownContext)
    return null;

  return (
    <div className="inline"
      onClick={e => {
        dropDownContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{props.children}</div>
  )
}

export function DropDownTriggerOnHover(props: {children: ReactNode}) {
  const dropDownContext = useDropDown();
  
  if (!dropDownContext)
    return null;

  useEffect(() => {
    dropDownContext.triggerType.current = 'mousemove';
  },[]);

  return (
    <div className="inline"
      onMouseEnter={e => {
        if (dropDownContext.isDropDownOpen === false)
          dropDownContext.setIsDropDownOpen(prev => !prev);
      }} 
      >{props.children}</div>
  )
}

function DropDownTriggerOnHold(props: {children: ReactNode}) {
  const dropDownContext = useDropDown();
  
  if (!dropDownContext)
    return null;

  const timeout = useRef<NodeJS.Timeout>();
  const releaseClick = useRef(true);

  const mouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    timeout.current = setTimeout(()=>{
      dropDownContext.setIsDropDownOpen(prev => !prev);
      releaseClick.current = false;
    }, 250);
  }

  const mouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    clearTimeout(timeout.current)

    if (releaseClick.current) {
      dropDownContext.setIsDropDownOpen(false);
    }
    else
      releaseClick.current = true;
  }

  return (
    <button {...props}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown} 
    />
  )
}