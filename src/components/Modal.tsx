import { IoClose } from 'react-icons/io5';
import { BtnSecondary } from './Buttons';

export default function Modal(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[], closeFn: () => void }) {
  
  if(!props.children)
    return null

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-tanj-pink bg-opacity-25" style={{backdropFilter:'blur(8px)'}}>
      <div className="p-8 rounded-sm bg-gray-800 relative">
        <CloseButton closeFn={props.closeFn} />
        {props.children}
      </div>
    </div>
  )
}

function CloseButton(props: { closeFn: () => void }) {
  return (
    <BtnSecondary icon className="absolute top-2 right-2" onClick={props.closeFn}>
      <IoClose />
    </BtnSecondary>
  )
}