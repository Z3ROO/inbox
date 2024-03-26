import { createContext, ReactNode, useState, useRef, useEffect } from "react";

export const MenuContext = createContext<IMenuContext|null>(null);

interface IMenuContext {
  triggerType: React.MutableRefObject<'click'|'mousemove'>;
  isDropDownOpen: boolean;
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
}

export function DropDownContextProvider({children}: { children: ReactNode }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const triggerType = useRef<'click'|'mousemove'>('click');
  
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
        isDropDownOpen,
        setIsDropDownOpen,
        triggerType,
        close: () => setIsDropDownOpen(false)
      }}>
      {children}
    </MenuContext.Provider>
  )
}
