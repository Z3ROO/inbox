import { ReactNode } from "react"
import { DropDownContextProvider } from "../store/Context";


export function DropDownEngine({ children }: { children?: ReactNode }) {

  return (
    <DropDownContextProvider>
      <div>
        <div className="relative z-10" onClick={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </DropDownContextProvider>
  );
}
