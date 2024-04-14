import { Link } from "react-router-dom";
import { ComponentMetadata, NanoComponentsDirectoryList } from "../ComponentMetadata";


/**
 * ###### *Custom component*
 * ## ComponentList
 * 
 * Sidebar that list components from a list of component metadata. 
 * 
 * Each list item set `setCurrentComponent` state.
 * 
 * @param currentComponent - ComponentMetadata state value
 * @param serCurrentComponent - ComponentMetadate state setter
 * @returns JSX.Element
 */

export function ComponentsListSideBar({currentComponent, setCurrentComponent}: {currentComponent: ComponentMetadata | null, setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentMetadata | null>>}) {
  return (
    <ul className="bg-gray-900 h-screen p-2 min-w-[12rem] w-1/6">
      <Link to={'/'}>
        <ComponentListItem>Voltar</ComponentListItem>
      </Link>
      <hr className=" mt-1 mb-2"/>
      {
        NanoComponentsDirectoryList.map(({name, directory}) => {
          return (
          <> 
            <ComponentListItem onClick={() => setCurrentComponent({name, directory})}>
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

/**
* ###### *Custom component*
* ## ComponentListItem
* 
* `<li>` wrapper for easier styling.
* 
* @param props 
* @returns JSX.Element
*/

export function ComponentListItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li 
      {...props} 
      className={`py-1 px-2 rounded-sm hover:bg-gray-600 text-gray-250 hover:text-gray-100 cursor-pointer w-full ${props.className}`} 
    />
  )
} 
