export const checkWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.WHATSAPP_TOKEN) {
        res.status(200).json({
            challenge,
            status: 200
        })
    } else {
        res.status(403).json({
            message: 'Forbidden',
            status: 403
        });
    };
};

export const receiveMessage = (req, res) => {
    const { body } = req;

    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(entry => {
            const changes = entry.changes;

            changes.forEach(change => {
                const message = change.value.messages?.[0];

                if (message) {
                    const from = message.from;
                    const body = message.text?.body;
                    console.log(`Mensaje recibido de ${from}: ${body}`);
                }
            });
        });

        res.status(200).json({
            message: 'Message received',
            status: 200
        });
    } else {
        res.status(400).json({
            message: 'Bad Request',
            status: 400
        });
    };
};