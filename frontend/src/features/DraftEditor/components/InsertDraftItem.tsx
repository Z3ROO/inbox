import { Modal } from "@/components/Modal";
import { DropDownMenu, DropDownMenuTriggerOnClick, DropDownMenuContent, DropDownMenuItem } from "@/components/dropdown";
import { Checkbox } from "@/components/icons/UI";
import { useState } from "react";
import { DraftItemDTO, IDraft } from "shared-types";
import * as DraftEditorAPI from '@/features/DraftEditor/api';
import { useDraftEditor } from "../store/DraftEditorContext";
import { Button } from "@/components/Buttons";

export function InsertDraftItem() {
  const [newItem, setNewItem] = useState<DraftItemDTO|null>(null);

  if (newItem)
    return (
      <ChooseNewDraftItem {...{newItem, setNewItem}} />
    )
  
  return (
    <ChooseItemTypeButton  {...{newItem, setNewItem}} />
  )
}

function ChooseNewDraftItem({ newItem, setNewItem }: { newItem: DraftItemDTO, setNewItem: React.Dispatch<React.SetStateAction<DraftItemDTO | null>> }) {
  const { mode, setDraftItemsDTO } = useDraftEditor();


  return (
    <div className='flex'>
      <ChooseItemTypeButton  {...{newItem, setNewItem}} />
      {
        newItem.type === 'new' && (
          <div>
            <input value={newItem.value} onChange={e => setNewItem({type: 'new', value: e.target.value})} />
            <button className='px-1.5 rounded border' onClick={() => {setNewItem(null)}}>XX</button>
          </div>
        )
      }
      {
        newItem.type === 'existing' && (
          <SearchDrafts result={(draft) => { setNewItem({type:'existing', value: draft._id})}} />
        )
      }
      {
        mode === 'edit' && (
          <ApplyNewDraftItemEditMode {...{newItem, setNewItem}} />
        )
      }
      {
        mode === 'create' && (
          <Button onClick={() => {  setDraftItemsDTO(prev => prev.concat(newItem)); setNewItem(null); }}>send</Button>
        )
      }
    </div>
  )
}

function ApplyNewDraftItemEditMode({newItem, setNewItem }: { newItem: DraftItemDTO, setNewItem: React.Dispatch<React.SetStateAction<DraftItemDTO | null>> }) {
  const { draft } = useDraftEditor();
  const attachDraftItem = DraftEditorAPI.AttachDraftItem();

  return (
    <button className='px-1.5 rounded border' onClick={() => { attachDraftItem({draft_id: draft!._id, ...newItem}); setNewItem(null); }} disabled={newItem.value.trim() === ''}>send</button>
  )
}

function ChooseItemTypeButton({newItem, setNewItem}: { newItem: DraftItemDTO|null, setNewItem: React.Dispatch<React.SetStateAction<DraftItemDTO | null>> }) {
  return (
    <div className='w-min relative'>
      <DropDownMenu>
        <DropDownMenuTriggerOnClick variant="discret">
          <Checkbox.doted className='w-6 shadow-sm' />
        </DropDownMenuTriggerOnClick>
        <DropDownMenuContent position='top' align='start'>
          <DropDownMenuItem onClick={() => setNewItem({type: 'new', value: ''})}>New</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setNewItem({type: 'existing', value: ''})}>Existing</DropDownMenuItem>
        </DropDownMenuContent>
      </DropDownMenu>
    </div>
  )
}

function SearchDrafts(props: {result:(draft:IDraft) => void}) {
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const { data: searchResults } = DraftEditorAPI.SearchDrafts({search});

  return (
    <>
      <div>
        <button onClick={() => setModal(true)}>Search drafts</button>
      </div>
      <Modal isModalOpen={modal} closeFn={() => setModal(false)}>
        <input value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
        <div className='overflow-auto max-h-[36rem]'>
        <button onClick={() => setSearch(searchInput)}>search</button>
        <div className='max-w-3xl flex flex-wrap'>
          {
            (searchResults || []).map(draft => (
              <div className='p-4 m-2 rounded-sm border text-white border-white w-80' onClick={()=> {props.result(draft); setModal(false)}}>
                {draft.title && <h4>{draft.title}</h4>}
                <p>{draft.content}</p>
              </div>
            ))
          }
        </div>
        </div>
      </Modal>
    </>
  )
}