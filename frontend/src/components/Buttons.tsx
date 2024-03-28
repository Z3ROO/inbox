import { ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'|'secondary'|'discret'
  icon?: boolean
  outline?: boolean
  round?: boolean
  className?: string
}



const primaryBtnDefault_TW = 'text-tanj-white border border-tanj-gray bg-gradient-to-br from-tanj-pink to-tanj-gray hover:from-tanj-green hover:to-tanj-pink';
const primaryBtnOutline_TW = 'text-tanj-white border border-tanj-pink hover:border-tanj-green';

const secondaryBtnDefault_TW = 'text-tanj-pink hover:text-tanj-green hover:bg-tanj-gray ';
const secondaryBtnOutline_TW = 'text-tanj-pink hover:text-tanj-green  border border-transparent hover:border-tanj-gray ';

const discretBtnDefault_TW = '';

const ButtonStyling: {[key: string] : {default: string, outline: string} } = {
  primary: {
    default: primaryBtnDefault_TW,
    outline: primaryBtnOutline_TW
  },
  secondary: {
    default: secondaryBtnDefault_TW,
    outline: secondaryBtnOutline_TW
  },
  discret: {
    default: discretBtnDefault_TW,
    outline: ''
  }
}

export function Button (props: ButtonProps) {
  const { icon, outline, variant = 'secondary', round, className } = props;
  
  return (
    <button {...props} className={`
      ${ icon ? ' p-2 ' : ' py-2 px-4 ' /* x */ }
      ${ round ? ' rounded-full ' : ' rounded-sm ' } 
      m-2 disabled:grayscale disabled:opacity-50 disabled:pointer-events-none disabled:filter disabled:contrast-75
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