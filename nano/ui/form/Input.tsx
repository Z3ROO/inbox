
/**
 * ###### Nano component
 * ### Text Input
 * 
 * @param props DEFAULT INPUT PROPS
 * @returns JSX.Element
 */

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`
    text-tanj-gray bg-tanj-white rounded-sm p-1.5 
    shadow-inner shadow-[rgba(0,0,0,0.2)] 
    border-2 border-tanj-pink focus:border-tanj-green outline-none 
  ` + props.className} />
}

/**
 * ###### Nano component
 * ### Textarea Input
 * 
 * @param props DEFAULT INPUT PROPS
 * @returns JSX.Element
 */

export function Textarea(props: React.InputHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`
    text-tanj-gray bg-tanj-white rounded-sm p-1.5 
    shadow-inner shadow-[rgba(0,0,0,0.2)] 
    border-2 border-tanj-pink focus:border-tanj-green outline-none 
  ` + props.className} />
}
