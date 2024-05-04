import { useState } from "react";

export function Teste() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="bg-red-600 px-6 py-4 rounded-lg border border-slate-500">
      <h1 className="font-bold text-xl">Componente teste</h1>
      <div>
        <h2 className="border">Counter:s</h2>
        <button onClick={() => {
          setCount(prev => prev+1);
        }}>{count}</button>
      </div>
    </div>
  );
}