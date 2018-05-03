<template>
  <div class="hello">
    <!-- <vue-editor v-model="content"></vue-editor> -->
    <!-- <rich-editor></rich-editor> -->
    <bullet-screen>
      <div class="vedio"></div>
    </bullet-screen>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import richEditor from "./richEditor";
import bulletScreen from "./bulletScreen";
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
  components: {
    richEditor,
    VueEditor,
    Quill,
    bulletScreen
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vedio {
  width: 500px;
  height: 300px;
  margin: 0 auto;
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
