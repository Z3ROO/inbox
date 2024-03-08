export interface IInboxContext {
  inboxManagerTextarea: string
  setInboxManagerTextarea: React.Dispatch<React.SetStateAction<string>>
  isInboxManagerOpen: boolean
  toggleInboxManager: () => void
}