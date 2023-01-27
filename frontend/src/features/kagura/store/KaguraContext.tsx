import { createContext, useContext, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { IKagura, IKaguraContext, RoutineState } from "@/features/kagura/types";
import * as KaguraAPI from "@/features/kagura/api";
import { queryClient } from "@/App";

const Context = createContext<IKaguraContext|null>(null);



export function KaguraProvider(props: { children: (JSX.Element|null|false)[]|JSX.Element|null|false}) {
  const [routine, setRoutine] = useState<RoutineState>(null);

  const kagura = useQuery('kagura', KaguraAPI.getKagura);

  const evaluateCard = useMutation(KaguraAPI.evaluateCard, {
    onSuccess: (responseData, args) => {
      queryClient.setQueryData<IKagura[]>('kagura', (data) => {
        if (data) {
          const category = data.find(type => type.type === routine![0])?.routines.find(category => category.category === routine![1]);
          if (category?.cards.length)
            category.cards = category.cards.filter((d, index) =>  index !== 0)
          
          return data
        }

        return []
      })
    }
  });

  const value: IKaguraContext = {
    routine, setRoutine,
    kagura,
    evaluateCard
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}

export const useKagura = () => useContext(Context);