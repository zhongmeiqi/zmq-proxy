import WebSocket, { WebSocketServer } from "ws";
import { saveResponse } from "./saveResponse.js";
import { saveRequest } from "./saveRequest.js";

// 前端代理服务器
function frontProxy(config) {
  const wsServer = new WebSocketServer({ port: 8888 });
  wsServer.binaryType = "nodebuffer";

  wsServer.on("connection", async (ws) => {
    const backWS = new WebSocket("ws://10.128.129.99:1522", "web-hippo");
    backWS.binaryType = "nodebuffer";
    backWS.on("open", () => {
      console.log("成功连接后台");
    });

    // 后台接受到消息
    backWS.on("message", async (data, isBinary) => {
      if (isBinary) {
        ws.binaryType = "arraybuffer";
        // 代理服务器发送给前端
        ws.send(data);
        // 保存数据
      } else {
        const result = data.toString();
        ws.send(result);
        // 保存后端数据
        // saveResponse(JSON.parse(result));
      }
    });
    ws.on("error", console.error);

    // 代理收到消息
    ws.on("message", async (data, isBinary) => {
      if (backWS.readyState === 1) {
        if (isBinary) {
          backWS.binaryType = "arraybuffer";
          backWS.send(data);
          // 保存数据
          // saveRequest(data);
        } else {
          const result = data.toString();
          backWS.send(result); // toString 将buffer转成string类型
          // 保存数据
          // saveRequest(result);
        }
      }
    });
  });
}
frontProxy();

