import { ReactNode } from "react";
import { useDropDown } from "../store/Hooks";


export type DropDownContentType = {
  children?: ReactNode
  position?: 'top'|'bottom'|'left'|'right'
  align?: 'start'|'center'|'end'
  direction?: 'vertical'|'horizontal'
  className?: string
}

export function DropDownContent({children, position = 'top', align = 'center', direction = 'vertical', className}: DropDownContentType) {
  const menuContext = useDropDown();

  if (!menuContext)
    return null;


  if (!menuContext.isDropDownOpen)
    return null;

  return (
    <div 
      className={`
        absolute 
        ${direction === 'horizontal' && 'flex'}
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
        ${className}
      `}
    >
      <div className="absolute opacity-0 -z-10 w-full h-full scale-110 top-0 left-0" ></div>
      {children}
    </div>
  )
}
//onMouseMove={e => e.stopPropagation()}