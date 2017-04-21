// This is the object returned from xml2js
// when we parse a single XML file.  We use this
// in tests to make sure we can normalize the parsed object.
module.exports = {

	withOneError: {
		'filename': 'GoogleTest.js',
	  'testsuites':{
	    '$':{
	      'name':'GoogleTest',
	      'errors':'1',
	      'failures':'0',
	      'tests':'3'
	    },
	    'testsuite':[
	      {
	        '$':{
	          'errors':'0',
	          'failures':'0',
	          'hostname':'',
	          'id':'',
	          'name':'step one',
	          'package':'GoogleTest',
	          'skipped':'0',
	          'tests':'2',
	          'time':'',
	          'timestamp':''
	        },
	        'testcase':[
	          {
	            '$':{
	              'name':'Element <body> was visible after 57 milliseconds.'
	            }
	          },
	          {
	            '$':{
	              'name':'Element <button[name=btnG]> was visible after 33 milliseconds.'
	            }
	          }
	        ],
	        'system-err':[
	          '\n        Unable to locate element: \'some element that does not exist\' using: css selector\n      '
	        ]
	      },
	      {
	        '$':{
	          'errors':'0',
	          'failures':'0',
	          'hostname':'',
	          'id':'',
	          'name':'step two',
	          'package':'GoogleTest',
	          'skipped':'0',
	          'tests':'1',
	          'time':'',
	          'timestamp':''
	        },
	        'testcase':[
	          {
	            '$':{
	              'name':'Testing if element <#main> contains text: \'The Night Watch\'.'
	            }
	          }
	        ],
	        'system-err':[
	          '\n        Unable to locate element: \'some element that does not exist\' using: css selector\n      '
	        ]
	      },
	      {
	        '$':{
	          'errors':'1',
	          'failures':'0',
	          'hostname':'',
	          'id':'',
	          'name':'step four',
	          'package':'GoogleTest',
	          'skipped':'0',
	          'tests':'0',
	          'time':'',
	          'timestamp':''
	        },
	        'system-err':[
	          '\n        Unable to locate element: \'some element that does not exist\' using: css selector\n      '
	        ]
	      }
	    ]
	  }
	}
};
