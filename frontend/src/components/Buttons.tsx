import { ButtonHTMLAttributes } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean
  outline?: boolean
  bgLess?: boolean
}

export function BtnPrimary (props: BtnProps) {
  const { icon, outline, bgLess } = props;

  return (
    <button {...props} className={`
      ${ icon ? ' p-2 ' : ' py-2 px-4 ' } 
      ${ (bgLess || outline) ? '  ' : ' bg-gradient-to-br from-tanj-pink to-tanj-gray hover:from-tanj-green hover:to-tanj-pink '}
      ${ outline ? ' border border-tanj-pink hover:border-tanj-green ' : ' border border-tanj-gray '}
      m-2 rounded-sm text-tanj-white  ${props.className}
    `} />
  )
}

export function BtnSecondary (props: BtnProps) {
  const { icon, outline, bgLess } = props;

  return (
    <button {...props} className={`
    ${ icon ? ' p-2 ' : ' py-2 px-4 ' } 
    ${ (bgLess || outline) ? '  ' : ' hover:bg-tanj-gray  hover:text-tanj-green '}
    ${ outline ? ' border border-transparent hover:border-tanj-gray ' : '  '}
      m-2 rounded-sm text-tanj-pink hover:text-tanj-green ${props.className}
    `} />
  )
}