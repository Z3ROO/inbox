import { UseQueryResult } from "react-query"
import { DraftItemDTO, IDraft } from "shared-types"

export interface IDraftEditorContext {
  draft: IDraft|undefined
  setDraft: React.Dispatch<React.SetStateAction<IDraft|undefined>>
  mode: "create" | "edit" | null
  setMode: (mode: "create" | "edit"| null) => void
  inbox: UseQueryResult<IDraft[], unknown>
}

export interface DraftItemsMethods {
  newItem: (item: DraftItemDTO) => void
  itemsOptions: { label: string, cb: (item_id: string) => void }[]
}