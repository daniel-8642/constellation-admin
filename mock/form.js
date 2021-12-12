function chart(method) {
  let res;
  switch (method) {
    case "GET":
      res = { message: "ok" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
