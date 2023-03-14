import { createContext, useContext, useState } from "react"
import { RehearsalByType, RehearsalContext, RoutineState } from "@/features/rehearsal/types";
import * as RehearsalAPI from "@/features/rehearsal/api";
import { queryClient } from "@/App";

const Context = createContext<RehearsalContext|null>(null);

export function RehearsalProvider(props: { children: (JSX.Element|null|false)[]|JSX.Element|null|false}) {
  const [performingRoutine, setPerformingRoutine] = useState<RoutineState>(null);

  const rehearsalDecks = RehearsalAPI.QueryRehearsalDecks();

  const evaluateCard = RehearsalAPI.EvaluateCard({
    onSuccess: (responseData, args) => {
      queryClient.setQueryData<RehearsalByType[]>('rehearsal', (data) => {
        if (data && performingRoutine) {
          const type = data.find(t => t.type === performingRoutine[0])!;
          const deck = type.decks.find(c => c.category === performingRoutine![1])!;

          if (deck.cards.length) {
            deck.cards = deck.cards.filter((_, index) =>  index !== 0)

            if (deck.cards.length === 0)
            setPerformingRoutine(null);
          }

          return data;
        }

        return []
      })
    }
  });

  const removeCard = RehearsalAPI.RemoveCard({
    onSuccess: (responseData, args) => {
      queryClient.setQueryData<RehearsalByType[]>('rehearsal', (data) => {
        if (data && performingRoutine) {
          const type = data.find(t => t.type === performingRoutine[0])!;
          const deck = type.decks.find(c => c.category === performingRoutine![1])!;

          if (deck.cards.length) {
            deck.cards = deck.cards.filter((_, index) =>  index !== 0)

            if (deck.cards.length === 0)
              setPerformingRoutine(null);
          }
          
          return data;
        }

        return []
      })
    }
  });

  const insertCard = RehearsalAPI.InsertCard();

  const value: RehearsalContext = {
    performingRoutine, setPerformingRoutine,
    rehearsalDecks,
    evaluateCard,
    insertCard,
    removeCard
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}

export const useRehearsalContext = () => useContext(Context);
