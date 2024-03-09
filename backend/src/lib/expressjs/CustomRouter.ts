import { Router } from "express";

export default class CustomRouter{
  router: Router = Router();

  get: typeof this.router.get = (path, ...handlers) => {
    return this.router.get(path, ...handlers.map(this.defaultWrapper))
  }
  post: typeof this.router.post = (path, ...handlers) => {
    handlers = handlers.map(this.defaultWrapper);
    return this.router.post(path, ...handlers)
  }
  put: typeof this.router.put = (path, ...handlers) => {
    handlers = handlers.map(this.defaultWrapper);
    return this.router.put(path, ...handlers)
  }
  delete: typeof this.router.delete = (path, ...handlers) => {
    handlers = handlers.map(this.defaultWrapper);
    return this.router.delete(path, ...handlers)
  }

  defaultWrapper(h) {
    return async (req, res, next) => {
      try {
        await h(req, res, next);
      } catch(err) {
        next(err, req, res, next);
        return
      }
    }
  }
}