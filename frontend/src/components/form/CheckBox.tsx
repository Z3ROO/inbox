import { IoRadioButtonOnOutline, IoRadioButtonOffOutline } from 'react-icons/io5';

interface CustomCheckBox extends React.InputHTMLAttributes<HTMLInputElement> {

}

const CheckBox_TW = 'text-tanj-green mt-1 mr-1.5 shrink-0';
export function CheckBox(props : CustomCheckBox) {
  
  return (
    <label className='cursor-pointer'>
      <input className="opacity-0" {...props} children={undefined} type="checkbox" hidden />
      <div className='flex'>
    
      {
        props.checked ? 
          <IoRadioButtonOnOutline className={CheckBox_TW} /> :
          <IoRadioButtonOffOutline className={CheckBox_TW} />
      }
      <span>
        {props.children}
      </span>
      </div>
    </label>
  );

}