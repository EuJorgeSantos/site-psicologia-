document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Mensagem enviada com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Para enviar emails
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de email
    auth: {
        user: 'seuemail@gmail.com', // seu email
        pass: 'suasenha' // sua senha ou app password
    }
});

// Rota para o formulário de contato
app.post('/contato', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'destinatario@gmail.com', // email que receberá a mensagem
        subject: `Mensagem de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar o email: ' + error.toString());
        }
        res.status(200).send('Email enviado com sucesso: ' + info.response);
    });
});

// Rota para o formulário de agendamento
app.post('/agendamento', (req, res) => {
    const { nome, email, data, hora } = req.body;

    const mailOptions = {
        from: email,
        to: 'destinatario@gmail.com', // email que receberá a mensagem
        subject: `Agendamento de Consulta - ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\nData: ${data}\nHora: ${hora}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar o email: ' + error.toString());
        }
        res.status(200).send('Agendamento enviado com sucesso: ' + info.response);
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});