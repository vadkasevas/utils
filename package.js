Package.describe({
  name: 'malibun23:utils',
  version: '0.0.7',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
    "mkdirp":"0.5.1"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('underscore');

  api.use('jparker:crypto-core');
  api.use('jparker:crypto-md5');


  api.addFiles('lib/dateUtils.js');
  api.addFiles('lib/meteorUtils.js');
  api.addFiles('lib/mongoUtils.js');
  api.addFiles('lib/numberUtils.js');
  api.addFiles('lib/objectUtils.js');
  api.addFiles('lib/stringUtils.js');
  api.addFiles('lib/fileUtils.js');

  api.export(
      [
        'formatRuDateTime','inDateRange',
        'throttle',
        'cursorForEachChunked','eachCursorChunk',
        'rndInt',
        'md5','isset','objectSize','randKey','randValue','eachObjectField','generateRandomHash',
        'trim'
      ]
      , ['client', 'server']
  );

  api.export([
      'fileExists','dirExists','mkdir'
    ],
    ['server']
  );

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('malibun23:utils');
  api.addFiles('utils-tests.js');
});
