import { UseQueryResult } from "react-query"
import { DraftItemDTO, IDraft } from "shared-types"

export interface IDraftEditorContext {
  draft: IDraft|undefined
  setDraft: React.Dispatch<React.SetStateAction<IDraft|undefined>>
  draftItemsDTO: DraftItemDTO[]
  setDraftItemsDTO: React.Dispatch<React.SetStateAction<DraftItemDTO[]>>
  mode: "create" | "edit" | null
  setMode: (mode: "create" | "edit"| null) => void
  inbox: UseQueryResult<IDraft[], unknown>
}

export interface DraftItemsMethods {
  newItem: (item: DraftItemDTO) => void
  itemsOptions: { label: string, cb: (item_id: string) => void }[]
}