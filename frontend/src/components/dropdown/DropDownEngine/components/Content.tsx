import { ReactNode, useEffect, useRef, useState } from "react";
import { useDropDown } from "../store/Hooks";
import { createPortal } from "react-dom";


export type DropDownContentType = {
  children?: ReactNode
  position?: 'top'|'bottom'|'left'|'right'
  align?: 'start'|'center'|'end'
  direction?: 'vertical'|'horizontal'
  className?: string
}

export function DropDownContent({children, position = 'top', align = 'center', direction = 'vertical', className}: DropDownContentType) {
  const menuContext = useDropDown();
  const reference = useRef<HTMLDivElement>(null)

  if (!menuContext)
    return null;

  if (!menuContext.isDropDownOpen)
    return null;

  return (
    <div 
      ref={reference}
      className={`
        absolute 
        ${position === 'top' && ' bottom-full mb-1'}
        ${position === 'bottom' && ' top-full mt-1'}
        ${position === 'left' && ' right-full mr-1'}
        ${position === 'right' && ' left-full ml-1'}
        ${(position === 'top' || position === 'bottom') && ' left-1/2 -translate-x-1/2'}
        ${(position === 'left' || position === 'right') && ' top-1/2 -translate-y-1/2'}
      `}
    >
      <Content {...{position, align, direction, className,reference}}>
        {children}
        <div className="absolute opacity-0 -z-10 w-full h-full scale-110 top-0 left-0" ></div>
      </Content>
    </div>
  )
}

function Content({children, position, align, direction, className, reference}: DropDownContentType & {reference: React.RefObject<HTMLDivElement>}) {
  const {contentElement} = useDropDown()!;
  const [pos, setPos] = useState({x: 0, y:0});
  
  useEffect(() => {
    if (!reference.current || !contentElement.current)
      return;

    const {x, y} = reference.current.getBoundingClientRect();
    const {width, height} =  contentElement.current.getBoundingClientRect();

    let finalX = x, finalY = y;
    if (position === 'top') {
      finalX -= (width/2);
      finalY -= (height);
    }
    else if (position === 'bottom') {
      finalX -= (width/2);
    }
    else if (position === 'left') {
      finalX -= (width);
      finalY -= (height/2);
    }
    else if (position === 'right') {
      finalY -= (height/2);
    }    

    setPos({x: finalX, y:finalY});

  },[]);

  return createPortal((
    <div 
      ref={contentElement}
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`
      }}
      className={`
        absolute z-50
        ${direction === 'horizontal' && 'flex'}
        ${className}
      `}>
      {children}
    </div>
  ),document.body);
}
