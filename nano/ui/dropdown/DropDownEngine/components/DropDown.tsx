import { ReactNode, useMemo } from "react"
import { DropDownContextProvider } from "../store/Context";


export function DropDownEngine({ children }: { children?: ReactNode }) {

  return (
    <DropDownContextProvider>
      <div className="relative z-10" >
        {children}
      </div>
    </DropDownContextProvider>
  );
}
//onClick={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}