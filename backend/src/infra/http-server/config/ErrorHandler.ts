import { Response, Request, NextFunction } from "express";


export function ErrorHandler(cb: (rq: Request, rs: Response, next?: NextFunction ) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    }
    catch(err) {
      res.json({errorr: 'Erro é o carai deu é muito bom!', ...err});
    }
  }
}