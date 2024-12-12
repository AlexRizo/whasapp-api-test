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
            entry.changes.forEach((change) => {
                const contact = change.value.contacts[0];
                const message = change.value.messages[0];
    
                const userName = contact.profile?.name || 'Usuario desconocido';
                const userPhone = contact.wa_id;
    
                console.log(`Mensaje de ${userName} (${userPhone}): ${message.text.body}`);
            });
        });
        res.sendStatus(200); // Respuesta OK a WhatsApp
    } else {
        res.sendStatus(404);
    }
};