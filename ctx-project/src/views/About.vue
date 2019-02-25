<template>
  <div class="about">
    <slot name="s" :ss="msg"></slot>
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "s"
    };
  },
};
</script>
