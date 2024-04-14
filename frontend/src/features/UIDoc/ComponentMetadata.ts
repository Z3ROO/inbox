export interface ComponentMetadata {
  name: string
  directory: string
}

/**
* ###### *Custom component*
* ## NanoComponentsDirectoryList
*  
* Colection of name and directory nano components.
* 
* Example: 
* ```ts
* [{
*    name: 'Buttons',
*    directory: '../../components/Buttons.sample.tsx'
* }] 
*
* ```
* 
*/

export const NanoComponentsDirectoryList: ComponentMetadata[] = [
  {
    name: 'dropdown Menu',
    directory: '../../components/dropdown/DropDownMenu.sample.tsx'
  },
  {
    name: 'Buttons',
    directory: '../../components/Buttons.sample.tsx'
  }
]
