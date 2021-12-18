<template>
  <div style="margin: 100px">
    <a-form :form="form" :layout="formLayout">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Field A"
      >
        <a-input
          v-decorator="[
            'fieldA',
            {
              initiaValue: fieldA,
              rules: [{ required: true, min: 6, message: '不能小于5位' }],
            },
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Field B"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit"> Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      name: "BasicForm",
      formLayout: "horizontal",
      fieldA: "",
      fieldB: "",
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
          this.fieldA = values.fieldA;
          Object.assign(this, values);
        }
      });
    },
  },
};
</script>
