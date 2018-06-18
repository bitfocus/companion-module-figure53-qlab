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
	var cmd

	switch (action.action) {

		case 'start':
			cmd = '/cue/'+ action.options.cue + '/start';
			break;

		case 'go':
			cmd = '/go';
			break;

		case 'pause':
			cmd = '/pause';
			break;

		case 'stop':
			cmd = '/stop';
			break;

		case 'panic':
			cmd = '/panic';
			break;

		case 'reset':
			cmd = '/reset';
			break;

		case 'previous':
			cmd = '/playhead/previous';
			break;

		case 'next':
			cmd = '/playhead/next';
			break;

		case 'resume':
			cmd = '/resume';
			break;

	};
	if (cmd !== undefined) {
		debug('sending',cmd,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, 53000, cmd, [])
	}
};

instance.module_info = {
	label: 'Qlab',
	id: 'qlab',
	version: '0.0.2'
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
