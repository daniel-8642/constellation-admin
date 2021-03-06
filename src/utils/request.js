import axios from "axios";
import { notification } from "ant-design-vue";
async function request(options) {
  // options.url = "http://xzys.86428642.xyz" + options.url;
  // options.url = "http://localhost:80" + options.url;
  return axios(options)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      const {
        response: { status, statusText, data },
      } = error;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: (h) => (
          <div>
            请求错误 <span style="color: red">{status}</span>: {data.message}
          </div>
        ),
        description: statusText,
      });
      return Promise.reject(error);
    });
}

export default request;
