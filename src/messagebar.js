(function(global){

// extend 
var extend = function(source, options){
	for(var prop in options){
		source[prop] = options[prop];
	}
	return source;
};

// clone 
var clone = function(obj){
	var tmp = {};
	for(var prop in obj){
		tmp[prop] = obj[prop];
	}
	return tmp;
};

// simple escape function
var escape = function(string){
	var escape_map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;'
	};

	var escape_key = [];

	for(var symbol in escape_map){
		escape_key.push(symbol);
	}

	var escape_regexp = new RegExp('[' + escape_key.join('') + ']', 'g');

	return ('' + string).replace(escape_regexp, function(match){
			return escape_map[match];
		});
};

/**
 * Constructor
 *
 * You can create it with options
 *
 *	var msgBar = new MessageBar({
 *		close_delay:		5000, // close delay ms
 *		display_class:		'mb--messagebar--show', // we will add this class to make it display on user view
 *		disappear_class:	'mb--messagebar--hide', // add this class for disappear animation
 *		default_class:		'mb--messagebar', // default class for the message_dom
 *		is_html:			false, // is HTML message ?
 *	})
 * 
 */
function MessageBar(options){
	
	var default_setting = {
		close_delay:		5000,
		display_class:		'mb--messagebar--show',
		disappear_class:	'mb--messagebar--hide',
		default_class:		'mb--messagebar',
		is_html:			false
	};

	this.setting = extend(default_setting, options);

	// Not a options
	this.is_showing =					false;
	this.message_dom =					null;
	this.initialized =					false;
	this.self_timer =					null;
}

/**
 * create a message dom for this instance
 */
MessageBar.prototype.initialize = function(){
	this.message_dom = document.createElement('div');
	this.message_dom.classList.add(this.setting.default_class);

	var body_dom = document.getElementsByTagName('body')[0];
	body_dom.appendChild(this.message_dom);

	this.initialized = true; 
};

/**
 * The general function for showing message
 * @param  string message
 * @param  mixed options same as the custructor options can be set here
 */
MessageBar.prototype.show = function(message, options){

	if(!this.initialized){
		throw new Error('MessageBar is not initialized');
	}

	// if it is showing, force restore
	if(this.is_showing){
		this.restore();
	}

	this.is_showing = true;

	// does it override local option?
	var local_option = extend(clone(this.setting), options);

	// is HTML ?
	if(local_option.is_html){
		this.message_dom.innerHTML = message;
	}else{
		this.message_dom.innerHTML = escape(message);
	}

	// open and set a disappear class for current state
	if('string' === typeof local_option.display_class){
		local_option.display_class = [local_option.display_class];
	}
	this.message_dom.classList.add.apply(this.message_dom.classList, local_option.display_class);
	this.message_dom.setAttribute('data-mb-disappear-class', local_option.disappear_class);

	this.self_timer = setTimeout(this.close.bind(this), local_option.close_delay);
	
};

/**
 * Close the message bar
 */
MessageBar.prototype.close = function(){

	var disappear_class = this.message_dom.getAttribute('data-mb-disappear-class');

	this.message_dom.addEventListener('transitionend', this.restore.bind(this), true);
	this.message_dom.classList.add(disappear_class);
};

/**
 * restore will be fire whenever it close. It will restore all things to initialize state
 */
MessageBar.prototype.restore = function(){
	this.is_showing = false;
	this.message_dom.innerHTML = '';
	this.message_dom.className = this.setting.default_class;
	this.message_dom.removeAttribute('data-mb-disappear-class');
	this.message_dom.removeEventListener('transitionend.disappear');
	clearTimeout(this.self_timer);
	this.self_timer = null;
};

// Default type of alert
// alert message bar
MessageBar.prototype.alert = function(message){
	this.show(message, {
		display_class: ['mb--messagebar--show','mb--messagebar--alert']
	});
};

// success message bar
MessageBar.prototype.success = function(message){
	this.show(message, {
		display_class: ['mb--messagebar--show','mb--messagebar--success']
	});
};

// warning message bar
MessageBar.prototype.warning = function(message){
	this.show(message, {
		display_class: ['mb--messagebar--show','mb--messagebar--warning']
	});
};

// exports to global
this.MessageBar = MessageBar;

}).call(this);