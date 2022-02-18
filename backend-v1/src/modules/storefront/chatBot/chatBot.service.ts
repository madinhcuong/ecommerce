import axios from "axios";
import { env } from "../../../config";

const urlScraping =
  "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_map";
//const urlScraping = 'https://vnexpress.net/microservice/sheet/type/covid19_2021_by_location';

class BotService {
  static async getCovid19Infor() {
    const { data } = await axios.get(urlScraping);
    const result = csvToJSON(data);
    return result;
  }

  static async sendMessage(senderId: any, message: any) {
    await axios.post(
      "https://graph.facebook.com/v12.0/me/messages",
      {
        messaging_type: "RESPONSE",
        recipient: { id: senderId },
        message: { text: message },
      },
      { params: { access_token: env.accessTokenFb } }
    );
  }
}

function csvToJSON(csv: any) {
  let lines = csv.split("\n");
  let result = [];
  let headers;

  lines[0] = lines[0].replace(/["']/g, "");
  headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    let obj: any = {};
    lines[i] = lines[i].replace(/["']/g, "");

    if (lines[i] == undefined || lines[i].trim() == "") {
      continue;
    }

    let words = lines[i].split(",");
    for (let j = 0; j < words.length; j++) {
      obj[headers[j]] = words[j];
    }

    result.push(obj);
  }

  return result;
}

export default BotService;
