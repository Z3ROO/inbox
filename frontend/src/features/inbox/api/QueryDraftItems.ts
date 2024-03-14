import APIRequest from "@/lib/ApiRequest";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";

async function getDraftItems(draft_id: string) {
  const response = await APIRequest<IDraft[]>(`/drafts/items/${draft_id}`);
  return response.data;
  // const mock: IDraft[] = [
  //   {
  //     _id: '123123123',
  //     content: 'rwerwerwer',
  //     delay: "none",
  //     delay_quantity: 2,
  //     delayed_at: new Date(),
  //     priority: 1,
  //     subject: {
  //       _id: '123123',
  //       color: '',
  //       icon: '',
  //       name: 'TesteSubject'
  //     },
  //     title: '',
  //     to_deal: false,
  //     created_at: new Date(),
  //     allowed_after: new Date()
  //   }
  // ]
  // return mock;
}

export function QueryDraftItems(config: {
  draft_id: string
  options?: QueryOptions<IDraft[], 'draft-items'>
}) {
  return useQuery('draft-items',() => getDraftItems(config.draft_id), {...config?.options})
}