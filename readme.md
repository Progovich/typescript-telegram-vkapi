

<h1 align="center">Telegram Bot with VK API & Telegraph & TypeScript 👋</h1>

# EN

Welcome to my Telegram bot repository. Here I use npm Telegraph and TypeScript to easily create a Telegram Bot on Node JS.

The bot has a connected vk.com API, it can sent video or photo to social group and post on wall.

![](https://github.com/Progovich/typescript-telegram-vkapi/blob/master/other/bot.png)



The bot uses Mongo DB. You need a token to connect to the database. 

You should edit the .env file before you start

`TOKEN_TG` - Your telegrambot token
`TOKEN_MONGO` - Your mongoDB token
`TOKEN_VK` - Your vkAPI token for control social group
`USERS` - Telegram id of users who have access to the bot
`ID_GROUP` - ID your group.

##  Start

To start the bot, open `start.bat`

OR

Open the terminal in the folder with the bot and enter the commands

```sh
npm i
npm run start
```

The bot will open the badoo website and get started.

You must have the Node Js platform installed to work
https://nodejs.org/en/

# RU

Добро пожаловать в мой реопзиторий телеграмм бота. Этот бот написан с использованием библиотек Telegraph и TypeScript. Бот работает с API VK и размещает посты на стене сообщества. Подключена возможность постить видео и картинки.

![](https://github.com/Progovich/typescript-telegram-vkapi/blob/master/other/bot.png)

К боту подключена MongoDB. Вам понадобится токен для использования этого бота.
Перед началом нужно отредактировать .env файл.

`TOKEN_TG` - Your telegrambot token
`TOKEN_MONGO` - Your mongoDB token
`TOKEN_VK` - Your vkAPI token for control social group
`USERS` - Telegram id of users who have access to the bot
`ID_GROUP` - ID your group.

##  Start

Для запуска необходимо открыть `start.bat`

ИЛИ открыть консоль и ввести последовательно команды

```sh
npm i
npm run start
```

Для работы у вас должна быть установлена платформа Node Js
https://nodejs.org/en/
