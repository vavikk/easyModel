import {listenTo} from '../source/listenTo.js';
import Model from '../source/model.js';
import assert from 'assert';
describe('Testing listenTo:', function() {
  let model
  beforeEach(function() {
    model = new Model()
  });
  it('listentTo can be imported', function(done) {
    assert.ok(listenTo);
    done()
  })
  it('listentTo can be used with a model', function(done) {
    listenTo(model,"name", function(){})
    done()
  })
  it('model param should be a Model instance', function(done) {
    assert.throws(
      function() {
        listenTo("model","name", function(){})
      }
      ,
      Error,
      /model is not Model instance/
    );
    done()
  })
  it('should call a callback function', function(done) {
    function myCallback() {
      done()
    }
    listenTo(model, "name", myCallback)
    model.set("name", "Vitalie")
  })
  it('should NOT call a function if it is not listening for the proper key', function(done) {
    let i = 0
    function myCallback() {
      i++
      assert.equal(i, 1)
    }
    listenTo(model, "name", myCallback)
    model.set("name", "Vitalie")
    model.set("id", 20)
    done()
  })
})
