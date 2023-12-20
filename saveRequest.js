// import webKey from "./web-key.json" assert { type: "json" };
import CryptoJS from "crypto-js";
import fs, { readFileSync } from "fs";
import { requsetMatch, isFileExisted } from "./match.js";

const KEY = "4deVMFIBoAdPT6f9";
const IV = "ud7sG2wweODSlD19";

export const decryptObj = {
  decrypt: (crypted, key = KEY, iv = IV, encoder = CryptoJS.enc.Hex) => {
    const utf8Key = CryptoJS.enc.Utf8.parse(key);
    const utf8Iv = CryptoJS.enc.Utf8.parse(iv);
    const dataBase64 = CryptoJS.enc.Base64.stringify(encoder.parse(crypted));
    const decrypted = CryptoJS.AES.decrypt(dataBase64, utf8Key, {
      iv: utf8Iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  },
};

export async function saveRequest(result) {
  const data = readFileSync("./web-key.json");
  const _KEY = JSON.parse(data).tyt_key;
  const _IV = JSON.parse(data).tyt_iv;

  const reqData = JSON.parse(
    decryptObj.decrypt(result, _KEY, _IV, CryptoJS.enc.Base64)
  );
  const { funcid, jparams, jgparams } = reqData.data;
  const { g_reqmsgid: reqmsgid } = jgparams ? jgparams : { g_reqmsgid: "" };
  if (funcid == 100047) {
    console.log(funcid);
  }
  if (funcid && reqmsgid) {
    requsetMatch(reqmsgid, JSON.stringify(reqData), funcid, jparams);
    // const pathWay = "./dataBase";
    // try {
    //   const isExisted = await isFileExisted("./dataBase");
    //   if (!isExisted) {
    //     fs.mkdirSync(pathWay);
    //   }
    //   match("request", reqmsgid, JSON.stringify(reqData), funcid);
    // } catch (error) {
    //   console.log(error, "222222");
    // }
  }

  // console.log(obj.decrypt(result, _KEY, _IV, CryptoJS.enc.Base64));
}
// saveRequest();

