import axios from "axios";
import fs from "fs";

const dir = "src";
const folder = "uploads";
const dirDowload = `${dir}/${folder}`;

/**
 *
 * @param url  "https://d1i5ti8rq3af58.cloudfront.net/2020/9/11/1599815413903.1763.png";
 * @param type  image || ....
 * @returns  uploads/2021/8/1629790220116.png
 */

export const downloadFile = async (url: string, type?: string) => {
  let nameFile = url.split(".");
  let typeFile = nameFile[nameFile.length - 1];

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  if (!fs.existsSync(dirDowload)) {
    fs.mkdirSync(dirDowload);
  }

  if (!fs.existsSync(`${dirDowload}/${year}`)) {
    fs.mkdirSync(`${dirDowload}/${year}`);
  }

  if (!fs.existsSync(`${dirDowload}/${year}/${month}`)) {
    fs.mkdirSync(`${dirDowload}/${year}/${month}`);
  }

  const pathFile = `${folder}/${year}/${month}/${Date.now()}.${typeFile}`;
  const pathFolder = `${dir}/${pathFile}`;

  if (type === "image") {
    let imgTypes = ["gif", "jpg", "png"];
    if (!imgTypes.includes(typeFile)) return "NOT_IMG";
  }

  const res = await axios({ url, method: "GET", responseType: "stream" });
  return new Promise((resolve, reject) => {
    res.data
      .pipe(fs.createWriteStream(pathFolder))
      .on("finish", () => resolve(pathFile))
      .on("error", (e: any) => reject(e));
  });
};
