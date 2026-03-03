import {EventEmitter} from "https://deno.land/std@0.74.0/node/events.ts";;

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
