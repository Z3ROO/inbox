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
          <DropDownMenuContent position="bottom">
            <DropDownMenuItem>Opção 1</DropDownMenuItem>
            <DropDownMenuItem>Opção 2</DropDownMenuItem>
            <DropDownMenuItem>Opção 3</DropDownMenuItem>
          </DropDownMenuContent>
        </DropDownMenu>

        <DropDownMenu>
          <DropDownMenuTriggerOnClick>Click</DropDownMenuTriggerOnClick>
          <DropDownMenuContent direction="horizontal">
            <DropDownMenuItem>Opção 1</DropDownMenuItem>
            <DropDownMenuItem>Opção 2</DropDownMenuItem>
            <DropDownMenuItem>Opção 3</DropDownMenuItem>
          </DropDownMenuContent>
        </DropDownMenu>
      
        <DropDownMenu>
          <DropDownMenuTriggerOnHover>Hover</DropDownMenuTriggerOnHover>
          <DropDownMenuContent direction="horizontal" position="bottom">
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