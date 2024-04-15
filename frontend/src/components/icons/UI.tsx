import { AiFillAlert, AiOutlineFieldTime } from "react-icons/ai";
import { IoAlertCircle } from "react-icons/io5";
import { BsFillPinAngleFill } from "react-icons/bs";
import { LuBoxSelect } from "react-icons/lu";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaCircleNotch, FaPlus, FaInbox } from "react-icons/fa";
import { DotedUncheckedbox } from "./rehearsal";
import { CgCheckR, CgCloseR, CgPlayPauseR } from "react-icons/cg";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { BsFillCheckSquareFill } from "react-icons/bs";

export const Priority = {
  urgent: AiFillAlert,
  important: IoAlertCircle,
  necessary: BsFillPinAngleFill,
  none: LuBoxSelect
}

export const Checkbox = {
  unchecked: ImCheckboxUnchecked,
  checked: CgCheckR,
  doted: DotedUncheckedbox,
  canceled: CgCloseR,
  paused: CgPlayPauseR
}

export const Inbox = {
  out: FaInbox
}

export const Util = {
  plus: FaPlus,
  loading: FaCircleNotch,
  none: LuBoxSelect,
  checkbox: BsFillCheckSquareFill
}

export const Action = {
  undo: FaUndoAlt,
  delete: FaTrashAlt
}

export const Time = {
  passing: AiOutlineFieldTime
}