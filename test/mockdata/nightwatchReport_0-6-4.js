module.exports = {
  mockData: {
    'passed': 9,
    'failed': 2,
    'errors': 0,
    'skipped': 0,
    'tests': 10,
    'errmessages': [],
    'modules': {
      'FailingGoogleTest': {
        'completed': {
          'Failing test Google': {
            'passed': 1,
            'failed': 1,
            'errors': 0,
            'skipped': 0,
            'assertions': [
              {
                'message': 'Element <body> was visible after 49 milliseconds.',
                'stacktrace': '',
                'failure': false
              },
              {
                'message': 'Timed out while waiting for element <button[name=btnGFAIL]> to be present for 1000 milliseconds.',
                'stacktrace': 'Timed out while waiting for element <button[name=btnGFAIL]> to be present for 1000 milliseconds.: Expected \'visible\' but got: \'not found\'\n    at F.WaitForElement.fail (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/_waitForElement.js:192:15)\n    at F.WaitForElementPresent.elementNotFound (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/waitForElementPresent.js:57:15)\n    at Object.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/_waitForElement.js:209:17)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:276:20)\n    at HttpRequest.EventEmitter.emit (events.js:98:17)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:323:15)\n    at HttpRequest.EventEmitter.emit (events.js:106:17)\n    at IncomingMessage.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/http/request.js:150:16)\n    at IncomingMessage.EventEmitter.emit (events.js:117:20)\n    at _stream_readable.js:920:16',
                'failure': 'Expected \'visible\' but got: \'not found\'',
                'screenshots': [
                  '/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-172756-GMT-0400.png'
                ]
              }
            ],
            'time': '6.168'
          }
        },
        'skipped': [],
        'time': '6.168',
        'timestamp': 'Mon, 20 Apr 2015 21:27:50 GMT',
        'tests': 1,
        'failures': 1,
        'errors': 0
      },
      'FailingMultiStepTest': {
        'completed': {
          'Error Multistep Test': {
            'passed': 2,
            'failed': 0,
            'errors': 0,
            'skipped': 0,
            'assertions': [
              {
                'message': 'Element <body> was visible after 29 milliseconds.',
                'stacktrace': '',
                'failure': false
              },
              {
                'message': 'Element <button[name=btnG]> was visible after 51 milliseconds.',
                'stacktrace': '',
                'failure': false
              }
            ],
            'time': '3.379'
          },
          'error Multistep Test Part 2': {
            'passed': 0,
            'failed': 1,
            'errors': 0,
            'skipped': 0,
            'assertions': [],
            'time': '0.002000'
          }
        },
        'skipped': [],
        'time': '3.381',
        'timestamp': 'Mon, 20 Apr 2015 21:27:57 GMT',
        'tests': 2,
        'failures': 1,
        'errors': 0
      },
      'GoogleTest': {
        'completed': {
          'Demo test Google': {
            'passed': 3,
            'failed': 0,
            'errors': 0,
            'skipped': 0,
            'assertions': [
              {
                'message': 'Element <body> was visible after 32 milliseconds.',
                'stacktrace': '',
                'failure': false
              },
              {
                'message': 'Element <button[name=btnG]> was visible after 30 milliseconds.',
                'stacktrace': '',
                'failure': false
              },
              {
                'message': 'Testing if element <#main> contains text: \'The Night Watch\'.',
                'stacktrace': '',
                'failure': false
              }
            ],
            'time': '5.539'
          }
        },
        'skipped': [],
        'time': '5.539',
        'timestamp': 'Mon, 20 Apr 2015 21:28:00 GMT',
        'tests': 1,
        'failures': 0,
        'errors': 0
      },
      'MultiStepGoogleTest': {
        'completed': {
          'Multistep Test': {
            'passed': 2,
            'failed': 0,
            'errors': 0,
            'skipped': 0,
            'assertions': [
              {
                'message': 'Element <body> was visible after 42 milliseconds.',
                'stacktrace': '',
                'failure': false
              },
              {
                'message': 'Element <button[name=btnG]> was visible after 29 milliseconds.',
                'stacktrace': '',
                'failure': false
              }
            ],
            'time': '3.451'
          },
          'Multistep Test Part 2': {
            'passed': 1,
            'failed': 0,
            'errors': 0,
            'skipped': 0,
            'assertions': [
              {
                'message': 'Testing if element <#main> contains text: \'The Night Watch\'.',
                'stacktrace': '',
                'failure': false
              }
            ],
            'time': '2.200'
          }
        },
        'skipped': [],
        'time': '5.651',
        'timestamp': 'Mon, 20 Apr 2015 21:28:06 GMT',
        'tests': 2,
        'failures': 0,
        'errors': 0
      },
      'SkippedTest': {
        'completed': {},
        'skipped': [
          'Skipped Test Part 1',
          'Skipped Test Part 2',
          'Skipped Test Part 3'
        ],
        'time': '0.000',
        'timestamp': 'Mon, 20 Apr 2015 21:28:11 GMT',
        'tests': 3,
        'failures': 0,
        'errors': 0
      }
    },
    'assertions': 10
  }
};
