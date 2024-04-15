import { queryClient } from "@/App";
import { useMutation, MutationOptions } from "@/lib/query";
import { InsertDraftDTO } from "shared-types";
import APIRequest from "@/lib/ApiRequest";


async function insertDraft(args: InsertDraftDTO) {
  const { title, content, priority, subject, to_deal, draft_items } = args;

  const requestBody = {
    title,
    content,
    priority: priority ?? 0,
    subject,
    draft_items,
    to_deal
  }

  const response = await APIRequest<null, InsertDraftDTO>(
    `/drafts/insert`, {
      method: 'post',
      body: requestBody
    }
  );

  return response.data;
}

export function InsertDraft(options?: MutationOptions<null, InsertDraftDTO>) {
  return useMutation(insertDraft, {
    ...options,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('inbox');
      if (variables.to_deal)
        queryClient.invalidateQueries('inbox-toDeals');
    }
  });
}

