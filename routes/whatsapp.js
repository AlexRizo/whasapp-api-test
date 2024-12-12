import { Router } from "express";

const router = new Router();

router.get('/webhook', checkWebhook);

export default router;