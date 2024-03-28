import Page from "@/components/structure/Page";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const components = [
  {
    name: 'Dropdown Menu',
    directory: '../../components/dropdown/DropDownMenu.sample.tsx'
  }
]

export default function UIDocumentationPage() {
  const [current, setCurrent] = useState<{name: string, directory: string}|null>(null);
  return (
    <Page className="flex">
      <ul>
        <Link to={'/'}>
          <li>Voltar</li>
        </Link>
        {
          components.map(({name, directory}) => {
           return <li onClick={() => setCurrent({name, directory})}>{name}</li>
          })
        }
      </ul>
      { current && <ComponentSample componentName={current.directory} /> }
    </Page>
  )
}


function ComponentSample({componentName}: {componentName: string}) {
  const [code, setCode] = useState('');
  const [Component, setComponent] = useState({current:() => <>terradasd aczczxczxc zxc zxc zxc</>});

  useEffect(() => {
    import(`${componentName}`)
    .then(data => {
      
      if (typeof data.code === 'string')
        setCode(data.code);

      try {
        setComponent({current:data.ComponentSample});
      }
      catch(err) {
        console.log(err)
        setComponent({current:() => <>Unabble to set the component</>});
      }
    })
  },[]);

  return (
    <div>
      <div className="p-8 border">
        <Component.current />
      </div>
      <div className="p-4 rounded bg-gray-500 shadow-md border border-gray-600">
        <pre>{code}</pre>
      </div>
    </div>    
  )
}