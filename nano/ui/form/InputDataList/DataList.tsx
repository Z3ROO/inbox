import { UseInputDataListContext } from "./Context";

export default function DataList() {
  const { options, liClassName, ulClassName, chooseOption, isDataListOpen } = UseInputDataListContext()!;
  
  if (!isDataListOpen)
    return null;

  return (
    <ul
      className={'z-10 text-input-data-list absolute top-[calc(100%-2px)] left-0 overflow-auto bg-tanj-white border-2 border-tanj-green rounded-sm border-t-0 shadow-md ' + (ulClassName || ' w-full max-h-48')}
    >
      {
        options.map(option => {
          const { label, value } = option;
          return (
            <li
              className={'p-1.5 hover:bg-tanj-green hover:font-bold cursor-pointer ' + (liClassName || ' w-full ')}
              onClick={(e) => {
                e.stopPropagation();
                chooseOption(label, value);
              }}
            >{label}</li>
          )
        })
      }
    </ul>
  )
}