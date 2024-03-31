import { DraftItemDTO, IDraft } from "shared-types"

export interface IInboxContext {
  draft: IDraft|undefined
  setDraft: React.Dispatch<React.SetStateAction<IDraft|undefined>>
  mode: "create" | "edit" | null
  setMode: (mode: "create" | "edit"| null) => void
}

export interface DraftItemsMethods {
  newItem: (item: DraftItemDTO) => void
  itemsOptions: { label: string, cb: (item_id: string) => void }[]
}