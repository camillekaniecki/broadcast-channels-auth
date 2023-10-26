export default class BroadcastChannelHelper {

  constructor() {
    if (window.BroadcastChannel) {
      this.broadcastChannel = new BroadcastChannel('demo_bd_channel');

      onmessage = (MessageEvent) => {
        console.log('******  inside onmessage and MessageEvent is', MessageEvent);
        const { eventName, data = {} } = MessageEvent.data;
        if (eventName === 'input_added') {
          console.log('input added and I am in the worker file and input is', data);
        }
      };      

      this.events = {};

      this.broadcastChannel.addEventListener(
        'message',
        (e) => this.callEventCallback(e.data),
        false,
      );

      this.broadcastChannel.addEventListener(
        'error',
        () => this.callEventCallback('error'),
        false,
      );
    }
  }

  trigger(eventName, data) {
    this.broadcastChannel.postMessage({
      eventName,
      data,
    });
  }

  terminate() {
    this.broadcastChannel.terminate();
  }

  on(eventName, callback) {
    // Record events and callbacks to listen on
    this.events[eventName] = callback;
  }

  callEventCallback({ event, data }) {
    console.log('received a broadcast message and data is', data);
    // Call external callback based on event listened
    if (Object.prototype.hasOwnProperty.call(this.events, event)) {
      this.events[event].call(null, data);
    }
  }
}
