import { Response, Request, NextFunction } from "express";

export function ErrorHandler(cb: (rq: Request, rs: Response, next?: NextFunction ) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    }
    catch(err) {
      const { errorType, message, status } = err;

      if (typeof status === 'number')
        res.status(status);

      if (!errorType) {
        console.error(err);
        res.status(500).json({ errorType: 'server', message: 'A not expected error ocurred'})
        return
      }

      res.json({
        errorType,
        message,
        status
      });
    }
  }
}