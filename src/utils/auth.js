export function getCurrentAuthority() {
  return ["user"];
}

export function check(authorith) {
  const current = getCurrentAuthority();
  return current.some((item) => authorith.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
