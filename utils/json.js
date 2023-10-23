import is from "@sindresorhus/is";
import parseJson from "parse-json";

function parse(text, receiver) {
  return is.function_(receiver) ? parseJson(text, receiver) : parseJson(text);
}

export { parse };

