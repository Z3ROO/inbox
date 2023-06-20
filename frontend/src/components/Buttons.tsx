import { release } from "os";
import { ButtonHTMLAttributes, ReactEventHandler, useEffect, useRef, useState } from "react";

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
    }, 350);
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
      console.log("teste");
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
            className="absolute -top-0 bg-tanj-gray rounded flex flex-col"
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

