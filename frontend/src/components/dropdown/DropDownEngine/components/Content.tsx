import { ReactNode } from "react";
import { useDropDown } from "../store/Hooks";


export type DropDownContentType = {
  children?: ReactNode
  position?: 'top'|'bottom'|'left'|'right'
  align?: 'start'|'center'|'end'
}

export function DropDownContent({children, position, align}: DropDownContentType) {
  const menuContext = useDropDown();
  
  if (!position)
    position = 'bottom';

  if (!align)
    align = 'center';

  if (!menuContext)
    return null;


  if (!menuContext.isDropDownOpen)
    return null;

  return (
    <div 
      className={`
        absolute 
        ${position === 'top' && ' bottom-full mb-1'}
        ${position === 'bottom' && ' top-full mt-1'}
        ${position === 'left' && ' right-full mr-1'}
        ${position === 'right' && ' left-full ml-1'}
        ${((position === 'top' || position === 'bottom') && align === 'start') && ' left-0'}
        ${((position === 'top' || position === 'bottom') && align === 'center') && ' left-1/2 -translate-x-1/2'}
        ${((position === 'top' || position === 'bottom') && align === 'end') && ' right-0'}
        ${((position === 'left' || position === 'right') && align === 'start') && ' top-0'}
        ${((position === 'left' || position === 'right') && align === 'center') && ' top-1/2 -translate-y-1/2'}
        ${((position === 'left' || position === 'right') && align === 'end') && ' bottom-0'}
      `}
    >
      {children}
    </div>
  )
}
