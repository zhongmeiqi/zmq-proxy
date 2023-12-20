import fs from "fs";
import { responseMatch, isFileExisted } from "./match.js";

export async function saveResponse(result) {
  if (result.topic === "web-key") {
    fs.writeFileSync("./web-key.json", JSON.stringify(result), (error) => {
      if (error) {
        console.log(`web-key.json创建失败：${error}`);
      }
      // 创建成功
    });
  } else if (result.topic === "sys") {
    fs.writeFileSync("./system.json", JSON.stringify(result), (error) => {
      if (error) {
        console.log(`system.json创建失败：${error}`);
      }
    });
  } else if (result.topic === "gfpb.json") {
    const resData = result;
    resData.data =
      typeof result.data === "string" ? JSON.parse(result.data) : result.data;
    const { funcid, reqmsgid } = resData.data.data;
    if (funcid) {
      responseMatch(reqmsgid, JSON.stringify(resData), funcid);
    }
  }
}

