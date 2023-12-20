import ByteBuffer from "bytebuffer";

export class Topic {
  topic;

  data;

  constructor() {
    this.topic = "";
    this.data = null;
  }

  setTopic(topic) {
    if (typeof topic !== "string") {
      throw new TypeError("topic must be string");
    }
    if (byteLength(topic) > TOPIC_MAX_BYTE_LEN) {
      throw new Error("topic byte len too long");
    }
    this.topic = topic;
    return this;
  }
  getTopic() {
    return this.topic;
  }
  getTopicByteLen() {
    return this.topic ? byteLength(this.topic) : 0;
  }

  setData(data) {
    if (!(data instanceof ArrayBuffer) && !(data instanceof Uint8Array)) {
      throw new TypeError("data must be ArrayBuffer or Uint8Array");
    }
    // console.log('data:',data);
    // console.log('data byteLen:', data.byteLength);
    this.data = ByteBuffer.wrap(data);
    // console.log('setData data.capacity():', this.data.capacity());
    return this;
  }
  getData() {
    return this.data;
  }
  toBuffer() {
    return encodeTopic(this);
  }
}
const TOPIC_LEN_BYTE_LEN = 1;
const TOPIC_MAX_BYTE_LEN = 256;
const FLAG = {
  req: 0,
  res: 1,
  pub: 2,
};
const GIFTS_LENGTH_BYTE_LEN = 4;
const GIFTS_MSG_TYPE_BYTE_LEN = 2;
const GIFTS_VERSION_BYTE_LEN = 2;
const GIFTS_ANS_TYPE_BYTE_LEN = 2;
const GIFTS_USER_ID_BYTE_LEN = 4;
const GIFTS_CLIENT_TIME_BYTE_LEN = 4;
const GIFTS_SESSION_ID_BYTE_LEN = 256;
const GIFTS_ANS_TAGS_BYTE_LEN = 64;
const GIFTS_MSG_NO_BYTE_LEN = 32;
const GIFTS_ECHO_BYTE_LEN = 64;
const GIFTS_SERVER_GROUP_LEN = 2;
const GIFTS_STATION_ADDR_LEN = 256;
const GIFTS_MIN_BYTE_LEN =
  GIFTS_LENGTH_BYTE_LEN +
  GIFTS_MSG_TYPE_BYTE_LEN +
  GIFTS_VERSION_BYTE_LEN +
  GIFTS_ANS_TYPE_BYTE_LEN +
  GIFTS_USER_ID_BYTE_LEN +
  GIFTS_CLIENT_TIME_BYTE_LEN +
  GIFTS_SESSION_ID_BYTE_LEN +
  GIFTS_ANS_TAGS_BYTE_LEN +
  GIFTS_MSG_NO_BYTE_LEN +
  GIFTS_ECHO_BYTE_LEN +
  GIFTS_SERVER_GROUP_LEN +
  GIFTS_STATION_ADDR_LEN;

// @ts-ignore
function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; // trail surrogate
  }
  return s;
}
export function decodeTopic(buf) {
  if (!(buf instanceof ArrayBuffer)) {
    throw new TypeError("not ArrayBuffer");
  }
  const len = buf.byteLength;
  buf = ByteBuffer.wrap(buf);
  const topic = new Topic();
  let offset = 0;
  const topic_byte_len = buf.readUInt8(offset);
  if (TOPIC_LEN_BYTE_LEN + topic_byte_len > len) {
    throw new Error("wrong length format buf");
  }
  offset += TOPIC_LEN_BYTE_LEN;
  const topic_str = buf.readUTF8String(topic_byte_len, offset).string;
  topic.setTopic(topic_str);
  offset += topic_byte_len;
  const data = buf.slice(offset);
  topic.setData(data.toArrayBuffer());

  return topic;
}

