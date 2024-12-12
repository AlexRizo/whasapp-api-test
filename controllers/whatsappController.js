export const checkWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log(req.query);

    if (mode && token === process.env.WHATSAPP_TOKEN) {
        res.status(200).send(challenge)
    } else {
        res.status(403).json({
            message: 'Forbidden',
            status: 403
        });
    };
};

export const receiveMessage = (req, res) => {
    const data = req.body;

    if (data.object === 'whatsapp_business_account') {
      data.entry.forEach((entry) => {
        const changes = entry.changes;
  
        changes.forEach((change) => {
          const message = change.value.messages?.[0]; // Mensaje entrante
          if (message) {
            const from = message.from; // Número del remitente
            const body = message.text?.body; // Contenido del mensaje
  
            console.log(`Mensaje recibido de ${from}: ${body}`);
          }
        });
      });
  
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
};