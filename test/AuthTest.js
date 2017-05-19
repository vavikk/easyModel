import Auth from '../source/auth.js';
import assert from 'assert';
describe('Testing Auth', function() {
  let auth
  beforeEach(function() {
    auth = new Auth()
  });
  it('Instance sould be object', function(done) {
    assert.equal(typeof auth, "object");
    done()
  })
})
