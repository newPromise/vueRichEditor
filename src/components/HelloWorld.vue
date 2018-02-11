<template>
  <div class="hello">
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: '<h1>hello</h1>'
    }
  },
  created () {
    console.log('vueEditor', VueEditor)
  },
  components: {
    VueEditor,
    Quill
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
