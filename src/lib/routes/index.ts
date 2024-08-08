import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.send("Server is healthy");
});

export { router };
