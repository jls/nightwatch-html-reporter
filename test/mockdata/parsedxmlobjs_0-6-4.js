module.exports = {

	mockData: [
		{
			'testsuites': {
				'$': {
					'name': 'GoogleTest',
					'errors': '0',
					'failures': '0',
					'tests': '3'
				},
				'testsuite': [
					{
						'$': {
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'name': 'Demo test Google',
							'package': 'GoogleTest',
							'skipped': '0',
							'tests': '3',
							'time': '',
							'timestamp': ''
						},
						'testcase': [
							{
								'$': {
									'name': 'Element <body> was visible after 52 milliseconds.'
								}
							},
							{
								'$': {
									'name': 'Element <button[name=btnG]> was visible after 60 milliseconds.'
								}
							},
							{
								'$': {
									'name': 'Testing if element <#main> contains text: \'The Night Watch\'.'
								}
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '1',
					'tests': '1'
				},
				'testsuite': [
					{
						'$': {
							'name': 'FailingGoogleTest',
							'errors': '0',
							'failures': '1',
							'hostname': '',
							'id': '',
							'package': 'FailingGoogleTest',
							'skipped': '0',
							'tests': '1',
							'time': '6.118',
							'timestamp': 'Mon, 20 Apr 2015 21:55:17 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Failing test Google',
									'time': '6.118',
									'assertions': '2'
								},
								'failure': [
									{
										'_': 'Timed out while waiting for element <button[name=btnGFAIL]> to be present for 1000 milliseconds.: Expected \'visible\' but got: \'not found\'\n    at F.WaitForElement.fail (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/_waitForElement.js:192:15)\n    at F.WaitForElementPresent.elementNotFound (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/waitForElementPresent.js:57:15)\n    at Object.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/commands/_waitForElement.js:209:17)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:276:20)\n    at HttpRequest.EventEmitter.emit (events.js:98:17)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:323:15)\n    at HttpRequest.EventEmitter.emit (events.js:106:17)\n    at IncomingMessage.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/http/request.js:150:16)\n    at IncomingMessage.EventEmitter.emit (events.js:117:20)\n    at _stream_readable.js:920:16',
										'$': {
											'message': 'Timed out while waiting for element <button[name=btnGFAIL]> to be present for 1000 milliseconds.'
										}
									}
								],
								'system-out': [
									'[[ATTACHMENT|/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-175522-GMT-0400.png]][[ATTACHMENT|/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-175523-GMT-0400.png]]'
								]
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '1',
					'tests': '2'
				},
				'testsuite': [
					{
						'$': {
							'name': 'FailingMultiStepTest',
							'errors': '0',
							'failures': '1',
							'hostname': '',
							'id': '',
							'package': 'FailingMultiStepTest',
							'skipped': '0',
							'tests': '2',
							'time': '3.461',
							'timestamp': 'Mon, 20 Apr 2015 21:55:23 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Error Multistep Test',
									'time': '3.460',
									'assertions': '2'
								}
							},
							{
								'$': {
									'name': 'error Multistep Test Part 2',
									'time': '0.001000',
									'assertions': '0'
								}
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '0',
					'tests': '1'
				},
				'testsuite': [
					{
						'$': {
							'name': 'GoogleTest',
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'package': 'GoogleTest',
							'skipped': '0',
							'tests': '1',
							'time': '5.688',
							'timestamp': 'Mon, 20 Apr 2015 21:55:27 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Demo test Google',
									'time': '5.688',
									'assertions': '3'
								}
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '1',
					'tests': '2'
				},
				'testsuite': [
					{
						'$': {
							'name': 'MultiStepGoogleTest',
							'errors': '0',
							'failures': '1',
							'hostname': '',
							'id': '',
							'package': 'MultiStepGoogleTest',
							'skipped': '0',
							'tests': '2',
							'time': '5.249',
							'timestamp': 'Mon, 20 Apr 2015 21:55:32 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Multistep Test',
									'time': '3.536',
									'assertions': '2'
								}
							},
							{
								'$': {
									'name': 'Multistep Test Part 2',
									'time': '1.713',
									'assertions': '1'
								},
								'failure': [
									{
										'_': 'Testing if element <#main> contains text: \'The Night Watch\'.: Expected \'The Night Watch\' but got: \'\'\n    at Object.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/core/assertion.js:88:19)\n    at Object.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/api/element-commands.js:351:24)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:276:20)\n    at HttpRequest.EventEmitter.emit (events.js:98:17)\n    at HttpRequest.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/index.js:299:15)\n    at HttpRequest.EventEmitter.emit (events.js:106:17)\n    at IncomingMessage.<anonymous> (/Users/userOne/code/nightwatch/nightwatch-tests/node_modules/nightwatch/lib/http/request.js:148:16)\n    at IncomingMessage.EventEmitter.emit (events.js:117:20)\n    at _stream_readable.js:920:16\n    at process._tickCallback (node.js:415:13)',
										'$': {
											'message': 'Testing if element <#main> contains text: \'The Night Watch\'.'
										}
									}
								]
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '0',
					'tests': '3'
				},
				'testsuite': [
					{
						'$': {
							'name': 'SkippedTest',
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'package': 'SkippedTest',
							'skipped': '3',
							'tests': '3',
							'time': '0.000',
							'timestamp': 'Mon, 20 Apr 2015 21:55:49 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Skipped Test Part 1'
								},
								'skipped': [
									''
								]
							},
							{
								'$': {
									'name': 'Skipped Test Part 2'
								},
								'skipped': [
									''
								]
							},
							{
								'$': {
									'name': 'Skipped Test Part 3'
								},
								'skipped': [
									''
								]
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'name': 'GoogleTest',
					'errors': '0',
					'failures': '0',
					'tests': '3'
				},
				'testsuite': [
					{
						'$': {
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'name': 'Demo test Google',
							'package': 'GoogleTest',
							'skipped': '0',
							'tests': '3',
							'time': '',
							'timestamp': ''
						},
						'testcase': [
							{
								'$': {
									'name': 'Element <body> was visible after 162 milliseconds.'
								}
							},
							{
								'$': {
									'name': 'Element <button[name=btnG]> was visible after 23 milliseconds.'
								}
							},
							{
								'$': {
									'name': 'Testing if element <#main> contains text: \'The Night Watch\'.'
								}
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '0',
					'tests': '1'
				},
				'testsuite': [
					{
						'$': {
							'name': 'GroupsAreFunTest',
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'package': 'GroupsAreFunTest',
							'skipped': '0',
							'tests': '1',
							'time': '5.678',
							'timestamp': 'Mon, 20 Apr 2015 21:55:38 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Grouped Test Group 1',
									'time': '5.678',
									'assertions': '3'
								}
							}
						]
					}
				]
			}
		},
		{
			'testsuites': {
				'$': {
					'errors': '0',
					'failures': '0',
					'tests': '1'
				},
				'testsuite': [
					{
						'$': {
							'name': 'GroupsAreStillFunTest',
							'errors': '0',
							'failures': '0',
							'hostname': '',
							'id': '',
							'package': 'GroupsAreStillFunTest',
							'skipped': '0',
							'tests': '1',
							'time': '5.552',
							'timestamp': 'Mon, 20 Apr 2015 21:55:44 GMT'
						},
						'testcase': [
							{
								'$': {
									'name': 'Grouped Test Group 2',
									'time': '5.552',
									'assertions': '3'
								}
							}
						]
					}
				]
			}
		}
	]
};
