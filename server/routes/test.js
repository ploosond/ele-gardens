import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200).send("pong!!! response for ping at /api/ping");
  } catch (error) {
    next(error);
  }
});

export default router;