export function decodeGifts(buf) {
  if (!ByteBuffer.isByteBuffer(buf)) {
    throw new Error("not ByteBuffer");
  }
  // if(!(data instanceof ArrayBuffer)){
  // 	throw new Error("data must be ArrayBuffer");
  // }
  const total_byte_len = buf.capacity();
  if (total_byte_len < GIFTS_MIN_BYTE_LEN) {
    throw new Error("buf length less than min byte length");
  }
  const gifts = new Gifts();
  // len
  let offset = 0;
  const head_byte_len = buf.readUInt32(offset);
  offset += GIFTS_LENGTH_BYTE_LEN;
  if (head_byte_len > total_byte_len) {
    throw new Error("buf length less than head byte length");
  }
  // msg_type
  const msg_type = buf.readUInt16(offset);
  gifts.setMsg_type(msg_type);
  offset += GIFTS_MSG_TYPE_BYTE_LEN;

  // version
  const version = buf.readUInt16(offset);
  gifts.setVersion(version);
  offset += GIFTS_VERSION_BYTE_LEN;

  // ans_type
  const ans_type = buf.readUInt16(offset);
  gifts.setAns_type(ans_type);
  offset += GIFTS_ANS_TYPE_BYTE_LEN;

  // server_group
  const server_group = buf.readUInt16(offset);
  gifts.setServer_group(server_group);
  offset += GIFTS_SERVER_GROUP_LEN;

  // user_id
  const user_id = buf.readUInt16(offset);
  gifts.setUser_id(user_id);
  offset += GIFTS_USER_ID_BYTE_LEN;

  // client_time
  const client_time = buf.readUInt16(offset);
  gifts.setClient_time(client_time);
  offset += GIFTS_CLIENT_TIME_BYTE_LEN;

  // session_id
  let end = offset + GIFTS_SESSION_ID_BYTE_LEN;
  let pos = offset;
  while (buf.buffer.view[pos] !== 0 && pos < end) {
    pos++;
  }
  const session_id_len = pos - offset;
  const session_id = buf.readUTF8String(session_id_len, offset).string;
  gifts.setSession_id(session_id);
  offset = end;

  // station_addr
  end = offset + GIFTS_STATION_ADDR_LEN;
  pos = offset;
  while (buf.view[pos] !== 0 && pos < end) {
    pos++;
  }
  const station_addr_len = pos - offset;
  const station_addr = buf.readUTF8String(station_addr_len, offset).string;
  gifts.setStation_addr(station_addr);
  offset = end;

  // ans_tags
  end = offset + GIFTS_ANS_TAGS_BYTE_LEN;
  pos = offset;
  while (buf.view[pos] !== 0 && pos < end) {
    pos++;
  }
  const ans_tags_len = pos - offset;
  const ans_tags = buf.readUTF8String(ans_tags_len, offset).string;
  gifts.setAns_tags(ans_tags);
  offset = end;

  // msg_no
  end = offset + GIFTS_MSG_NO_BYTE_LEN;
  pos = offset;
  while (buf.view[pos] !== 0 && pos < end) {
    pos++;
  }
  const msg_no_len = pos - offset;
  const msg_no = buf.readUTF8String(msg_no_len, offset).string;
  gifts.setMsg_no(msg_no);
  offset = end;

  // echo
  end = offset + GIFTS_ECHO_BYTE_LEN;
  pos = offset;
  while (buf.view[pos] !== 0 && pos < end) {
    pos++;
  }
  const echo_len = pos - offset;
  const echo = buf.readUTF8String(echo_len, offset).string;
  gifts.setEcho(echo);
  offset = end;

  // data
  const data = buf.slice(offset);
  // data.offset = 0;
  gifts.setData(data.toArrayBuffer());

  return gifts;
}
export class Gifts {
  msg_type = 0;
  version = 0;
  ans_type = 0;
  user_id = 0;
  client_time = 0;
  session_id = "";
  ans_tags = "";
  msg_no = "";
  echo = "";
  server_group = 0;
  station_addr = "";

  data = null;
  buffer = Buffer.alloc(0);

  parseToInt(value, name) {
    if (typeof value != "number") {
      throw new TypeError(`${name} must be int`);
    }
    value = Number.parseInt(String(value));
    if (value < 0) {
      throw new Error(`${name} must greater than 0`);
    }
    return value;
  }

