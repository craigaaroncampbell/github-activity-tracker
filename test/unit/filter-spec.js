const angular = require('angular');

describe('splitOnCaps filter', function() {
  var $filter;

  beforeEach(angular.mock.module('githubApp'));

  beforeEach(angular.mock.inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return a new string with spaces before every capital letter except the first', () => {
    expect($filter('splitOnCaps')('SomeTestStringWithLotsOfCaps')).toEqual('Some Test String With Lots Of Caps');
  });
});
