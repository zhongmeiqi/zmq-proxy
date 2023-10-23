import fs from "fs";

export function saveResponse(result) {
  if (result.topic === "web-key") {
    fs.writeFileSync("./web-key.json", JSON.stringify(result), (error) => {
      if (error) {
        console.log(`web-key.json创建失败：${error}`);
      }
      // 创建成功
      console.log(result);
      console.log(`web-key.json创建成功`);
    });
  } else if (result.topic === "sys") {
  } else if (result.topic === "gfpb.json") {
    const resData = result;
    resData.data = JSON.parse(result.data);
    const { funcid } = resData.data.data;
    if (funcid) {
      fs.writeFileSync(
        `./responseSet/${funcid}.json`,
        JSON.stringify(resData),
        (error) => {
          if (error) {
            console.log(`response创建失败：${error}`);
          }
          // 创建成功
          console.log(`response创建成功`);
        }
      );
    }
  }
  // if (result.topic === "gfpb.json") {
  //   const arr = result.data;
  //   console.log(arr.data);
  //   const { funcid } = arr;
  //   console.log(funcid, result);
  // }
}

// fs.writeFile("./hello.doc", "hello", (error) => {
//   if (error) {
//     console.log(`创建失败：${error}`);
//   }
//   // 创建成功
//   console.log(`创建成功`);
// });

