import { API_URL } from "@/config/API";
import { APIResponse } from "shared-types";

interface ReqHeaders<BodyDTO> extends Omit<RequestInit, 'body'> {
  body?: BodyDTO
}

/*
  IMPLMENT FUNCTION OVERLOAD FOR BETTER ReqBody PARAMETER TYPECHECKING
*/

export default async function APIRequest<ResData = null, ReqBody = null>(
  path: string,
  reqHeaders?: ReqHeaders<ReqBody>
): Promise<APIResponse<ResData>> {
  
  path = path.trim();
  
  if (path.substring(0,1) !== '/')
    path = '/'+path;
  
  const request = await fetch(`${API_URL}${path}`, { 
    ...reqHeaders, 
    body: reqHeaders?.body ? JSON.stringify(reqHeaders.body) : undefined,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...reqHeaders?.headers
    }
  });

  const response = await request.json();

  return response;
}