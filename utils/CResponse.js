import * as encodings from "./protocol-buffers-encodings.js";

var varint = encodings.varint;
var skip = encodings.skip;

export const CResponse = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null,
};

export const Rows = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null,
};

export const ResultSet = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null,
};

defineCResponse();
defineRows();
defineResultSet();

function defineCResponse() {
  var enc = [encodings.string, encodings.int32, ResultSet, encodings.bytes];

  CResponse.encodingLength = encodingLength;
  CResponse.encode = encode;
  CResponse.decode = decode;

  function encodingLength(obj) {
    var length = 0;
    if (defined(obj.topic)) {
      var len = enc[0].encodingLength(obj.topic);
      length += 1 + len;
    }
    if (defined(obj.totalpkg)) {
      var len = enc[1].encodingLength(obj.totalpkg);
      length += 1 + len;
    }
    if (defined(obj.currpkg)) {
      var len = enc[1].encodingLength(obj.currpkg);
      length += 1 + len;
    }
    if (defined(obj.errcode)) {
      var len = enc[1].encodingLength(obj.errcode);
      length += 1 + len;
    }
    if (defined(obj.errmsg)) {
      var len = enc[0].encodingLength(obj.errmsg);
      length += 1 + len;
    }
    if (defined(obj.results)) {
      for (var i = 0; i < obj.results.length; i++) {
        if (!defined(obj.results[i])) continue;
        var len = enc[2].encodingLength(obj.results[i]);
        length += varint.encodingLength(len);
        length += 1 + len;
      }
    }
    if (defined(obj.zip_md5)) {
      var len = enc[0].encodingLength(obj.zip_md5);
      length += 1 + len;
    }
    if (defined(obj.zipdata)) {
      var len = enc[3].encodingLength(obj.zipdata);
      length += 1 + len;
    }
    if (defined(obj.zip_flag)) {
      var len = enc[0].encodingLength(obj.zip_flag);
      length += 1 + len;
    }
    if (defined(obj.zip_key)) {
      var len = enc[0].encodingLength(obj.zip_key);
      length += 1 + len;
    }
    return length;
  }

  function encode(obj, buf, offset) {
    if (!offset) offset = 0;
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj));
    var oldOffset = offset;
    if (defined(obj.topic)) {
      buf[offset++] = 10;
      enc[0].encode(obj.topic, buf, offset);
      offset += enc[0].encode.bytes;
    }
    if (defined(obj.totalpkg)) {
      buf[offset++] = 16;
      enc[1].encode(obj.totalpkg, buf, offset);
      offset += enc[1].encode.bytes;
    }
    if (defined(obj.currpkg)) {
      buf[offset++] = 24;
      enc[1].encode(obj.currpkg, buf, offset);
      offset += enc[1].encode.bytes;
    }
    if (defined(obj.errcode)) {
      buf[offset++] = 32;
      enc[1].encode(obj.errcode, buf, offset);
      offset += enc[1].encode.bytes;
    }
    if (defined(obj.errmsg)) {
      buf[offset++] = 42;
      enc[0].encode(obj.errmsg, buf, offset);
      offset += enc[0].encode.bytes;
    }
    if (defined(obj.results)) {
      for (var i = 0; i < obj.results.length; i++) {
        if (!defined(obj.results[i])) continue;
        buf[offset++] = 50;
        varint.encode(enc[2].encodingLength(obj.results[i]), buf, offset);
        offset += varint.encode.bytes;
        enc[2].encode(obj.results[i], buf, offset);
        offset += enc[2].encode.bytes;
      }
    }
    if (defined(obj.zip_md5)) {
      buf[offset++] = 58;
      enc[0].encode(obj.zip_md5, buf, offset);
      offset += enc[0].encode.bytes;
    }
    if (defined(obj.zipdata)) {
      buf[offset++] = 66;
      enc[3].encode(obj.zipdata, buf, offset);
      offset += enc[3].encode.bytes;
    }
    if (defined(obj.zip_flag)) {
      buf[offset++] = 74;
      enc[0].encode(obj.zip_flag, buf, offset);
      offset += enc[0].encode.bytes;
    }
    if (defined(obj.zip_key)) {
      buf[offset++] = 82;
      enc[0].encode(obj.zip_key, buf, offset);
      offset += enc[0].encode.bytes;
    }
    encode.bytes = offset - oldOffset;
    return buf;
  }

  function decode(buf, offset, end) {
    if (!offset) offset = 0;
    if (!end) end = buf.length;
    if (!(end <= buf.length && offset <= buf.length))
      throw new Error("Decoded message is not valid");
    var oldOffset = offset;
    var obj = {
      topic: "",
      totalpkg: 0,
      currpkg: 0,
      errcode: 0,
      errmsg: "",
      results: [],
      zip_md5: "",
      zipdata: null,
      zip_flag: "",
      zip_key: "",
    };
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset;
        return obj;
      }
      var prefix = varint.decode(buf, offset);
      offset += varint.decode.bytes;
      var tag = prefix >> 3;
      switch (tag) {
        case 1:
          obj.topic = enc[0].decode(buf, offset);
          offset += enc[0].decode.bytes;
          break;
        case 2:
          obj.totalpkg = enc[1].decode(buf, offset);
          offset += enc[1].decode.bytes;
          break;
        case 3:
          obj.currpkg = enc[1].decode(buf, offset);
          offset += enc[1].decode.bytes;
          break;
        case 4:
          obj.errcode = enc[1].decode(buf, offset);
          offset += enc[1].decode.bytes;
          break;
        case 5:
          obj.errmsg = enc[0].decode(buf, offset);
          offset += enc[0].decode.bytes;
          break;
        case 6:
          var len = varint.decode(buf, offset);
          offset += varint.decode.bytes;
          obj.results.push(enc[2].decode(buf, offset, offset + len));
          offset += enc[2].decode.bytes;
          break;
        case 7:
          obj.zip_md5 = enc[0].decode(buf, offset);
          offset += enc[0].decode.bytes;
          break;
        case 8:
          obj.zipdata = enc[3].decode(buf, offset);
          offset += enc[3].decode.bytes;
          break;
        case 9:
          obj.zip_flag = enc[0].decode(buf, offset);
          offset += enc[0].decode.bytes;
          break;
        case 10:
          obj.zip_key = enc[0].decode(buf, offset);
          offset += enc[0].decode.bytes;
          break;
        default:
          offset = skip(prefix & 7, buf, offset);
      }
    }
  }
}

