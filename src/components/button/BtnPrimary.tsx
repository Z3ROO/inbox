import { ButtonHTMLAttributes } from "react";

export default function BtnPrimary (props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`
      m-2 p-2 rounded-sm bg-tanj-brown hover:bg-tanj-green text-tanj-white ${props.className}
    `} />
  )
}