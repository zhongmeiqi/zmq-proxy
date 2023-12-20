import WebSocket, { WebSocketServer } from "ws";
import { saveResponse } from "./saveResponse.js";
import { saveRequest } from "./saveRequest.js";
import fs, { readFileSync } from "fs";
import { decryptObj } from "./saveRequest.js";
import CryptoJS from "crypto-js";
import _ from "lodash";
import { getDecodedData } from "./utils/getDecodedData.js";

// 前端代理服务器
async function frontProxy(config) {
  if (config === "record") {
    const wsServer = new WebSocketServer({ port: 8888 });
    wsServer.binaryType = "nodebuffer";

    wsServer.on("connection", async (ws) => {
      const backWS = new WebSocket("ws://10.128.129.99:1522", "web-hippo");
      backWS.binaryType = "nodebuffer";
      backWS.on("open", () => {
        console.log("成功连接后台");
      });

      backWS.on("message", async (data, isBinary) => {
        if (isBinary) {
          ws.binaryType = "arraybuffer";
          // 代理服务器发送给前端
          ws.send(data);
          getDecodedData(data);
          // TODO 保存后端返回的 proto数据
          // saveResponse(JSON.parse(result));
        } else {
          const result = data.toString();
          ws.send(result);
          saveResponse(JSON.parse(result));
        }
      });
      ws.on("error", console.error);

      ws.on("message", async (data, isBinary) => {
        if (backWS.readyState === 1) {
          if (isBinary) {
            backWS.binaryType = "arraybuffer";
            backWS.send(data);
            // TODO  保存proto数据
            // saveRequest(data);
            const data1 = readFileSync("./web-key.json");
            const _KEY = JSON.parse(data1).tyt_key;
            const _IV = JSON.parse(data1).tyt_iv;

            const reqData = JSON.parse(
              decryptObj.decrypt(data, _KEY, _IV, CryptoJS.enc.Base64)
            );
            const { funcid, jparams, jgparams } = reqData.data;
            const { g_reqmsgid: reqmsgid } = jgparams
              ? jgparams
              : { g_reqmsgid: "" };
            if (funcid == 100047) {
              console.log(funcid);
            }
          } else {
            const result = data.toString();
            backWS.send(result); // toString 将buffer转成string类型
            saveRequest(result);
          }
        }
      });
    });
  } else {
    const wsServer = new WebSocketServer({ port: 8888 });
    wsServer.on("connection", async (ws) => {
      try {
        const system = await readFileSync("./system.json", "utf8");
        const key = await readFileSync("./web-key.json", "utf8");
        ws.send(system);
        ws.send(key);
      } catch (err) {
        console.log(err);
      }

      // 代理收到消息
      ws.on("message", async (originalReqData, isBinary) => {
        if (!isBinary) {
          /**解密 */
          const data = readFileSync("./web-key.json");
          const _KEY = JSON.parse(data).tyt_key;
          const _IV = JSON.parse(data).tyt_iv;

          const reqData = JSON.parse(
            decryptObj.decrypt(
              originalReqData.toString(),
              _KEY,
              _IV,
              CryptoJS.enc.Base64
            )
          );
          const { funcid, jparams, jgparams } = reqData.data;
          if (funcid == 100047) {
            console.log(funcid);
          }
          if (funcid) {
            fs.readdir(`./dataBase/${funcid}`, (err, files) => {
              if (err) {
                console.log("fs.readdir:", err);
              }
              files.some((file) => {
                const data = readFileSync(`./dataBase/${funcid}/${file}`);
                const parseData = JSON.parse(data);
                const params = parseData[0].request.data.jparams;
                if (_.isEqual(jparams, params)) {
                  const response = JSON.parse(data)[1].response;
                  response.data = JSON.stringify(response.data);
                  ws.send(JSON.stringify(response));
                  return true;
                }
              });
            });
          }
        }
      });
    });
  }
}
frontProxy("record");
// frontProxy("proxy");

