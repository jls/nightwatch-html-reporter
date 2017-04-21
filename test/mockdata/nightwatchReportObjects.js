// Objects that are passed to the
// reporter function from nightwatch.
module.exports = {

	withOneFailure: {
	  'passed':3,
	  'failed':1,
	  'errors':0,
	  'skipped':1,
	  'tests':4,
	  'errmessages':[],
	  'modules':{
	    'GoogleTest':{
	      'step one':{
	        'passed':2,
	        'failed':0,
	        'errors':0,
	        'skipped':0,
	        'tests':[
	          {
	            'message':'Element <body> was visible after 63 milliseconds.',
	            'stacktrace':'',
	            'failure':false
	          },
	          {
	            'message':'Element <button[name=btnG]> was visible after 49 milliseconds.',
	            'stacktrace':'',
	            'failure':false
	          }
	        ]
	      },
	      'step two':{
	        'passed':1,
	        'failed':0,
	        'errors':0,
	        'skipped':0,
	        'tests':[
	          {
	            'message':'Testing if element <#main> contains text: \'The Night Watch\'.',
	            'stacktrace':'',
	            'failure':false
	          }
	        ]
	      },
	      'step three':{
	        'passed':0,
	        'failed':1,
	        'errors':0,
	        'skipped':1,
	        'tests':[
	          {
	            'message':'Testing if element <#main> contains text: \'The Night Watch JLS\'.',
	            'stacktrace':'Assertion failed in: Testing if element <#main> contains text: \'The Night Watch JLS\'.: Expected \'The Night Watch JLS\' but got: \'WebVideosImagesBooksShoppingMore\nSearch tools\nAbout 6,390,000 results (0.36 seconds) \n\n\nSearch Results\nNight Wa...',
	            'failure':'Expected \'The Night Watch JLS\' but got: \'WebVideosImagesBooksShoppingMore\nSearch tools\nAbout 6,390,000 results (0.36 seconds) \n\n\nSearch Results\nNigh...\''
	          }
	        ]
	      }
	    }
	  }
	},

	withOneError: {
	  'passed':3,
	  'failed':0,
	  'errors':1,
	  'skipped':0,
	  'tests':3,
	  'errmessages':[
	    'Unable to locate element: \'some element that does not exist\' using: css selector'
	  ],
	  'modules':{
	    'GoogleTest':{
	      'step one':{
	        'passed':2,
	        'failed':0,
	        'errors':0,
	        'skipped':0,
	        'tests':[
	          {
	            'message':'Element <body> was visible after 77 milliseconds.',
	            'stacktrace':'',
	            'failure':false
	          },
	          {
	            'message':'Element <button[name=btnG]> was visible after 35 milliseconds.',
	            'stacktrace':'',
	            'failure':false
	          }
	        ]
	      },
	      'step two':{
	        'passed':1,
	        'failed':0,
	        'errors':0,
	        'skipped':0,
	        'tests':[
	          {
	            'message':'Testing if element <#main> contains text: \'The Night Watch\'.',
	            'stacktrace':'',
	            'failure':false
	          }
	        ]
	      },
	      'step four':{
	        'passed':0,
	        'failed':0,
	        'errors':1,
	        'skipped':0,
	        'tests':[

	        ]
	      }
	    }
	  }
	}

};
