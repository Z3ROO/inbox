import { createContext, ReactNode, useContext, useState } from "react";

const ConfigContext = createContext<RehearsalConfigContext|null>(null);

interface RehearsalConfigContext {
  mode: 'practical'|'theoretical'
  setMode: React.Dispatch<React.SetStateAction<'practical'|'theoretical'>>
}

export const useRehearsalConfigContext = () => useContext(ConfigContext);

export function RehearsalConfigContextProvider({children}:{children: ReactNode}) {
  const [mode, setMode] = useState<'practical'|'theoretical'>('practical');

  const context: RehearsalConfigContext = {
    mode, setMode
  };

  return (
    <ConfigContext.Provider value={context}>
      {children}
    </ConfigContext.Provider>
  );
}
