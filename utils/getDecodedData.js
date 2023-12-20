import { CResponse } from "./CResponse.js";
import { CProto_notice_mixed_push } from "./CProto_notice_mixed_push.js";
import * as APIConifg from "./config.js";
import * as Protocol from "./protocol.js";

export function getDecodedData(buf) {
  const topic = Protocol.decodeTopic(buf);
  const gifts = Protocol.decodeGifts(topic.getData());
  const funcID = gifts.getMsg_type();
  const bufData = gifts.getBuffer();
  const data = decodeReq(funcID, bufData);

  if (!data.funcid) data.funcid = gifts.getMsg_type();
  if (!data.reqmsgid) data.reqmsgid = gifts.getMsg_no();

  console.log(result, "getDecodedData");
  return { topic: topic.getTopic(), data };
}

const LBM_PROTO_DECODE_MAPPING = {
  [APIConifg.PB_LBM.NOTICE_PUSH]: CProto_notice_mixed_push, // 通知推送
};
/**
 * * ProtoParser.decodeReq 的具体实现改至此处
 */
export function decodeReq(funcID, bufData) {
  let data = {};

  try {
    const decodeObj = LBM_PROTO_DECODE_MAPPING[funcID] || CResponse;

    if (decodeObj && decodeObj.decode) data = decodeObj.decode(bufData);
  } catch (err) {
    console.error(err);
  }
  return data;
}

