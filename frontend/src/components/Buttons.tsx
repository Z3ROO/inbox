import { ButtonHTMLAttributes, HTMLAttributes, ReactEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean
  outline?: boolean
  bgLess?: boolean
  round?: boolean
}

export function BtnPrimary (props: BtnProps) {
  const { icon, outline, bgLess, round } = props;

  return (
    <button {...props} className={`
      ${ icon ? ' p-2 ' : ' py-2 px-4 ' } 
      ${ (bgLess || outline) ? '  ' : ' bg-gradient-to-br from-tanj-pink to-tanj-gray hover:from-tanj-green hover:to-tanj-pink '}
      ${ outline ? ' border border-tanj-pink hover:border-tanj-green ' : ' border border-tanj-gray '}
      ${ round ? ' rounded-full ' : ' rounded-sm ' }
      m-2 text-tanj-white disabled:grayscale disabled:opacity-50 disabled:pointer-events-none disabled:filter disabled:contrast-75 ${props.className}
    `} />
  )
}

export function BtnSecondary (props: BtnProps) {
  const { icon, outline, bgLess, round } = props;

  return (
    <button {...props} className={`
    ${ icon ? ' p-2 ' : ' py-2 px-4 ' } 
    ${ (bgLess || outline) ? '  ' : ' hover:bg-tanj-gray  hover:text-tanj-green '}
    ${ outline ? ' border border-transparent hover:border-tanj-gray ' : '  '}
    ${ round ? ' rounded-full ' : ' rounded-sm ' }
      m-2 text-tanj-pink hover:text-tanj-green ${props.className}
    `} />
  )
}


type DropDownOnHoldButtonProps = {
  buttons: BtnProps[]
  BtnComponent?: (props: BtnProps) => JSX.Element
}

export function DropDownOnHoldButton({buttons}: DropDownOnHoldButtonProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const releaseClick = useRef(true);
  const mouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0)
      return; 
    timeout.current = setTimeout(()=>{
      setIsDropDownOpen(prev => !prev);
      releaseClick.current = false;
    }, 250);
  }

  const mouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0)
      return; 

    clearTimeout(timeout.current)

    if (releaseClick.current && buttons[0].onClick !== undefined) {
      buttons[0].onClick(event);
      setIsDropDownOpen(false);
    }
    else
      releaseClick.current = true;
  }

  useEffect(() => {
    const handler = () => {
      setIsDropDownOpen(false);
    }

    if (isDropDownOpen)
      window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [isDropDownOpen])

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <BtnPrimary
        {...buttons[0]}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onClick={undefined}
      />
      {
        isDropDownOpen && 
          <div 
            className="absolute -top-0 left-1/2 -translate-x-1/2 bg-tanj-gray rounded flex flex-col"
            style={{
              //width: isDropDownOpen ? "" : "",
            }}
          >
            {
              buttons.map((button, index) => {
                if (index === 0)
                return (
                  <BtnPrimary {...button} 
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                    onClick={undefined} 
                  />
                );

                return (
                  <BtnPrimary {...button} 
                    className={`whitespace-nowrap `+button.className}
                    onClick={
                      e => { 
                        setIsDropDownOpen(false); 
                        if (button.onClick)
                          button.onClick(e);
                      }
                    }
                  />
                );
              })
            }
          </div>
      }
    </div>
  );
}

type DropDownOnClickButtonProps = {
  main: ReactNode
  BtnComponent?: (props: BtnProps) => JSX.Element
  children: ReactNode|ReactNode[]
  className?: string
  position?: 'top'|'bottom'|'left'|'right'
  align?: 'start'|'center'|'end'
}

export function DropDownOnClickButton({main, BtnComponent, children, className, position, align}: DropDownOnClickButtonProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  if (!Array.isArray(children))
    children = [children];

  if (!position)
    position = 'bottom';

  if (!align)
    align = 'center';

  const ItemComponent = BtnComponent ?? ((props:React.HTMLProps<HTMLDivElement>) => <div {...props} />);

  useEffect(() => {
    const handler = () => {
      setIsDropDownOpen(false);
    }

    if (isDropDownOpen)
      window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [isDropDownOpen])

  return (
    <div className="relative z-10" onClick={e => e.stopPropagation()}>
      <ItemComponent
        onClick={e => {
          setIsDropDownOpen(prev => !prev);
        }}
        className={className??''}
      >{main}</ItemComponent>

      {
        isDropDownOpen && 
          <div 
            className={`
              absolute bg-tanj-gray rounded flex flex-col gap-2 p-2
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
            {
              (children as ReactNode[]).map((menuItem, index) => {
                return (
                  <ItemComponent
                    children={menuItem}
                    className={`whitespace-nowrap `}
                    onClick={() => setIsDropDownOpen(false)}
                  />
                );
              })
            }
          </div>
      }
    </div>
  );
}

export function OptionsButton(props: { className: string, options: { onClick: () => void, text: string, disabled?: boolean}[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const { options } = props;
  
  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    }

    if (isOpen)
      window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [isOpen])

  return (
    <div className={props.className+" "}>
      <BtnSecondary icon
        onClick={e => {
          setIsOpen(prev => !prev);
          e.stopPropagation();
        }}
        style={{
          backgroundColor: isOpen ? 'rgb(34 32 31)' : undefined,
          color: isOpen ? 'rgb(70 176 119)' : undefined
        }}
      >
        <BsThreeDotsVertical className="text-tanj-green" />
      </BtnSecondary>
      {
        isOpen && (
          <div 
            className="absolute top-2 max-w-xs w-max right-full rounded-sm bg-tanj-gray shadow z-10"
            onClick={e => e.stopPropagation()}
          >
            <ul
              className={`list-none p-1.5`}
            >
              {
                options.map(({text, onClick, disabled}) => disabled ? null :(
                    <Li onClick={() => {
                      onClick();
                      setIsOpen(false);
                    }}>{text}</Li>
                  )
                )
              }
            </ul>
          </div>
        )
      }
      
    </div>
  )
}


function Li(props: HTMLAttributes<HTMLLIElement>) {
  return (
    <li {...props} className="p-1 px-2.5 select-none hover:bg-tanj-green hover:bg-opacity-5 rounded-sm text-tanj-green text-sm cursor-pointer" />
  )
}

