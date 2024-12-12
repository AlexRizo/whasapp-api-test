import axios from "axios";

export const checkWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

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

export const sendMessage = async(req, res) => {
    const { message, phone } = req.body;

    const url = process.env.WHATSAPP_API_URL;
    const token = process.env.PERMAMENT_ACCESS_TOKEN;
    
    const data = {
        messaging_product: 'whatsapp',
        to: phone, // Número del destinatario
        type: 'text',
        text: {
          body: message
        }
    }

    try {
        const response = await axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Mensaje enviado con éxito',
            data: response.data
          });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Error al enviar el mensaje',
            error: error.response?.data || error.message
        });
    }
};