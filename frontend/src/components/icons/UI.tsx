import { AiFillAlert } from "react-icons/ai";
import { IoAlertCircle } from "react-icons/io5";
import { BsFillPinAngleFill } from "react-icons/bs";
import { TfiLayoutSidebarNone } from "react-icons/tfi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaCircleNotch } from "react-icons/fa";
import { DotedUncheckedbox } from "./rehearsal";
import { CgCheckR, CgCloseR, CgPlayPauseR } from "react-icons/cg";

export const Priority = {
  urgent: AiFillAlert,
  important: IoAlertCircle,
  necessary: BsFillPinAngleFill,
  none: TfiLayoutSidebarNone
}

export const Checkbox = {
  unchecked: ImCheckboxUnchecked,
  checked: CgCheckR,
  doted: DotedUncheckedbox,
  canceled: CgCloseR,
  paused: CgPlayPauseR
}

export const Util = {
  loading: FaCircleNotch
}