import Request from '../source/request.js'
import assert from 'assert'
describe('Testing Request', function() {
  let request
  beforeEach(function() {
    request = new Request()
  })
  it('Should create the request Instance', function(done) {
    assert.ok(request)
    done()
  })
  it('Instance sould be object', function(done) {
    assert.equal(typeof request, "object")
    done()
  })
  // it('should make GET call to pstest-webservices', function(done) {
  //   request.get('https://pstest-webservices.palainteractive.com/').then((response) => {
  //     done()
  //   }).catch((err) => {
  //     console.log('ERR!', err)
  //   })
  // })
})
