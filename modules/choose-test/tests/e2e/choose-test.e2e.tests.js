'use strict';

describe('User Sessions E2E Tests:', function () {
  describe('Test user sessions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/user_session');
      expect(element.all(by.repeater('user_session in user_sessions')).count()).toEqual(0);
    });
  });
});
