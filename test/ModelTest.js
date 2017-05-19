import Model from '../source/model.js';
import {listenTo} from '../source/listenTo.js';
import assert from 'assert';

describe('Testing Model', function() {
  it('Model sould be function', function(done) {
    assert.equal(typeof Model, "function");
    done()
  });
  it('Instance sould be object', function(done) {
    let model = new Model()
    assert.equal(typeof model, "object")
    done()
  })
  describe('Testing Model Instance', function() {
    let model
    beforeEach(function() {
      model = new Model()
    })
    it('should be able to set', function(done) {
      model.set("name", "test")
      done()
    })
    it('should trow an error if key is missing', function(done) {
      assert.throws(
        function() {
          model.set()
        },
        Error,
        /Key is undefined/
      )
      done()
    })
    it('should be able to get', function(done) {
      model.set("name", "test")
      let value = model.get("name")
      assert.equal(value, "test")
      done()
    })
    it('should return the keys', function(done) {
      model.set("getKeys", 1)
      let keys = model.keys
      for(let key of keys) {
        if(key === "getKeys") done()
      }
    })
    it('can be changed', function(done) {
      model.set("name", "another test")
      let value = model.get("name")
      assert.equal(value, "another test")
      done()
    });
    it('it dispatches ONE event when set ONCE', function(done) {
      let i = 0
      model.pubsub.subscribe("name", function(){
        i++
        assert.equal(i, 1)
      })
      model.set("name", "test")
      done()
    })
    it('it is not dispatching an event when set twice with the same value', function(done) {
      let i = 0
      model.pubsub.subscribe("name", function(){
        i++
        assert.equal(i, 1)
      })
      model.set("name", "test2")
      model.set("name", "test2")
      done()
    })
    it('it is not dispatching an event when called with silent option', function(done) {
      let i = 0
      model.pubsub.subscribe("name", function(){
        i++
        assert.equal(i, 1)
      })
      model.set("name", "test3")
      model.set("name", "Something Silent", {silent: true})
      let value = model.get("name")
      assert.equal(value, "Something Silent")
      done()
    })
  });
  describe('Testing Model Defaults', function() {
    let model
    beforeEach(function() {
      model = new Model({id: 10});
    })
    it('should create a model', function(done) {
      assert.ok(model)
      done()
    })
    it('should get the default', function(done) {
      assert.equal(model.get("id"), 10)
      done()
    })
    it('Default argument should be object', function(done) {
      assert.throws(
        function() {
          let modelError = new Model("10");
        },
        Error,
        /Passing string as default argument/
      );
      done()
    })
    it('Default is only one argument', function(done) {
      assert.throws(
        function() {
          let modelE = new Model({id:10}, "Some args");
        },
        Error,
        /Passing more than one default argument/
      );
      done()
    })
    it('Default is not dispatching an event', function(done) {
      let i = 0
      model.pubsub.subscribe("id", function(){
        i++
        assert.equal(i, 1)
      })
      model.set("id", 11)
      done()
    })
    it('Will not dispatch an event if setted with the same value', function(done) {
      let i = 0
      let modelQ = new Model({id: 10})
      modelQ.pubsub.subscribe("id", function(){
        i++
        assert.equal(i, 0)
      })
      modelQ.set("id", 10)
      done()
    })
  })
});
