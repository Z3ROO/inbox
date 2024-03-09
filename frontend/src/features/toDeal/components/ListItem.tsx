import { FaCheck, FaTrashAlt } from "react-icons/fa";
import * as InboxAPI from '@/features/inbox/api';
import * as ToDealAPI from '@/features/toDeal/api';
import { IDraft } from "shared-types";
import { Container } from "@/components/structure/container";

export function Item({toDeal}: {toDeal: IDraft}) {
  const draft_id = toDeal._id;
  const updateDraft = InboxAPI.UpdateDraft();
  const toggleToDeal = ToDealAPI.ToggleToDeal();

  return (
    <Container className="relative my-4 w-full group">
      <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">{toDeal.content}</span>
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex bg-tanj-gray bg-opacity-90 rounded-sm p-0.5">
        <FaCheck 
          className="m-1 cursor-pointer text-tanj-green opacity-40 hover:opacity-100" 
          onClick={() => {
            updateDraft({
              action: 'remove',
              draft_id
            })
          }}
        />
        <FaTrashAlt 
          className="m-1 cursor-pointer text-tanj-pink opacity-40 hover:opacity-100" 
          onClick={() => {
            toggleToDeal({
              draft_id,
              state: false
            })
          }}
        />
      </div>
    </Container>
  )
}

