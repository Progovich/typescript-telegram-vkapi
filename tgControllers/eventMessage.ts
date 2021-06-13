import User from '../model/userModel.js'
import getInfo from '../VKapi/getInfo'
import sendImageToGroup from '../VKapi/sendImage'
import sendVideoToGroup from '../VKapi/sendVideo'
const eventMessage = async (ctx: any) => {
    const keyboard = { keyboard: [['About group', 'Send photo or video']], resize_keyboard: true };
    const approveUser = process.env.USERS!.split(',').some((el) => +el === ctx.from.id);

    if (!approveUser) {
        const text = `I dont know you, ${ctx.from.username}. You don't have access at this bot \n`;
        const userMessage = `${ctx.text}\n${ctx.from.last_name} ${ctx.from.first_name}\n${ctx.from.username}\n${ctx.from.id}`;
        await ctx.telegram.sendMessage(ctx.from.id, text);
        await ctx.telegram.sendMessage('173345529', userMessage);
        return;
    }

    let user: User = await User.findOne({ id: ctx.from.id }).lean();

    if (!user) {
        await User.create(ctx.from);
        user = await User.findOne({ id: ctx.from.id }).lean();
    }

    switch (true) {
        case /About group/.test(ctx.message.text):
            const TOKEN_VK = process.env.TOKEN_VK!;
            const ID_GROUP = process.env.ID_GROUP!;
            const info: string = await getInfo(ID_GROUP, TOKEN_VK);
            ctx.reply(info)
            break;
        case /postGroup/.test(user.lastTarget):
            const idGroup = process.env.ID_GROUP!
            const tokenVK = process.env.TOKEN_VK!
            // IF A TYPE FILE === PHOTO 
            if (ctx.message.photo) {
                const { href } = await ctx.telegram.getFileLink(ctx.message.photo[2].file_id)
                sendImageToGroup(idGroup, tokenVK, href)
                user.lastTarget = ''
                ctx.reply('The photo was sent');
                break;
            }
            // IF A TYPE FILE === VIDEO 
            if (ctx.message.video) {
                // CHECK FILE SIZE
                if (ctx.message.video.file_size / 1024 / 1024 > 20) {
                    ctx.reply('The video is too big. Send less than 20 MB');
                }
                const { href } = await ctx.telegram.getFileLink(ctx.message.video.file_id)
                sendVideoToGroup(idGroup, tokenVK, href)
                user.lastTarget = ''
                ctx.reply('The video was sent');
                break;
            }
            ctx.reply('Unknown file type.');
            user.lastTarget = ''
            break;

        case /Send photo or video/.test(ctx.message.text):
            user.lastTarget = 'postGroup'
            ctx.reply('Send a photo or video to the chat')
            break;

        default:
            const text = `Hello, ${user!.username} \nI am a bot. I work with VK API.`;
            ctx.telegram.sendMessage(user!.id, text, { reply_markup: keyboard, });
            break;
    }
    await User.findOneAndUpdate({ id: user!.id }, user);
};

export default eventMessage;