function defineRows() {
  var enc = [encodings.string];

  Rows.encodingLength = encodingLength;
  Rows.encode = encode;
  Rows.decode = decode;

  function encodingLength(obj) {
    var length = 0;
    if (defined(obj.items)) {
      for (var i = 0; i < obj.items.length; i++) {
        if (!defined(obj.items[i])) continue;
        var len = enc[0].encodingLength(obj.items[i]);
        length += 1 + len;
      }
    }
    return length;
  }

  function encode(obj, buf, offset) {
    if (!offset) offset = 0;
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj));
    var oldOffset = offset;
    if (defined(obj.items)) {
      for (var i = 0; i < obj.items.length; i++) {
        if (!defined(obj.items[i])) continue;
        buf[offset++] = 10;
        enc[0].encode(obj.items[i], buf, offset);
        offset += enc[0].encode.bytes;
      }
    }
    encode.bytes = offset - oldOffset;
    return buf;
  }

  function decode(buf, offset, end) {
    if (!offset) offset = 0;
    if (!end) end = buf.length;
    if (!(end <= buf.length && offset <= buf.length))
      throw new Error("Decoded message is not valid");
    var oldOffset = offset;
    var obj = {
      items: [],
    };
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset;
        return obj;
      }
      var prefix = varint.decode(buf, offset);
      offset += varint.decode.bytes;
      var tag = prefix >> 3;
      switch (tag) {
        case 1:
          obj.items.push(enc[0].decode(buf, offset));
          offset += enc[0].decode.bytes;
          break;
        default:
          offset = skip(prefix & 7, buf, offset);
      }
    }
  }
}

function defineResultSet() {
  var enc = [encodings.string, Rows];

  ResultSet.encodingLength = encodingLength;
  ResultSet.encode = encode;
  ResultSet.decode = decode;

  function encodingLength(obj) {
    var length = 0;
    if (defined(obj.columns)) {
      for (var i = 0; i < obj.columns.length; i++) {
        if (!defined(obj.columns[i])) continue;
        var len = enc[0].encodingLength(obj.columns[i]);
        length += 1 + len;
      }
    }
    if (defined(obj.rows)) {
      for (var i = 0; i < obj.rows.length; i++) {
        if (!defined(obj.rows[i])) continue;
        var len = enc[1].encodingLength(obj.rows[i]);
        length += varint.encodingLength(len);
        length += 1 + len;
      }
    }
    return length;
  }

  function encode(obj, buf, offset) {
    if (!offset) offset = 0;
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj));
    var oldOffset = offset;
    if (defined(obj.columns)) {
      for (var i = 0; i < obj.columns.length; i++) {
        if (!defined(obj.columns[i])) continue;
        buf[offset++] = 10;
        enc[0].encode(obj.columns[i], buf, offset);
        offset += enc[0].encode.bytes;
      }
    }
    if (defined(obj.rows)) {
      for (var i = 0; i < obj.rows.length; i++) {
        if (!defined(obj.rows[i])) continue;
        buf[offset++] = 18;
        varint.encode(enc[1].encodingLength(obj.rows[i]), buf, offset);
        offset += varint.encode.bytes;
        enc[1].encode(obj.rows[i], buf, offset);
        offset += enc[1].encode.bytes;
      }
    }
    encode.bytes = offset - oldOffset;
    return buf;
  }

  function decode(buf, offset, end) {
    if (!offset) offset = 0;
    if (!end) end = buf.length;
    if (!(end <= buf.length && offset <= buf.length))
      throw new Error("Decoded message is not valid");
    var oldOffset = offset;
    var obj = {
      columns: [],
      rows: [],
    };
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset;
        return obj;
      }
      var prefix = varint.decode(buf, offset);
      offset += varint.decode.bytes;
      var tag = prefix >> 3;
      switch (tag) {
        case 1:
          obj.columns.push(enc[0].decode(buf, offset));
          offset += enc[0].decode.bytes;
          break;
        case 2:
          var len = varint.decode(buf, offset);
          offset += varint.decode.bytes;
          obj.rows.push(enc[1].decode(buf, offset, offset + len));
          offset += enc[1].decode.bytes;
          break;
        default:
          offset = skip(prefix & 7, buf, offset);
      }
    }
  }
}

function defined(val) {
  return (
    val !== null &&
    val !== undefined &&
    (typeof val !== "number" || !Number.isNaN(val))
  );
}

