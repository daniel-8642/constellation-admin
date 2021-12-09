function chart(method) {
  let res;
  switch (method) {
    case "GET":
      res = [100, 40, 54, 67, 12, 54];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
