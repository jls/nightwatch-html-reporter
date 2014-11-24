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
nightwatch-html-reporter -d ~/myProject/tests/nightwatch/reports
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
	themeName: 'default',

	/* If true then only errors will be shown in the report. */
	hideSuccess: false
}
```

### CLI usage

```bash
nightwatch-html-reporter -d <reports-directory> [--theme (default:'default')] [--output (default:generatedReport.html)]
```

```
Options:
  -d, --report-dir  Directory where nightwatch reports are stored.                  [required]
  -t, --theme       Name of theme to use.  Should match a directory in lib/themes.  [default: "default"]
  -o, --output      Filename to use when saving the generated report.               [default: "generatedReport.html"]
  -b, --browser     If true then generated report will be opened in the browser.    [default: true]
  -c, --compact     Hides success cases and only shows error cases.
```

## Example Report
An example of the HTML report generated using the 'default' theme.

![ScreenShot](https://raw.githubusercontent.com/jls/nightwatch-html-reporter/screenshots/screenshots/screen1.png)

An example of the HTML report generated using the 'compact' theme.
![ScreenShot](https://raw.githubusercontent.com/jls/nightwatch-html-reporter/screenshots/screenshots/screen2.png)


## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 James Smith
Licensed under the MIT license.
