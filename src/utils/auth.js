import request from "@/utils/request";
import { sha256, md5 } from "@/utils/crypto";

export function getCurrentAuthority() {
  return sessionStorage.getItem("auth");
}

export function check(authorith) {
  if (!isLogin()) {
    return false;
  }
  const current = getCurrentAuthority();
  return authorith >= current;
}

export function isLogin() {
  return sessionStorage.getItem("session") != null;
}

export function pullCurrentAuthority() {
  let timestamp = new Date().getTime();
  let rand = Math.ceil(100000000000 * Math.random()) + "";
  let sign = sha256(
    md5(sessionStorage.getItem("session")) +
      timestamp +
      sessionStorage.getItem("key") +
      rand
  );
  request({
    method: "get",
    url: "/user/auth/" + sessionStorage.getItem("session"),
    headers: {
      timestamp: timestamp,
      rand: rand,
      sign: sign,
    },
  })
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("auth", response.data.auth);
    })
    .catch((err) => {
      console.log("auth" + err);
    });
}
