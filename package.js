Package.describe({
  name: 'malibun23:utils',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('jparker:crypto-core');
  api.use('jparker:crypto-md5');
  _.each(['dateUtils','meteorUtils','mongoUtils','numberUtils','objectUtils','stringUtils'],function(fileName){
      api.addFiles('lib/'+fileName+'.js');
  });

  api.export(
      [
        'formatRuDateTime','inDateRange',
        'throttle',
        'cursorForEachChunked',
        'rndInt',
        'md5','isset','objectSize','randKey','randValue','eachObjectField','generateRandomHash',
        'trim'
      ]
      , ['client', 'server']
  );

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('malibun23:utils');
  api.addFiles('utils-tests.js');
});
