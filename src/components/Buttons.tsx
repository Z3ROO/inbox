import { ButtonHTMLAttributes } from "react";

export function BtnPrimary (props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`
      m-2 py-2 px-4 rounded-sm bg-tanj-brown hover:bg-tanj-green text-tanj-white ${props.className}
    `} />
  )
}

export function BtnIcon (props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`
      m-2 p-2 rounded-sm bg-tanj-brown hover:bg-tanj-green text-tanj-white ${props.className}
    `} />
  )
}