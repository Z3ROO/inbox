import { ReactNode, useState, useEffect, useRef, createContext, useContext } from "react"

type DropDownProps = {
  children: ReactNode
  position?: 'top'|'bottom'|'left'|'right'
  align?: 'start'|'center'|'end'
}

const MenuContext = createContext<IMenuContext|null>(null);
const useMenu = () => useContext(MenuContext);
interface IMenuContext {
  props: React.MutableRefObject<{
      position: string;
      align: string;
  }>;
  triggerType: React.MutableRefObject<'click'|'mousemove'>;
  isDropDownOpen: boolean;
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DropDownContextProvider({children, position, align}: {children: ReactNode, position: string, align: string}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const triggerType = useRef<'click'|'mousemove'>('click');
  const props = useRef({position, align});
  
  useEffect(() => {
    const handler = () => {
      setIsDropDownOpen(false);
    }

    if (isDropDownOpen)
      window.addEventListener(triggerType.current, handler);

    return () => window.removeEventListener(triggerType.current, handler);
  }, [isDropDownOpen, triggerType.current])

  return (
    <MenuContext.Provider value={{
        props,
        isDropDownOpen,
        setIsDropDownOpen,
        triggerType
      }}>
      {children}
    </MenuContext.Provider>
  )
}

export function DropDownEngine({children, position, align}: DropDownProps) {
  if (!position)
    position = 'bottom';

  if (!align)
    align = 'center';

  return (
    <DropDownContextProvider {...{position, align}} >
      <div className="relative z-10" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </DropDownContextProvider>
  );
}

function DropDownTriggerOnClick({children}: {children: ReactNode}) {
  const menuContext = useMenu();
  
  if (!menuContext)
    return null;

  return (
    <button
      onClick={e => {
        menuContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{children}</button>
  )
}

function DropDownTriggerOnHover({children}: {children: ReactNode}) {
  const menuContext = useMenu();
  
  if (!menuContext)
    return null;

  useEffect(() => {
    menuContext.triggerType.current = 'mousemove';
  },[]);

  return (
    <button
      onMouseEnter={e => {
        menuContext.setIsDropDownOpen(prev => !prev);
      }} 
    >{children}</button>
  )
}

function DropDownTriggerOnHold({children}: {children: ReactNode}) {
  const menuContext = useMenu();
  
  if (!menuContext)
    return null;

  const timeout = useRef<NodeJS.Timeout>();
  const releaseClick = useRef(true);

  const mouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    timeout.current = setTimeout(()=>{
      menuContext.setIsDropDownOpen(prev => !prev);
      releaseClick.current = false;
    }, 250);
  }

  const mouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button !== 0) //If not left click
      return; 

    clearTimeout(timeout.current)

    if (releaseClick.current) {
      menuContext.setIsDropDownOpen(false);
    }
    else
      releaseClick.current = true;
  }

  return (
    <button
      onMouseUp={mouseUp}
      onMouseDown={mouseDown} 
    >{children}</button>
  )
}

function DropDownContent({children}: {children: ReactNode}) {
  const menuContext = useMenu();
  
  if (!menuContext)
    return null;

  const { position, align } = menuContext.props.current;

  if (!menuContext.isDropDownOpen)
    return null;

  return (
    <div 
      className={`
        absolute 
        ${position === 'top' && ' bottom-full mb-1'}
        ${position === 'bottom' && ' top-full mt-1'}
        ${position === 'left' && ' right-full mr-1'}
        ${position === 'right' && ' left-full ml-1'}
        ${((position === 'top' || position === 'bottom') && align === 'start') && ' left-0'}
        ${((position === 'top' || position === 'bottom') && align === 'center') && ' left-1/2 -translate-x-1/2'}
        ${((position === 'top' || position === 'bottom') && align === 'end') && ' right-0'}
        ${((position === 'left' || position === 'right') && align === 'start') && ' top-0'}
        ${((position === 'left' || position === 'right') && align === 'center') && ' top-1/2 -translate-y-1/2'}
        ${((position === 'left' || position === 'right') && align === 'end') && ' bottom-0'}
      `}
    >
      {children}
    </div>
  )
}
