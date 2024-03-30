import { createContext, ReactNode, useState, useRef, useEffect,  } from "react";

export const MenuContext = createContext<IMenuContext|null>(null);

interface IMenuContext {
  triggerType: React.MutableRefObject<'click'|'mousemove'>;
  isDropDownOpen: boolean;
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  contentElement: React.RefObject<HTMLDivElement>
}

export function DropDownContextProvider({children}: { children: ReactNode }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const triggerType = useRef<'click'|'mousemove'>('click');
  const rootDropDownElement = useRef<HTMLDivElement>(null);
  const contentElement = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
          rootDropDownElement.current && !rootDropDownElement.current.contains(target) &&
          contentElement.current && !contentElement.current.contains(target)
        )
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
        close: () => setIsDropDownOpen(false),
        contentElement
      }}>
      <div ref={rootDropDownElement} className="inline-block">
        {children}
      </div>
    </MenuContext.Provider>
  )
}
