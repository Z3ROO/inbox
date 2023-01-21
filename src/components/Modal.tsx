import BtnPrimary from "./button/BtnPrimary";
import { IoClose } from 'react-icons/io5';

export default function Modal(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[], close: () => void }) {
  
  if(!props.children)
    return null

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center" style={{backdropFilter:'blur(8px)'}}>
      <div className="p-8 rounded-sm bg-tanj-brown relative">
        <BtnPrimary className="absolute top-2 right-2" onClick={props.close}>
          <IoClose />
        </BtnPrimary>
        {props.children}
      </div>
    </div>
  )
}