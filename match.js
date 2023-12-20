import fs from "fs";
import _ from "lodash";

export function isFileExisted(pathWay) {
  return new Promise((resolve, reject) => {
    fs.access(pathWay, (err) => {
      if (err) {
        reject(false); //文件不存在
      } else {
        resolve(true); //文件存在
      }
    });
  });
}

const requestArr = [];

export async function requsetMatch(
  reqmsgid,
  data,
  funcid,
  params,
  updata = true
) {
  if (requestArr.every((item) => item.funcid !== funcid)) {
    if (!fs.existsSync(`./dataBase/${funcid}`)) {
      fs.mkdirSync(`./dataBase/${funcid}`, { recursive: true });
    }
  }
  if (requestArr.every((item) => !_.isEqual(item.params, params))) {
    requestArr.push({
      funcid: funcid,
      params: params,
      reqmsgid: reqmsgid,
      request: data,
    });
  }
}

export function responseMatch(reqmsgid, data, funcid) {
  let index = requestArr.findIndex((item) => item.reqmsgid === reqmsgid);
  if (index > -1) {
    const { funcid, params, request } = requestArr[index];

    fs.writeFileSync(
      `./dataBase/${funcid}/${index}.json`,
      `[{"request":${request}},{"response":${data}}]`,
      (error) => {
        if (error) {
          console.log(`创建失败：${error}`);
        }
        // 创建成功
        console.log(`创建成功`);
      }
    );
    // fs.readdir(`./dataBase/${funcid}`, (err, files) => {
    //   if (err) {
    //     console.log("fs.readdir:", err);
    //   }
    //   const isExisted = files.some((file) => {
    //     const data = readFileSync(`./dataBase/${funcid}/${file}`);
    //     const parseData = JSON.parse(data);
    //     const fParams = parseData[0].request.data.jparams;
    //     if (_.isEqual(params, fParams)) {
    //       return true;
    //     }
    //   });

    //   if (!isExisted) {
    //     // fs.writeFileSync(
    //     //   `./dataBase/${funcid}/${files.length}.json`,
    //     //   `[{"request":${request}},{"response":${data}}]`,
    //     //   (error) => {
    //     //     if (error) {
    //     //       console.log(`创建失败：${error}`);
    //     //     }
    //     //     // 创建成功
    //     //     console.log(`创建成功`);
    //     //   }
    //     // );
    //   }
    // });
  }
}

//     console.log(`./dataBase/${funcid}/${jparams}.json`);

//     if (!fs.existsSync(`./dataBase/${funcid}/${jparams}.json`)) {
//       fs.writeFileSync(
//         `./dataBase/${funcid}/${jparams}.json`,
//         `[{"${type}":${data}}`,
//         (error) => {
//           if (error) {
//             console.log(`创建失败：${error}`);
//           }
//           // 创建成功
//           console.log(`创建成功`);
//         }
//       );
//     }
//   }

//   if (!tempArr.includes(jgparams)) {
//     tempArr.push(jgparams);
//     fs.mkdirSync(`./dataBase/${funcid}`, { recursive: true });
//     if (!fs.existsSync(`./dataBase/${funcid}/${reqmsgid}.json`)) {
//       fs.writeFileSync(
//         `./dataBase/${funcid}/${reqmsgid}.json`,
//         `[{"${type}":${data}}`,
//         (error) => {
//           if (error) {
//             console.log(`创建失败：${error}`);
//           }
//           // 创建成功
//           console.log(`创建成功`);
//         }
//       );
//     }
//   }
//   fs.appendFileSync(
//     `./dataBase/${funcid}/${reqmsgid}.json`,
//     `,{"${type}":${data}}]`,
//     (error) => {
//       if (error) {
//         console.log(`写入失败：${error}`);
//       }
//       // 创建成功
//       console.log(`写入成功`);
//     }
//   );
// }

// if (!fs.existsSync(`./dataBase/${funcid}/${reqmsgid}.json`)) {
//   fs.writeFileSync(
//     `./dataBase/${funcid}/${reqmsgid}.json`,
//     `[{"${type}":${data}}`,
//     (error) => {
//       if (error) {
//         console.log(`创建失败：${error}`);
//       }
//       // 创建成功
//       console.log(`创建成功`);
//     }
//   );
// } else {}

