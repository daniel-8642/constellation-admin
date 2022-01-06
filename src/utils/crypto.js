import SHA256 from "crypto-js/sha256";
import MD5 from "crypto-js/md5";
import HmacSha256 from "crypto-js/hmac-sha256";
export function md5(words) {
  return MD5(words).toString();
}
export function sha256(words) {
  return SHA256(words).toString();
}
export function hmac(words) {
  var hash = HmacSha256(words, sessionStorage.getItem("key"));
  return hash.toString();
}
