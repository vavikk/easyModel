import channel from '../source/channels.js';
import assert from 'assert';
describe('Testing channels:', function() {
  let ch
  beforeEach(function() {
    ch = channel.get("Zoom")
  });
  it('channels can be imported', function(done) {
    assert.ok(channel);
    done()
  })
  it('can create a new channel via get method', function(done) {
    assert.ok(ch);
    done()
  })
  it('can publish', function(done) {
    assert.ok(ch.publish("Something", "something"));
    done()
  })
  it('can subscribe', function(done) {
    assert.ok(ch.subscribe("Something", "something"));
    done()
  })
  it('can call a method', function(done) {
    ch.subscribe("Zuum/action", message)
    ch.publish('Zuum/action', {run:true, walk: false})
    function message(key, value) {
      assert.equal(value.run, true)
      done()
    }
  })
  it('triggers the callback only on a subscribed channel', function(done) {
    ch.subscribe("Zuum/action", message)
    ch.publish('Zuum/different_channel_name', {run:true, walk: false})
    function message(key, value) {
      assert.equal(value.run, false)
    }
    done()
  })
})
