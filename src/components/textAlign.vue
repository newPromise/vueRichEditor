<template>
 <div class="text-align">
	 <span class="align-items" v-for="type of typeNumber" :key="type">
		 <span class="text-bar" v-for="bar of 3" :key="bar" :class="type === 'left' ? '' : ''"></span>
	 </span>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'textAlign',
  data () {
	  return {
      typeNumber: 4
	  };
  },
  components: {
  }
};
</script>

<style scoped >
.text-align {
	display: inline;
	width: 10px;
	height: 10px;
}
.align-items {
	width: 100%;
	display: flex;
	align-items: center;
}
.align-items span {
	display: inline-block;
	width: 100%;
	background-color: red;
}
</style>