  setMsg_type(msg_type) {
    this.msg_type = this.parseToInt(msg_type, "msg_type");
    return this;
  }
  getMsg_type() {
    return this.msg_type;
  }

  setVersion(version) {
    this.version = this.parseToInt(version, "version");
    return this;
  }
  getVerion() {
    return this.version;
  }

  setAns_type(ans_type) {
    this.ans_type = this.parseToInt(ans_type, "ans_type");
    return this;
  }
  getAns_type() {
    return this.ans_type;
  }

  setUser_id(user_id) {
    this.user_id = this.parseToInt(user_id, "user_id");
    return this;
  }
  getUser_id() {
    return this.user_id;
  }

  setClient_time(client_time) {
    this.client_time = this.parseToInt(client_time, "client_time");
    return this;
  }
  getClient_time() {
    return this.client_time;
  }

  setSession_id(session_id) {
    if (typeof session_id != "string") {
      throw new TypeError("session_id must be string");
    }
    const len = ByteBuffer.calculateUTF8Bytes(session_id);
    if (len > GIFTS_SESSION_ID_BYTE_LEN) {
      throw new Error("session_id byte len too long");
    }
    this.session_id = session_id;
    return this;
  }
  getSession_id() {
    return this.session_id;
  }

  setAns_tags(ans_tags) {
    if (typeof ans_tags != "string") {
      throw new TypeError("ans_tags must be string");
    }
    const len = ByteBuffer.calculateUTF8Bytes(ans_tags);
    if (len > GIFTS_ANS_TAGS_BYTE_LEN) {
      throw new Error("ans_tags byte len too long");
    }
    this.ans_tags = ans_tags;
    return this;
  }
  getAns_tags() {
    return this.ans_tags;
  }

  setMsg_no(msg_no) {
    if (typeof msg_no != "string") {
      throw new TypeError("msg_no must be string");
    }
    const len = ByteBuffer.calculateUTF8Bytes(msg_no);
    if (len > GIFTS_MSG_NO_BYTE_LEN) {
      throw new Error("msg_no byte len too long");
    }
    this.msg_no = msg_no;
    return this;
  }
  getMsg_no() {
    return this.msg_no;
  }

  setEcho(echo) {
    if (typeof echo != "string") {
      throw new TypeError("echo must be string");
    }
    const len = ByteBuffer.calculateUTF8Bytes(echo);
    if (len > GIFTS_ECHO_BYTE_LEN) {
      throw new Error("echo byte len too long");
    }
    this.echo = echo;
    return this;
  }
  getEcho() {
    return this.echo;
  }

  isReq() {
    return this.msg_type === FLAG.req;
  }
  setReq() {
    this.msg_type = FLAG.req;
    return this;
  }
  isRes() {
    return this.msg_type === FLAG.res;
  }
  setRes() {
    this.msg_type = FLAG.res;
    return this;
  }
  isPub() {
    return this.msg_type === FLAG.pub;
  }
  setPub() {
    this.msg_type = FLAG.pub;
    return this;
  }

  setData(data) {
    if (!(data instanceof ArrayBuffer) && !(data instanceof Uint8Array)) {
      throw new TypeError("data must be ArrayBuffer or Uint8Array");
    }
    this.data = ByteBuffer.wrap(data);
    this.buffer = Buffer.from(data);
    return this;
  }
  getData() {
    return this.data;
  }

  getBuffer() {
    return this.buffer;
  }

  setServer_group(server_group) {
    this.server_group = this.parseToInt(server_group, "server_group");
    return this;
  }

  getServer_group() {
    return this.server_group;
  }

  setStation_addr(station_addr) {
    if (typeof station_addr != "string") {
      throw new TypeError("station_addr must be string");
    }
    const len = ByteBuffer.calculateUTF8Bytes(station_addr);
    if (len > GIFTS_STATION_ADDR_LEN) {
      throw new Error("station_addr byte len too long");
    }
    this.station_addr = station_addr;
    return this;
  }

  getStation_addr() {
    return this.station_addr;
  }

  toBuffer() {
    return encodeGifts(this);
  }
}

