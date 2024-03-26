import { IoClose } from 'react-icons/io5';
import * as Button from './Buttons';

interface ModalProps { 
  isModalOpen?: boolean
  closeFn: () => void
  children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[], 
}

export function Modal(props: ModalProps) {
  const { isModalOpen, closeFn, children } = props;
  
  if (!children)
    return null;

  if (isModalOpen === false || isModalOpen === null)
    return null;

  return (
    <div className="z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-tanj-pink bg-opacity-25" style={{backdropFilter:'blur(8px)'}}>
      <div className="p-8 rounded-sm bg-gray-800 relative">
        <CloseButton {...{closeFn}} />
        { children }
      </div>
    </div>
  )
}

function CloseButton(props: { closeFn: () => void }) {
  return (
    <Button.Secondary icon className="absolute top-2 right-2" onClick={props.closeFn}>
      <IoClose />
    </Button.Secondary>
  )
}