# nightwatch-html-reporter

Generates an HTML view of the Nightwatchjs test reports.

## Getting Started
Install the module with: `npm install -g nightwatch-html-reporter`

### Using the reporter with the built in Nightwatch reporter
This requires Nightwatch >= 0.5.32.

```javascript
/* In nightwatch/globals.js */
var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
	openBrowser: true,
	reportsDirectory: __dirname + '/reports'
});
module.exports = {
	reporter: reporter.fn
};
```

### Using the reporter from the command line

```bash
nightwatch-html-reporter ~/myProject/tests/nightwatch/reports
```

## Documentation

### Options when using built in Nightwatch reporter

```javascript
{
	/* True or False.  If true the generated html will be opened
		in your browser after the test run. */
	openBrowser: true,

	/* The directory you've set nightwatch to store your reports.
		On the CLI this determines where we read reports from, but on this
		interface it determines where the generated report will be saved. */
	reportsDirectory: __dirname + '/reports',

	/* The filename that the html report will be saved as. */
	reportFilename: 'generatedReport.html',

	/* The theme that will be used to generate the html report.
		This should match a directory under the lib/themes directory. */
	themeName: 'default'
}
```

### CLI usage

```bash
nightwatch-html-reporter <reports-directory> <theme-name(default:'default')> <report-filename(default:generatedReport.html)>
```

## Example Report
An example of the HTML report generated

![ScreenShot](https://raw.githubusercontent.com/jls/nightwatch-html-reporter/screenshots/screenshots/screen1.png)


## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 James Smith
Licensed under the MIT license.
