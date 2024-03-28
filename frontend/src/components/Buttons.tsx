import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export interface NanoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'|'secondary'|'destructive'|'discret'
  icon?: boolean
  outline?: boolean
  round?: boolean
  className?: string
}

const primaryBtnDefault_TW = ' text-gray-900 bg-gradient-to-br to-gray-400 from-gray-200 hover:to-gray-450 hover:from-gray-250';
const primaryBtnOutline_TW = ' text-gray-900 border border-tanj-pink hover:border-tanj-green ';

const secondaryBtnDefault_TW = ' text-gray-100 hover:text-white bg-gray-500 hover:bg-gray-450 ';
const secondaryBtnOutline_TW = ' text-gray-250 hover:text-gray-150  border border-gray-500 hover:border-gray-450 ';

const destructiveBtnDefault_TW = ' text-gray-800 hover:text-gray-900 bg-red-900 hover:bg-red-800 ';
const destructiveBtnOutline_TW = '  text-red-300 hover:text-red-400 border border-red-900 hover:border-red-800 ';

const discretBtnDefault_TW = ' text-gray-250 hover:text-gray-200 hover:bg-gray-550 ';


const ButtonStyling: {[key: string] : {default: string, outline: string} } = {
  primary: {
    default: primaryBtnDefault_TW,
    outline: primaryBtnDefault_TW
  },
  secondary: {
    default: secondaryBtnDefault_TW,
    outline: secondaryBtnOutline_TW
  },
  destructive: {
    default: destructiveBtnDefault_TW,
    outline: destructiveBtnOutline_TW
  },
  discret: {
    default: discretBtnDefault_TW,
    outline: discretBtnDefault_TW
  }
}

export function Button (props: NanoButtonProps) {
  const { icon, outline, variant = 'secondary', round, className } = props;
  
  return (
    <button {...props} className={`
      ${ icon ? ' p-2 ' : ' py-1 px-2 ' }
      ${ round ? ' rounded-full ' : ' rounded-sm ' } 
      disabled:grayscale disabled:opacity-50 disabled:pointer-events-none disabled:filter disabled:contrast-75
      ${outline ? ButtonStyling[variant].outline : ButtonStyling[variant].default }
      ${className}
    `} />
  )
}

export function OptionBtn(props: { onClick: () => void, disabled?: boolean, confirm?: boolean, children: ReactNode}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { onClick, disabled, confirm, children } = props;

  return (
    <div className='relative'>
      <Button icon variant="discret"
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
      </Button>
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
      <Button variant="discret" icon onClick={n}>
        <ImCross className='w-2.5 h-2.5 text-tanj-pink' />
      </Button>
      <Button variant="discret" icon onClick={y}>
        <FaCheck className='w-2.5 h-2.5 text-tanj-green' />
      </Button>
    </div>
  );
}