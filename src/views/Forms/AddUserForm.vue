<template>
  <div style="margin: 100px">
    <a-form :form="form" :layout="formLayout">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="新用户名"
      >
        <a-input
          v-decorator="[
            '新用户名',
            {
              rules: [{ required: true, min: 6, message: '不能小于5位' }],
            },
          ]"
          placeholder="请输入您要新建的用户名"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="新用户密码"
      >
        <a-input
          v-decorator="[
            '新用户密码',
            {
              rules: [{ required: true, min: 6, message: '不能小于5位' }],
            },
          ]"
          placeholder="请输入新用户密码"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="新用户的权限"
      >
        <a-input
          v-decorator="[
            '新用户的权限',
            {
              rules: [{ required: true }],
            },
          ]"
          placeholder="请输入新用户的权限"
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
              values.新用户名 +
              "/" +
              values.新用户密码 +
              "/" +
              sessionStorage.getItem("session") +
              "/" +
              values.新用户的权限,
            method: "post",
            headers: {
              timestamp: timestamp,
              rand: rand,
              sign: sign,
            },
          }).then((response) => {
            console.log(response);
            if (response.status === 200 && response.data === "{ok}") {
              notification.success({
                message: "新用户已创建",
                description: "新用户已创建",
              });
            }
          });
        }
      });
    },
  },
};
</script>
