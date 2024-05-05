import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from "./dropdown";
import { Action } from "./icons/UI";

export interface NanoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export function ConfirmButton(props: NanoButtonProps) {
  const { onClick, children } = props;

  return (
    <DropDownMenu>
      <DropDownMenuTriggerOnClick {...props} onClick={undefined}>
        {children}
      </DropDownMenuTriggerOnClick>
      <DropDownMenuContent direction="horizontal">
        <DropDownMenuItem onClick={onClick} icon>
          <Action.check className='w-2.5 h-2.5' />
        </DropDownMenuItem>
        <DropDownMenuItem icon>
          <Action.cross className='w-2.5 h-2.5' />
        </DropDownMenuItem>
      </DropDownMenuContent>
    </DropDownMenu>
  );
}
