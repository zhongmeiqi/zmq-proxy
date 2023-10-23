// import webKey from "./web-key.json" assert { type: "json" };
import CryptoJS from "crypto-js";
import fs, { readFileSync } from "fs";

const KEY = "4deVMFIBoAdPT6f9";
const IV = "ud7sG2wweODSlD19";

const obj = {
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

export function saveRequest(result) {
  const data = readFileSync("./web-key.json");
  const _KEY = JSON.parse(data).tyt_key;
  const _IV = JSON.parse(data).tyt_iv;

  const reqData = obj.decrypt(result, _KEY, _IV, CryptoJS.enc.Base64);
  const { funcid } = JSON.parse(reqData).data;
  if (funcid) {
    fs.writeFileSync(`./requestSet/${funcid}.json`, reqData, (error) => {
      if (error) {
        console.log(`requset创建失败：${error}`);
      }
      // 创建成功
      console.log(`request创建成功`);
    });
  }

  // console.log(obj.decrypt(result, _KEY, _IV, CryptoJS.enc.Base64));
}
// saveRequest();

