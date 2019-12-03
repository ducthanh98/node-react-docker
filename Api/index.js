const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userSchema = require('./database');

mongoose.connect(`mongodb://mongo:27017/docker-demo`, { useNewUrlParser: true }, ((err) => {
    if (err) return console.log(err);
    console.log('Connect DB')

}));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('App is running')
})

app.get('/getAll', async (req, res) => {
    try {
        const user = await userSchema.find();
        res.json({ code: 0, msg: 'success', data: user })
    } catch (error) {
        res.json({ code: 0, msg: error.message, data: [] })

    }
})

app.post('/create', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userSchema.create({ username, password });
        res.json({ code: 0, msg: 'success', data: user })
    } catch (error) {
        res.json({ code: 0, msg: error.message, data: {} })

    }
})

app.listen(3000, () => {
    console.log('App is running !!!')
})