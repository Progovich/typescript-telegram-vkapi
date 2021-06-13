import fetch from "node-fetch";
import qs from "querystring"

async function getInfo(id: string, token: string) {
    const params = { access_token: token, group_id: id, v: "5.126" }
    const { response } = await fetch(`https://api.vk.com/method/groups.getById?${qs.encode(params)}`, {
        method: 'GET',
    }).then((e: any) => e.json());
    return `ID: ${response[0].id}\nName: ${response[0].name}\nShortName: ${response[0].screen_name}`
}

export default getInfo;