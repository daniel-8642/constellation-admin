<template>
  <div style="margin: 100px">
    <a-form :form="form" :layout="formLayout">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="原密码"
      >
        <a-input
          v-decorator="[
            '原密码',
            {
              rules: [{ required: true, min: 6, message: '不能小于5位' }],
            },
          ]"
          placeholder="请输入目前的密码"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="新密码"
      >
        <a-input
          v-decorator="[
            '新密码',
            {
              rules: [{ required: true, min: 6, message: '不能小于5位' }],
            },
          ]"
          placeholder="请输入新的密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit"> Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import { notification } from "ant-design-vue";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      name: "BasicForm",
      formLayout: "horizontal",
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let timestamp = new Date().getTime();
          let rand = Math.ceil(100000000000 * Math.random()) + "";
          let sign = this.$sha256(
            this.$md5(sessionStorage.getItem("session")) +
              timestamp +
              sessionStorage.getItem("key") +
              rand
          );
          request({
            url:
              "/user/" +
              sessionStorage.getItem("session") +
              "/" +
              values.原密码 +
              "/" +
              values.新密码,
            method: "put",
            headers: {
              timestamp: timestamp,
              rand: rand,
              sign: sign,
            },
          }).then((response) => {
            console.log(response);
            if (response.status === 200 && response.data === "{ok}") {
              notification.success({
                message: "密码已修改",
                description: "密码已修改",
              });
              sessionStorage.removeItem("session");
              this.$router.push("/user/login");
            }
          });
        }
      });
    },
  },
};
</script>
