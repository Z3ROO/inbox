import { ReactNode } from "react"
import { DropDownContextProvider } from "../store/Context";


export function DropDownEngine({ children }: { children?: ReactNode }) {

  return (
    <DropDownContextProvider>
      <div className="relative z-10" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </DropDownContextProvider>
  );
}
