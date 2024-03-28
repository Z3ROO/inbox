import { ReactNode, useEffect, useRef } from "react";
import { useDropDown } from "../store/Hooks";

export function DropDownTriggerOnClick(props: {children: ReactNode}) {
  const menuContext = useDropDown();
  
  if (!menuContext)
    return null;

  return (
    <div className="inline"
      onClick={e => {
        menuContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{props.children}</div>
  )
}

export function DropDownTriggerOnHover(props: {children: ReactNode}) {
  const menuContext = useDropDown();
  
  if (!menuContext)
    return null;

  useEffect(() => {
    menuContext.triggerType.current = 'mousemove';
  },[]);

  return (
    <div className="inline"
      onMouseEnter={e => {
        if (menuContext.isDropDownOpen === false)
          menuContext.setIsDropDownOpen(prev => !prev);
      }} 
      >{props.children}</div>
  )
}

function DropDownTriggerOnHold(props: {children: ReactNode}) {
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
    <button {...props}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown} 
    />
  )
}