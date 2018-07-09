var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;
	// super-constructor
	instance_skel.apply(this, arguments);
	self.actions(); // export actions
	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK); // report status ok!
	debug = self.debug;
	log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
		type: 'text',
		id: 'info',
		width: 12,
		label: 'Information',
		value: 'This module controls Qlab by <a href="https://figure53.com/" target="_new">Figure 53</a>.'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			tooltip: 'The IP of the computer running QLab',
			regex: self.REGEX_IP
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug("destory", self.id);;
};

instance.prototype.continueMode = [
	{ label: 'Do Not Continue',         id: '0' },
	{ label: 'Auto Continue',           id: '1' },
	{ label: 'Auto Follow',             id: '2' }
];

instance.prototype.colorName = [
	{ label: 'None',                    id: 'none' },
	{ label: 'Red',                     id: 'red' },
	{ label: 'Yellow',                  id: 'yellow' },
	{ label: 'Green',                   id: 'green' },
	{ label: 'Blue',                    id: 'blue' },
	{ label: 'Purple',                  id: 'purple' }
];


instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {
		'start':	{
			label: 'Start (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: "1"
				}
			]
		},
		'prewait_dec':	{
			label: 'Decrease Prewait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'prewait_inc':	{
			label: 'Increase Prewait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'postwait_dec':	{
			label: 'Decrease Postwait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'postwait_inc':	{
			label: 'Increase Postwait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'duration_dec':	{
			label: 'Decrease Duration',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'duration_inc':	{
			label: 'Increase Duration',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					default: "1"
				}
			]
		},
		'continue':	{
			label: 'Set Continue Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Continue Mode',
					id: 'contId',
					choices: self.continueMode
				}
			]
		},
		'arm':	{
			label: 'Arm/Disarm Cue',
			options: [
				{
					type: 'dropdown',
					label: 'Arm/Disarm',
					id: 'armId',
					choices: [ { id: '0', label: 'Disarm' }, { id: '1', label: 'Arm' } ]
				}
			]
		},
		'autoload':	{
			label: 'Enable/Disable Cue Autoload ',
			options: [
				{
					type: 'dropdown',
					label: 'Autoload',
					id: 'autoId',
					choices: [ { id: '0', label: 'Disable' }, { id: '1', label: 'Enable' } ]
				}
			]
		},
		'cueColor':	{
			label: 'Set Selected Cue Color',
			options: [
				{
					type: 'dropdown',
					label: 'Color',
					id: 'colorId',
					choices: self.colorName
				}
			]
		},




		'go':       { label: 'GO' },
		'pause':    { label: 'Pause' },
		'stop':     { label: 'Stop' },
		'panic':    { label: 'Panic' },
		'reset':    { label: 'Reset' },
		'previous': { label: 'Previous Cue' },
		'next':     { label: 'Next Cue' },
		'resume':   { label: 'Resume' }
	});
}

instance.prototype.action = function(action) {
	var self = this;
	var id = action.action;
	var opt = action.options;
	var cmd

	switch (action.action) {

		case 'start':
			arg = null
			cmd = '/cue/'+ opt.cue + '/start';
			break;

		case 'go':
			arg = null
			cmd = '/go';
			break;

		case 'pause':
			arg = null
			cmd = '/pause';
			break;

		case 'stop':
			arg = null
			cmd = '/stop';
			break;

		case 'panic':
			arg = null
			cmd = '/panic';
			break;

		case 'reset':
			arg = null
			cmd = '/reset';
			break;

		case 'previous':
			arg = null
			cmd = '/playhead/previous';
			break;

		case 'next':
			arg = null
			cmd = '/playhead/next';
			break;

		case 'resume':
			arg = null
			cmd = '/resume';
			break;

		case 'prewait_dec':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
			}
			cmd = '/cue/selected/preWait/-';
			break;

		case 'prewait_inc':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
				}
			cmd = '/cue/selected/preWait/+';
			break;

		case 'postwait_dec':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
			}
			cmd = '/cue/selected/postWait/-';
			break;

		case 'postwait_inc':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
			}
			cmd = '/cue/selected/postWait/+';
			break;

		case 'duration_dec':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
			}
			cmd = '/cue/selected/duration/-';
			break;

		case 'duration_inc':
			var arg = {
				type: "i",
				value: parseInt(opt.time)
			}
			cmd = '/cue/selected/duration/+';
			break;

		case 'continue':
			var arg = {
				type: "i",
				value: parseInt(opt.contId)
			}
			cmd = '/cue/selected/continueMode';
			break;

		case 'arm':
			var arg = {
				type: "i",
				value: parseInt(opt.armId)
			}
			cmd = '/cue/selected/armed';
			break;

		case 'autoload':
			var arg = {
				type: "i",
				value: parseInt(opt.autoId)
			}
			cmd = '/cue/selected/autoLoad';
			break;

		case 'cueColor':
			var arg = {
				type: "s",
				value: "" + opt.colorId
			}
			cmd = '/cue/selected/colorName';
			break;



	};
	if (cmd !== undefined && arg !== null)  {
		debug('sending',cmd,arg,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, 53000, cmd, [arg])
	}
	else if (cmd !== undefined && arg == null)  {
		debug('sending',cmd,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, 53000, cmd, [])
	}
};

instance.module_info = {
	label: 'Qlab',
	id: 'qlab',
	version: '0.0.3'
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
