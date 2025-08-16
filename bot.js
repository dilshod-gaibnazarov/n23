import OpenAI from "openai";
import { Markup, Telegraf } from "telegraf";
import { config } from "dotenv";
import { message } from "telegraf/filters";
config();

const apiKey = String(process.env.AI_API_KEY);
const botToken = String(process.env.BOT_TOKEN);

const bot = new Telegraf(botToken);

const client = new OpenAI({ apiKey });
const model = 'gpt-5-nano';

bot.start(async (ctx) => {
    ctx.reply(`Assalamu alaykum AI botga xush kelibsiz 😊`,
        Markup.keyboard([
            ['AI chat', 'Rasm AI sharhi']
        ]).resize().oneTime()
    );
});

bot.hears('AI chat', async (ctx) => {
    ctx.reply('Bot bilan suhbatni boshlash uchun matn yozing ☺️');
});

bot.hears('Rasm AI sharhi', async (ctx) => {
    ctx.reply(`Rasm jo'nating va biz uni sharhlab beramiz 😎`);
});

bot.on(message(), async (ctx) => {
    const message = ctx.message;
    await ctx.sendChatAction('typing');
    if (message?.text) {
        const response = await client.responses.create({
            model,
            input: [
                { role: 'developer', content: '' },
                { role: 'user', content: ctx.message?.text }
            ]
        });
        return ctx.reply(response?.output_text);
    }

    else if (message?.photo) {
        const file = await ctx.telegram.getFile(message.photo?.at(-1).file_id);
        const imageUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: "system", content: `Sen faqat o'zbek tilida sharh berasan.` },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Shu rasmni sharhlab ber." },
                        { type: "image_url", image_url: { url: imageUrl } }
                    ]
                }
            ]
        });
        return ctx.reply(response.choices[0].message.content);
    }
});

bot.launch(() => console.log('bot started'));