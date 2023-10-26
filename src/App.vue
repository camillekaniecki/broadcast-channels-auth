<template>
  <v-container class='fill-height'>
    <v-responsive class='align-center text-center fill-height'>
      <div class='demo-wrapper'>
        <v-text-field
          label='Please enter some text'
          v-model="inputValue"
        ></v-text-field>
        <v-btn @click="handleClick($event)">Test</v-btn>
      </div>
    </v-responsive>
  </v-container>
  <!-- <router-view /> -->
</template>

<script>
import BroadcastChannelHelper from '@/workers/BroadcastChannelHelper';

export default {
  name: 'App',
  data() {
    return {
      broadcastChannel: null,
      inputValue: '',
      allInputs: [],
    };
  },
  computed: {
    allInputs() {
      return 'this will eventually be all inputs';
    },
  },
  created() {
    this.broadcastChannel = new BroadcastChannelHelper();
    this.broadcastChannel.on('input_added', () => {
      this.handleClick();
    });

    // this.handleClick(); // do we want to do this 
    if (this.broadcastChannel) {
      this.broadcastChannel.trigger('input_added', { data: this.inputValue});
    }
  },
  destroyed() {
    if (this.broadcastChannel) {
      this.broadcastChannel.terminate();
    }
  },
  methods: {
    handleClick() {
      if (this.broadcastChannel) {
        this.broadcastChannel.trigger('input_added', this.inputValue);
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
