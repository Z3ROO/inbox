import { LoadingSpinner } from "@z3ro/nano";
import { useState, useEffect } from "react";
import { ComponentMetadata } from "../ComponentMetadata";

/**
* ###### *Custom component*
* ## ComponentSample
* 
* Shows a preview of a component on top and a code example in the bottom.
* 
* Dynamic imports a component defined but the current name and directory passed to the component
* 
* @param name - Component name.
* @param directory - Component directory location.
* @returns JSX.Element
*/

export function ComponentSample({name, directory}: ComponentMetadata) {
  const [code, setCode] = useState('');
  const [Component, setComponent] = useState({current:() => <LoadingSpinner />});

  useEffect(() => {
    import(`${directory}`/* @vite-ignore */)
    .then(data => {
      
      if (typeof data.code === 'string')
        setCode(data.code);

      try {
        setComponent({current:data.ComponentSample});
      }
      catch(err) {
        console.log(err)
        setComponent({current:UnableToLoad});
      }
    })
  },[name, directory]);

  return (
    <div className="flex-grow p-8">
      <h3 className="my-8 text-gray-100">{name}</h3>
      <div className="p-8 my-4 bg-gray-700 flex justify-center items-center min-h-[16rem]">
        <Component.current />
      </div>
      <div className="p-4 my-4 rounded text-white bg-gray-700 shadow-inner shadow-gray-800 border border-gray-600 max-w-3xl max-h-96 mx-auto">
        <pre>{code}</pre>
      </div>
    </div>    
  )
}

function UnableToLoad() {
  return (
    <div>
      <span>Unable to set the component</span>
    </div>
  )
}