<template>
  <div class="hello">
    <!-- <vue-editor v-model="content"></vue-editor> -->
    <!-- <rich-editor></rich-editor> -->
    <bullet-screen>
      <div class="vedio"></div>
    </bullet-screen>
    <color-picker class="color-picker" @select-color="call"></color-picker>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import richEditor from "./richEditor";
import bulletScreen from "./bulletScreen";
import colorPicker from "./colorPicker";
export default {
  name: "HelloWorld",
  data () {
    return {
      msg: "Welcome to Your Vue.js App",
      content: ""
    };
  },
  created () {
    console.log("", VueEditor);
  },
  methods: {
    call (bg) {
      console.log(bg);
    }
  },
  components: {
    richEditor,
    VueEditor,
    Quill,
    bulletScreen,
    colorPicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-picker {
  margin: auto;
  margin-top: 50px;
  width: 500px;
}
.vedio {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: lightblue;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
