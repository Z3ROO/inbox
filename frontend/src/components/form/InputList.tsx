import { IoClose } from "react-icons/io5";
import { BtnPrimary, BtnSecondary } from "../Buttons";
import { Input } from "./Input";

interface IInputList<T extends { value: string }> {
  values: T[] 
  setValues: (data: T[]) => void
  onDelete?: (data: T) => void
}

export function InputList<T extends { value: string }>(props: IInputList<T>) {
  const { values, setValues, onDelete } = props;
  console.log("Review this");
  return (
    <div>
      <BtnPrimary onClick={() => {
        setValues(values.concat({value: ''} as T))
        }}>+</BtnPrimary>
      {
        values.map((item, i) => (
          <div className="flex">
            <label className="grow">
              <div className="font-bold">Task #{i+1}</div>
              <div className="relative">
                <Input type="text"
                  className="w-full pr-10"
                  value={item.value} 
                  onChange={e => {
                    setValues(values.map((_, index) => {
                      if (index === i) {
                        return {
                          ..._,
                          value: e.target.value
                        }
                      }
                      
                      return _
                    }))
                  } 
                } />
                <BtnSecondary icon
                  type="button"
                  className="absolute right-1 top-1 m-0"
                  onClick={
                    e => {
                      e.stopPropagation();
                      setValues(values.filter((_, index) => {
                        if (index !== i)
                          return true
                        
                        if (onDelete)
                          onDelete(_);
                        return false;
                      }))
                    } 
                  }
                >
                  <IoClose />
                </BtnSecondary>
              </div>
            </label>
          </div>
        ))
      }
    </div>
  )
}