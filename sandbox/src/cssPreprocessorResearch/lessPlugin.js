module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('pluginToken', function (token) {
      return ({
        test: 'red',
      })[token];
    });
  }
}