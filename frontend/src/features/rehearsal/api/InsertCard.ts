import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";
import { RehearsalCardDTO } from "../types";

async function insertCard(args: RehearsalCardDTO): Promise<{}> {
  const { requirements, type, category, difficulty } = args;

  const request = await fetch(API_URL+'/rehearsal/card', {
    method: 'post',
    body: JSON.stringify({ requirements, type, category, difficulty }),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const response = request.json();

  return response;
}

export function InsertCard(options?: MutationOptions<{}, RehearsalCardDTO>) {
  return useMutation(
    insertCard, {
      ...options
    }
  )
}

