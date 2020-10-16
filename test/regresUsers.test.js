import { expect } from 'chai';
import { getAllRegresUsers } from '../src/utils';

describe('Userlist', () => {
  it('should return all list', function foo (done) {
    this.timeout(35000);
    getAllRegresUsers('https://reqres.in/api/users?page=').then(result => {
      expect(result.success).to.equal(true);

      done();
    });
  });
});
