import { ServerError } from "@/util/error/ServerError";
import { Response, Request, NextFunction } from "express";
import { APIResponse } from "shared-types";

type DefaultErrorHandlerRequest = Request<{}, APIResponse, {}, {}>

export function defaultErrorHandler(err: ServerError, req: DefaultErrorHandlerRequest, res: Response<APIResponse>, next: NextFunction) {
  const { errorType, message, status } = err;

  if (!errorType || !status) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      statusCode: 500,
      data: null,
      message: 'A not expected error ocurred'
    });
    return
  }

  if (typeof status === 'number')
    res.status(status);

  res.json({
    success: false,
    statusCode: status,
    data: null,
    message,
  });
}
