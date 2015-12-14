'use strict';

describe('Questions E2E Tests:', function () {
  describe('Test questions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/questions');
      expect(element.all(by.repeater('question in questions')).count()).toEqual(0);
    });
  });
});
