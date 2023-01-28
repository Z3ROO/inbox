import { createContext, useContext, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { IKagura, IKaguraContext, RoutineState } from "@/features/kagura/types";
import * as KaguraAPI from "@/features/kagura/api";
import { queryClient } from "@/App";

const Context = createContext<IKaguraContext|null>(null);

export function KaguraProvider(props: { children: (JSX.Element|null|false)[]|JSX.Element|null|false}) {
  const [performingRoutine, setPerformingRoutine] = useState<RoutineState>(null);

  const kagura = useQuery('kagura', KaguraAPI.getKagura, {
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onSuccess: () => {
      console.log('aAAAAAAAAAAAAAAAAAAAAAAA')
    }
  });

  const evaluateCard = useMutation(KaguraAPI.evaluateCard, {
    onSuccess: (responseData, args) => {
      queryClient.setQueryData<IKagura[]>('kagura', (data) => {
        if (data && performingRoutine) {
          const type = data.find(t => t.type === performingRoutine[0])!;
          const routine = type.routines.find(c => c.category === performingRoutine![1])!;

          if (routine.cards.length) {
            routine.cards = routine.cards.filter((d, index) =>  index !== 0)

            if (routine.cards.length === 0)
              setPerformingRoutine(null);
          }
          
          return data;
        }

        return []
      })
    }
  });

  const insertCard = useMutation(KaguraAPI.insertCard)

  const value: IKaguraContext = {
    performingRoutine, setPerformingRoutine,
    kagura,
    evaluateCard,
    insertCard
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}

export const useKagura = () => useContext(Context);