const palyvo = require("./palyvo.js");
const dobryva = require("./dobryva.js");
const zerno = require("./zerno.js");

const TelegramApi = require('node-telegram-bot-api')

const token = '6198421354:AAGbCDVx9Ib2WYebnuJby1q4_7PbTXG9Tdo'

const bot = new TelegramApi(token, {polling: true})

const mainMenuMarkup = {
    keyboard: [
        ['Дізнатись ціну купівлі зерна'],
        ['Дізнатись ціну палива'],
        ['Дізнатись ціну добрив'],
        ['Контакти']
    ],
    resize_keyboard: true,
    one_time_keyboard: true
};

const backMarkup = {
    keyboard: [
        ['Повернутись назад']
    ],
    resize_keyboard: true,
    one_time_keyboard: true
};

const fertilizers = dobryva;
const grains = zerno;

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Вітаємо!', {reply_markup: mainMenuMarkup});
    } else if (text === 'Дізнатись ціну палива') {
        await bot.sendMessage(chatId, `Ціна дизеля: ${palyvo.diesel}`, {reply_markup: backMarkup});
        await bot.sendMessage(chatId, `Ціна бензина: ${palyvo.petrol}`, {reply_markup: backMarkup});
    } else if (text === 'Дізнатись ціну добрив') {
        const fertilizerMarkup = {
            keyboard: fertilizers.map((fertilizer) => [fertilizer.name]).concat([['Повернутися назад']]),
            resize_keyboard: true,
            one_time_keyboard: true
        };
        await bot.sendMessage(chatId, 'Оберіть добриво:', {reply_markup: fertilizerMarkup});
    } else if (text === 'Дізнатись ціну купівлі зерна') {
        const grainMarkup = {
            keyboard: grains.map((grain) => [grain.name]).concat([['Повернутися назад']]),
            resize_keyboard: true,
            one_time_keyboard: true
        };
        await bot.sendMessage(chatId, 'Оберіть зерно:', {reply_markup: grainMarkup});
    } else if (text === 'Контакти') {
        await bot.sendMessage(chatId, 'Контакт: м.Вінниця, вул. Залізнична 13, Микола', {reply_markup: backMarkup});
        await bot.sendMessage(chatId, '067-144-09-02', {reply_markup: backMarkup});
    } else if (fertilizers.some((fertilizer) => fertilizer.name === text)) {
        const selectedFertilizer = fertilizers.find((fertilizer) => fertilizer.name === text);
        await bot.sendMessage(chatId, `Ціна добрива ${selectedFertilizer.name}: ${selectedFertilizer.price}`, {reply_markup: backMarkup});
    } else if (grains.some((grain) => grain.name === text)) {
        const selectedGrain = grains.find((grain) => grain.name === text);
        await bot.sendMessage(chatId, `Ціна зерна ${selectedGrain.name}: ${selectedGrain.price}`, {reply_markup: backMarkup});
    } else if (text === 'Повернутись назад') {
        await bot.sendMessage(chatId, 'Ви повернулись в головне меню', {reply_markup: mainMenuMarkup});
    } else {
        await bot.sendMessage(chatId, 'Не вдалося зрозуміти вашу команду', {reply_markup: mainMenuMarkup});
    }
});