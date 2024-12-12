import { Router } from "express";
import { checkWebhook, receiveMessage, sendMessage } from "../controllers/whatsappController.js";

const router = new Router();

router.get('/webhook', checkWebhook);

router.post('/webhook', receiveMessage);

router.post('/webhook/send', sendMessage);

export default router;