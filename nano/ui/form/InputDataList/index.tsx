import { HiExclamationCircle } from "react-icons/hi2"
import { InputDataListContextProvider, UseInputDataListContext } from "./Context"
import DataList from "./DataList"
import InputSetup from "./InputSetup"


export interface InputDataListAttributes {
  value: { label: string, value: string }
  setValue: (value: { label: string, value: string }) => void
  options: { label: string, value: string }[]
  className?: string
  ulClassName?: string
  liClassName?: string
}


export function InputDataList(props: InputDataListAttributes) {
  return (
    <InputDataListContextProvider {...props}>
      <div className="relative">
        <InputSetup />
        <DataList />
        <InexistentOptionWarning />
      </div>
    </InputDataListContextProvider>
  )
}

function InexistentOptionWarning() {
  const { inputText, value } = UseInputDataListContext()!;

  if (inputText !== '' && !value.value)
    return (
      <HiExclamationCircle className="absolute right-2 top-2.5 fill-red-400 w-5 h-5" />
    )
  
  return null;
}
