import { release } from "os";
import { ButtonHTMLAttributes, useRef, useState } from "react";

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

  return (
    <div className="relative">
      <BtnPrimary
        {...buttons[0]}
        className='z-10 relative'
        onMouseDown={
          (event) => {
            if (event.button !== 0)
            return; 
            timeout.current = setTimeout(()=>{
              setIsDropDownOpen(prev => !prev);
              releaseClick.current = false
            }, 1000);
          }
        }
        onMouseUp={
          (event) => {
            if (event.button !== 0)
            return; 

            clearTimeout(timeout.current)

            if (releaseClick && buttons[0].onClick !== undefined)
              buttons[0].onClick(event);
            else
              releaseClick.current = true;
          }
        }
        onClick={undefined}
      />
      {
        isDropDownOpen && 
          <div 
            className="absolute -top-1 -left-1 bg-tanj-gray rounded p-1"
            style={{
              //width: isDropDownOpen ? "" : "",
            }}
          >
            {
              buttons.map((button, index) => {
                if (index === 0)
                return <BtnPrimary>{button.children}</BtnPrimary>;

                return <BtnPrimary {...button} />
              })
            }
          </div>
      }
    </div>
  );
}

