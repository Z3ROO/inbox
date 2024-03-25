import { Input } from "../Input";
import { UseInputDataListContext } from "./Context";

export default function InputSetup() {
  const { className, inputText, setInputText, autoSelectOptionIfMatch, openDataList, closeDataList } = UseInputDataListContext()!;

  return (
      <Input 
        type="text" 
        className={' ' + (className || 'w-64')} 
        value={inputText} 
        onChange={(e) => {
          e.stopPropagation();
          const textContent = e.target.value;
          setInputText(textContent);
          autoSelectOptionIfMatch(textContent);
        }}
        onFocus={openDataList}
        onBlur={closeDataList}
      />
  )
}