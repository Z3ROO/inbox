export interface IInboxContext {
  inboxManagerTitle: string
  setInboxManagerTitle: React.Dispatch<React.SetStateAction<string>>
  inboxManagerTextarea: string
  setInboxManagerTextarea: React.Dispatch<React.SetStateAction<string>>
  isInboxManagerOpen: boolean
  toggleInboxManager: () => void
}