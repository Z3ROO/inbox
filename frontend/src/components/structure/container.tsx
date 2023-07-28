import { HTMLAttributes } from "react";

export function Container(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      {...props} 
      className={`p-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm ${props.className}`} 
    />
  )
}