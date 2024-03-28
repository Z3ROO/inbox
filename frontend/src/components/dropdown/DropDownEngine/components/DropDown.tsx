import { ReactNode, useMemo } from "react"
import { DropDownContextProvider } from "../store/Context";


export function DropDownEngine({ children }: { children?: ReactNode }) {
  const key = useMemo(() => Date.now(), []);
  return (
    <DropDownContextProvider>
      <div className="inline-block">
        <div className="relative z-10" id={key.toString()} onClick={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </DropDownContextProvider>
  );
}
