import type { booruConfig } from "./booruConfig";
import { constants } from "./constants";

export class GelbooruCaller{
    template : string = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&api_key=XX_API_KEY_XX&user_id=XX_USER_ID_XX&tags=XX_TAG_TEMPLATE_XX&limit=10&json=1"
    apiKey : string = "";
    userId: string = "";
    constructor(config: booruConfig){
        this.apiKey = config.API_KEY;
        this.userId = config.USER_ID;
    }

    public async call(tags : string){
        tags = tags.replaceAll(',','+');
        var request = this.template.replace(constants.tagMarker, tags);
        request = request.replace(constants.ApiKeyMarker, this.apiKey);
        request = request.replace(constants.UserIdMarker, this.userId);
        console.log(request);
        var response = await fetch(request);
        if(response.ok){
            console.log("Successfully fetched response from Gelbooru.");
        }
        else{
            console.log("Error encountered reaching out to Gelbooru.");
        }
        return response;
    }

    public async fetchImage(response : string){
        var content = JSON.parse(response);
        let url : string = content.post[0].file_url;
        console.log(`saving ${url}`)
        var image = await fetch(url);
        await Bun.write(`./${content.post[0].id}.${url.substring(url.length-3) }`, image);
    }
}


// let z = new GelbooruCaller();
// var content = await z.call(["ahegao"]);
// var zv = await content.text();
// z.fetchImage(zv);