import fetch from "node-fetch";
import FormData from "form-data"
import qs from "querystring"

function sendVideoVK(group_id: string, access_token: string, href: string) {
    let params: any
    params = {
        access_token,
        group_id,
        name: String(Date.now()),
        repeat: 1,
    }
    fetch(`https://api.vk.com/method/video.save?${qs.encode(params)}&v=5.126`, {
        method: 'GET'
    }).then(async (res) => {
        const resSave = await res.json()
        const bufferVideo = await fetch(href, { method: 'GET', }).then((e: any) => e.buffer())

        const formData = new FormData();
        formData.append("video", bufferVideo, { filename: "unicycle.mp4", });

        const resUpload = await fetch(resSave.response.upload_url, {
            method: "post",
            body: formData,
        }).then((res) => res.json());

        const ownerPart = resUpload.owner_id;
        const idPart = resUpload.video_id;

        params = {
            owner_id: `-${group_id}`,
            from_group: 1,
            attachments: `video${ownerPart}_${idPart}`,
            access_token,
        }

        fetch(`https://api.vk.com/method/wall.post?${qs.encode(params)}&v=5.126`, {
            method: 'GET'
        });
    });
}

export default sendVideoVK;
