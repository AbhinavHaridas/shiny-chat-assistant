const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}), bodyParser.json());

// Main route that requests the Gemini API and sends response to the frontend
app.post('/', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({model: 'gemini-pro'});

        const result = await model.generateContent(req.body['prompt']);
        const response = await result.response;
        const text = response.text();

        res.send({
            status: 200,
            success: true,
            result: text
        });
    } catch (e) {
        res.send({
            status: 404,
            success: false,
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Backend url is http://localhost:${process.env.PORT}/`)
});