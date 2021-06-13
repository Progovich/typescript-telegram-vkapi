import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { connect } from "mongoose";
import eventMessage from "./tgControllers/eventMessage";

dotenv.config()

const tokenMongoDB: string = process.env.TOKEN_MONGO!

connect(tokenMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful'));

const token: string = process.env.TOKEN_TG!
const bot = new Telegraf(token)
bot.on('message', ctx => eventMessage(ctx))
bot.telegram.getMe().then(res => {
    const botInfo: string = `Bot INFO\nID: ${res.id}\nName: ${res.first_name}\nUsername: ${res.username}`
    console.log(botInfo);
})
bot.launch()



