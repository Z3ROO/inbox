import { ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean
  outline?: boolean
  bgLess?: boolean
  round?: boolean
  className?: string
}

export function Raw (props: ButtonProps) {
  const { icon, outline, bgLess, round, className } = props;
  
  return (
    <button {...props} className={`
      ${ icon ? ' p-2 ' : ' py-2 px-4 ' /* x */ }
      ${ round ? ' rounded-full ' : ' rounded-sm ' } 
      ${className}
    `} />
  )
}

export function Primary (props: ButtonProps) {
  const { icon, outline, bgLess, round, className } = props;

  const bg_TW = ' bg-gradient-to-br from-tanj-pink to-tanj-gray hover:from-tanj-green hover:to-tanj-pink ';

  return (
    <Raw {...props} className={`
      ${ (bgLess || outline) ? '  ' : bg_TW}
      ${ outline ? ' border border-tanj-pink hover:border-tanj-green ' : ' border border-tanj-gray '}
      m-2 text-tanj-white disabled:grayscale disabled:opacity-50 disabled:pointer-events-none disabled:filter disabled:contrast-75 
      ${className}
    `} />
  )
}

export function Secondary (props: ButtonProps) {
  const { icon, outline, bgLess, round, className } = props;

  const bg_TW = ' hover:bg-tanj-gray  hover:text-tanj-green ';

  return (
    <Raw {...props} className={`
    ${ (bgLess || outline) ? '  ' :  bg_TW }
    ${ outline ? ' border border-transparent hover:border-tanj-gray ' : '  ' }
      m-2 text-tanj-pink hover:text-tanj-green 
      ${className}
    `} />
  )
}

export function OptionBtn(props: { onClick: () => void, disabled?: boolean, confirm?: boolean, children: ReactNode}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { onClick, disabled, confirm, children } = props;

  return (
    <div className='relative'>
      <Secondary icon 
        className=''
        onClick={e => {
          if (confirm) {
            setIsConfirmOpen(prev => !prev);
            return;
          }
          onClick();
        }}
        disabled={disabled}
      >
        {children}
      </Secondary>
      { 
        isConfirmOpen && ( 
          <ConfirmationWidget 
            className='absolute bottom-14 left-[calc(50%)] translate-x-[-50%]'
            y={() => { onClick(); setIsConfirmOpen(false); }} 
            n={() => setIsConfirmOpen(false)} 
          /> 
        )
      }
    </div>
  );
}

function ConfirmationWidget({y, n, className}: { y: () => void, n: () => void, className?: string}) {

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      n(); 
    }
    const delay = setTimeout( () => window.addEventListener('click', handler), 0);

    return () => {
      clearTimeout(delay);
      window.removeEventListener('click', handler);
    }
  }, []);

  return (
    <div onClick={e => e.stopPropagation()} 
      style={{
        backdropFilter: 'blur(8px)'
      }}
      className={`flex rounded-sm bg-tanj-brown bg-opacity-70 shadow ${className}`}>
      <Secondary icon onClick={n}>
        <ImCross className='w-2.5 h-2.5 text-tanj-pink' />
      </Secondary>
      <Secondary icon onClick={y}>
        <FaCheck className='w-2.5 h-2.5 text-tanj-green' />
      </Secondary>
    </div>
  );
}