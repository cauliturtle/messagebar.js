# Messagebar.js - showing message to user in fancy way

Messagebar.js will show message on the top of the view of user client's browser by default. It backed by CSS3 for animation slide up/down. Rather than simple `alert()` function, it may be more attractive for UX and interactive.

Messagebar.js has no dependencies, it runs in your vanilia JavaScript code or in any library. 

## Get Started

1. load your javascript to your html file
2. 

		// create an message bar instance
		var msgBar = new MessageBar();

		// initialize it, it will create a message bar dom for later interact.
		msgBar.initialize();

		// show a message with default style
		msgBar.show('Hello World');

## Options

		// How many ms to close the message bar automaticlly
		close_delay:		5000,

		// You can add your own animation css with `mb--messagebar--show` class name or your own class name
		display_class:		'mb--messagebar--show',

		// same as `mb--messagebar--show`, your can add your own animation in your css to disappear the message bar
		disappear_class:	'mb--messagebar--hide',

		// the message bar down default css class
		default_class:		'mb--messagebar',

		// Is your message is HTML? set to true if it does
		is_html:			false

## Customize

By default, messagebar.js has 3 types of messages, `success`, `warning` and `danger`. 

You can add your own in simple way: 

	MessageBar.prototype.your_own_type = function(message){
		this.show(message, {
			// your own options!
		});
	};

## Todo List

	[ ] add dismiss button
	[ ] queue ?
	[ ] add custom events for show, hide, initialized...etc

## License

The MIT License (MIT)

Copyright (c) 2013 cauliturtle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.