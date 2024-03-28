import { DropDownMenu, DropDownMenuTriggerOnClick, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnHover } from "./DropDownMenu"

export function ComponentSample() {
  return (
    <div>
      
        <DropDownMenu>
          <DropDownMenuTriggerOnClick>Click</DropDownMenuTriggerOnClick>
          <DropDownMenuContent>
            <DropDownMenuItem>Opção 1</DropDownMenuItem>
            <DropDownMenuItem>Opção 2</DropDownMenuItem>
            <DropDownMenuItem>Opção 3</DropDownMenuItem>
          </DropDownMenuContent>
        </DropDownMenu>
      
        <DropDownMenu>
          <DropDownMenuTriggerOnHover>Hover</DropDownMenuTriggerOnHover>
          <DropDownMenuContent>
            <DropDownMenuItem>Opção 1</DropDownMenuItem>
            <DropDownMenuItem>Opção 2</DropDownMenuItem>
            <DropDownMenuItem>Opção 3</DropDownMenuItem>
          </DropDownMenuContent>
        </DropDownMenu>
      
    </div>
  )
}

export const code = `
    <DropDownMenu>
      <DropDownMenuTriggerOnClick>Open</DropDownMenuTriggerOnClick>
      <DropDownMenuContent>
        <DropDownMenuItem>Opção 1</DropDownMenuItem>
        <DropDownMenuItem>Opção 2</DropDownMenuItem>
        <DropDownMenuItem>Opção 3</DropDownMenuItem>
      </DropDownMenuContent>
    </DropDownMenu>
`