import { Page } from "@z3ro/nano";
import { useState } from "react";
import { ComponentMetadata } from "../ComponentMetadata";
import { ComponentsListSideBar } from "./ComponentsListSidebar";
import { ComponentSample } from "./ComponentSample";


/**
* ###### *Custom component*
* ## UIDocumentionPage
* 
* Page component for documentation of UI components
* 
* @returns JSX.Element
*/

export function UIDocumentationPage() {
  const [currentComponent, setCurrentComponent] = useState<ComponentMetadata|null>(null);
  return (
    <Page className="flex">
      <ComponentsListSideBar {...{currentComponent, setCurrentComponent}} />
      { currentComponent && <ComponentSample {...currentComponent} /> }
    </Page>
  )
}