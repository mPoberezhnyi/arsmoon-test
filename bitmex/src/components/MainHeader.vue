<template>
  <div>
    <h3>BitMEX</h3>
    <p>{{username}}</p>
  </div>
</template>

<script>
import { GET_USER_NAME } from '../constants';

export default {
  name: 'MainHeader',
  mounted() {
    this.$store.dispatch(GET_USER_NAME);
  },
  computed: {
    username() {
      return this.$store.getters.userName;
    },
  },
};
</script>
