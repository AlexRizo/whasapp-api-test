import { Router } from "express";
import { checkWebhook, receiveMessage } from "../controllers/whatsappController.js";

const router = new Router();

router.get('/webhook', checkWebhook);

router.post('/webhook', receiveMessage);

export default router;