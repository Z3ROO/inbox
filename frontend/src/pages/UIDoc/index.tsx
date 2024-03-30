import Page from "@/components/structure/Page";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ComponentMetaData, components } from "./components";
import { LoadingSpinner } from "@/components/Loading";

export default function UIDocumentationPage() {
  const [current, setCurrent] = useState<ComponentMetaData|null>(null);
  return (
    <Page className="flex">
      <ComponentList {...{current, setCurrent}} />
      { current && <ComponentSample {...current} /> }
    </Page>
  )
}

function ComponentList({current, setCurrent}: {current: ComponentMetaData | null, setCurrent: React.Dispatch<React.SetStateAction<ComponentMetaData | null>>}) {
  return (
    <ul className="bg-gray-900 h-screen p-2 min-w-[12rem] w-1/6">
      <Link to={'/'}>
        <ComponentListItem>Voltar</ComponentListItem>
      </Link>
      <hr className=" mt-1 mb-2"/>
      {
        components.map(({name, directory}) => {
          return (
          <> 
            <ComponentListItem onClick={() => setCurrent({name, directory})}>
              {name}
            </ComponentListItem>
            <hr className="border-gray-550 my-1"/>
          </>
          )
        })
      }
    </ul>
  );
}

function ComponentListItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li 
      {...props} 
      className={`py-1 px-2 rounded-sm hover:bg-gray-600 text-gray-250 hover:text-gray-100 cursor-pointer w-full ${props.className}`} 
    />
  )
} 


function ComponentSample({name, directory}: ComponentMetaData) {
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