import { ServerError } from "@/util/error/ServerError";
import { Response, Request, NextFunction } from "express";
import { APIResponse } from "shared-types";

type DefaultErrorHandlerRequest = Request<{}, APIResponse, {}, {}>

export function defaultErrorHandler(err: ServerError, req: DefaultErrorHandlerRequest, res: Response<APIResponse>, next: NextFunction) {
  const { errorType, message, status } = err;
  console.error(err)
  if (!errorType || !status) {
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      data: null,
      message: 'A not expected error ocurred'
    });
    return
  }
  
  res.status(status).json({
    success: false,
    statusCode: status,
    data: null,
    message,
  });
  return;
}
