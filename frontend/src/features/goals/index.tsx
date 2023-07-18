import { useState, ReactNode } from 'react';
import { BtnSecondary } from "@/components/Buttons";
import { HiMiniBackspace } from 'react-icons/hi2';
import { IoRadioButtonOnOutline, IoRadioButtonOffOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";

export function Widget() {
  return (
    <div className="flex flex-col p-8 mx-4 w-max grow">
      <Link to="/goals">
      <h4 className="text-tanj-green">Goals</h4>
      </Link>
      <Teaser />
      <ActiveGoals />
    </div>
  );
}

function Teaser() {
  return (
    <div>
      <div className="relative p-4 my-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm w-full max-w-md group">
        <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">aaaaaaaaaaaaaaa aaaaaaaaaaaa</span>
      </div>
    </div>
  )
}

function ActiveGoals() {
  const [radio, setRadio] = useState(false);
  return (
    <div>
      <div className="relative p-4 my-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm w-full max-w-md group">
        <h5 className="text-tanj-green">Goal title</h5>
        <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">aaaaaaaaaaaaaaaaa aaaaaaaaa aaqweqweqw</span>
        <div>
          <ul>
            <li>
              <RadioButton checked={radio} onChange={e => setRadio(prev => !prev)}>
                <span>Teste testoso asd asdasdasdsadas dasdasd sadasdasda sdasd asd asd asd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasd asdasd asdasdas das.</span>
              </RadioButton>
            </li>
            <li>
              <RadioButton checked={radio} onChange={e => setRadio(prev => !prev)}>
                <span>Teste testoso asd asdasdasdsadas dasdasd sadasdasda sdasd asd asd asd asdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasd asdasd asdasdas das.</span>
              </RadioButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface CustomRadioButton extends React.InputHTMLAttributes<HTMLInputElement> {

}

const CheckBox_TW = 'text-tanj-green mt-1 mr-1.5 shrink-0';
function RadioButton(props : CustomRadioButton) {
  
  return (
    <label>
      <input className="opacity-0" {...props} children={undefined} type="checkbox" />
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

export function Manager() {
  return (
    <div className="w-full h-full relative">
      <Link to="/">
        <BtnSecondary className="absolute top-6 left-6 p-2" icon>
          <HiMiniBackspace />
        </BtnSecondary>
      </Link>
    </div>
  );
}


