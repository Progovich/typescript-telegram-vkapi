import fetch from "node-fetch";
import FormData from "form-data"
import qs from "querystring"

function sendPhotoVK(group_id: string, access_token: string, href: string) {
    let params: any = { group_id, access_token }

    // Returns the server address for document upload onto a user's or community's wall.
    fetch(`https://api.vk.com/method/photos.getWallUploadServer?${qs.encode(params)}&v=5.126`, {
        method: 'GET',
    }).then(async (e: any) => {
        const data = await e.json()

        const bufferImage = await fetch(href, { method: 'GET', }).then((e: any) => e.buffer())

        const formData = new FormData();
        formData.append('photo', bufferImage, { filename: "unicycle.png", });

        // Upload a photo
        const resUpload = await fetch(data.response.upload_url, {
            method: 'POST', body: formData, headers: formData.getHeaders()
        }).then(async (e: any) => e.json())

        params = {
            group_id,
            photo: resUpload.photo,
            server: resUpload.server,
            hash: resUpload.hash,
            access_token,
        }

        // Saves a photo to a user's or community's wall after being uploaded.
        const resSavePhoto = await fetch(`https://api.vk.com/method/photos.saveWallPhoto?${qs.encode(params)}&v=5.126`, {
            method: 'GET',
        }).then(async (e: any) => e.json())

        const ownerPart = resSavePhoto.response[0].owner_id;
        const idPart = resSavePhoto.response[0].id;
        const accessPart = resSavePhoto.response[0].access_key;
        const attachments = `photo${ownerPart}_${idPart}_${accessPart}`

        params = {
            owner_id: `-${group_id}`,
            from_group: 1,
            attachments,
            access_token
        }

        // Send a photo to group
        fetch(`https://api.vk.com/method/wall.post?${qs.encode(params)}&v=5.126`, { method: 'get' })
    });
}

export default sendPhotoVK;

