import SHA256 from "crypto-js/sha256";
import MD5 from "crypto-js/md5";
export function md5(words) {
  return MD5(words).toString();
}
export function sha256(words) {
  return SHA256(words).toString();
}
