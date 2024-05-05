import { useContext } from "react";
import { MenuContext } from "./Context";

export const useDropDown = () => useContext(MenuContext);