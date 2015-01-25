# A3 Troubleshooting

## Tl;Dr
With the change to AngularJS (or any single page application), much of the business logic for the application is moved into the browser (Javascript). This means much of our troubleshooting moves from the server log, to the browser console. Here are some tips to help.

## Browser Console
**Always** have the browser console open. **ALWAYS**. 9 times out of 10, the issue your having can be tracked down via the logging errors in the console. Oh, and in case I didn't mention it... **ALWAYS HAVE THE BROWSER CONSOLE OPEN**!

- Safari: [console api](https://developer.apple.com/library/mac/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html)

## Browser Plugins
- [ng-inspector](http://ng-inspector.org) - AngularJS inspector pane for Safari & Chrome
- [batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en) - Chrome browser extension
- [Firebug](https://getfirebug.com) - General debugging console plugin for Firefox

### More to come...