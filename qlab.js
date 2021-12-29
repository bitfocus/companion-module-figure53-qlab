var instance_skel = require('../../instance_skel');
var debug;
// eslint-disable-next-line no-unused-vars
var log;

// eslint-disable-next-line no-unused-vars
function instance(system, id, config) {
	var self = this;
	// super-constructor
	instance_skel.apply(this, arguments);
	self.actions();
	self.init_presets();

	return self;
}

instance.GetUpgradeScripts = function() {
	return [
		function (context, config, actions, feedbacks) {
			var changed = false;

			for (var k in actions) {
				var action = actions[k];

				// some prior button actions were created
				// from a preset with a case typo
				if (action.action == "autoLoad") {
					if (action.options.autoId == 1) {
						action.action = "autoload";
						changed = true;
					}
				}

			}

			return changed;
		}
	]
}

instance.prototype.updateConfig = function (config) {
	var self = this;
	self.init_presets();
	self.config = config;
};

instance.prototype.init = function () {
	var self = this;
	self.status(self.STATE_OK); // report status ok!
	self.init_presets();
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
			value: 'This module controls <a href="https://qlab.app/" target="_blank" rel="noopener noreferrer">QLab</a> by <a href="https://figure53.com/" target="_blank" rel="noopener noreferrer">Figure 53</a>.'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			tooltip: 'The IP of the computer running QLab',
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'passcode',
			label: 'OSC Passcode',
			width: 12,
			tooltip: 'The passcode for controlling QLab, leave blank if not set any'
		},
		{
			type: 'textinput',
			id: 'workspace',
			label: 'Workspace',
			width: 12,
			tooltip: 'Enter the name or ID for the workspace, or use default for the front Workspace',
			default: 'default'
		}
	];
};

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [

		{
			category: 'CueList',
			label: 'Pause / Resume',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_PAUSE_INACTIVE,
				pngalignment: 'center:center',
				size: '18',
				color: self.rgb(255,255,255),
				bgcolor: self.rgb(0, 0, 0),

			},
			actions: [
				{
					action: 'pause',
				}
			]
		},
		{
			category: 'CueList',
			label: 'GO',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_PLAY_INACTIVE,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'go',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Resume',
			bank: {
				style: 'text',
				text: 'Resume',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 0)
			},
			actions: [
				{
					action: 'resume',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Stop',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_STOP_INACTIVE,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Panic',
			bank: {
				style: 'text',
				text: 'Panic',
				size: '24',
				color: '16777215',
				bgcolor: self.rgb(255, 0, 0)
			},
			actions: [
				{
					action: 'panic',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Reset',
			bank: {
				style: 'text',
				text: 'Reset',
				size: '24',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'reset',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Preview',
			bank: {
				style: 'text',
				text: 'Preview',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 128, 0)
			},
			actions: [
				{
					action: 'preview',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Previous Cue',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_REW_INACTIVE,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'previous',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Next Cue',
			bank: {
				style: 'png',
				text: '',
				png64: self.ICON_FWD_INACTIVE,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
			},
			actions: [
				{
					action: 'next',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Load Cue',
			bank: {
				style: 'text',
				text: 'Load\\nCue',
				size: '24',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'load',
				}
			]
		},
		{
			category: 'Edit',
			label: 'PreWait Dec 1 sec',
			bank: {
				style: 'text',
				text: 'PreWait\\nDecrease\\n1 sec',
				size: '14',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'prewait_dec',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PreWait Dec 10 sec',
			bank: {
				style: 'text',
				text: 'PreWait\\nDecrease\\n10 sec',
				size: '14',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'prewait_dec',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PreWait inc 10 sec',
			bank: {
				style: 'text',
				text: 'PreWait\\nIncrease\\n10 sec',
				size: '14',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'prewait_inc',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PreWait inc 1sec',
			bank: {
				style: 'text',
				text: 'PreWait\\nIncrease\\n1 sec',
				size: '14',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'prewait_inc',
					options: {
						time: '1',
					}
				}
			]
		},

		{
			category: 'Edit',
			label: 'PostWait Dec 1 sec ',
			bank: {
				style: 'text',
				text: 'PostWait\\nDecrease\\n1 sec',
				size: '14',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'postwait_dec',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PostWait Dec 10 Sec',
			bank: {
				style: 'text',
				text: 'PostWait\\nDecrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'postwait_dec',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PostWait Inc 10 Sec',
			bank: {
				style: 'text',
				text: 'PostWait\\nIncrease\\n10sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'postwait_inc',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'PostWait Inc 1 Sec',
			bank: {
				style: 'text',
				text: 'PostWait\\nIncrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'postwait_inc',
					options: {
						time: '1',
					}
				}
			]
		},

		{
			category: 'Edit',
			label: 'Duration Dec 1 sec',
			bank: {
				style: 'text',
				text: 'Duration\\nDecrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'duration_dec',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Duration Dec 10sec',
			bank: {
				style: 'text',
				text: 'Duration\\nDecrease\\n10sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'duration_dec',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Duration inc 10sec',
			bank: {
				style: 'text',
				text: 'Duration\\nIncrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'duration_inc',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Duration Inc 1sec',
			bank: {
				style: 'text',
				text: 'Duration\\nIncrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'duration_inc',
					options: {
						time: '1',
					}
				}
			]
		},

		{
			category: 'Edit',
			label: 'Start Time Dec 1 sec',
			bank: {
				style: 'text',
				text: 'Start Time\\nDecrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'startTime_dec',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Start Time Dec 10 sec',
			bank: {
				style: 'text',
				text: 'Start Time\\nDecrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'startTime_dec',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Start Time Inc 1 sec',
			bank: {
				style: 'text',
				text: 'Start Time\\nIncrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'startTime_inc',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Start Time Inc 10 sec',
			bank: {
				style: 'text',
				text: 'Start Time\\nIncrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'startTime_inc',
					options: {
						time: '10',
					}
				}
			]
		},

		{
			category: 'Edit',
			label: 'End Time Dec 1 sec',
			bank: {
				style: 'text',
				text: 'End Time\\nDecrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'endTime_dec',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'End Time Dec 10 sec',
			bank: {
				style: 'text',
				text: 'End Time\\nDecrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'endTime_dec',
					options: {
						time: '10',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'End Time Inc 1 sec',
			bank: {
				style: 'text',
				text: 'End Time\\nIncrease\\n1 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'endTime_inc',
					options: {
						time: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'End Time Inc 10 sec',
			bank: {
				style: 'text',
				text: 'End Time\\nIncrease\\n10 sec',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'endTime_inc',
					options: {
						time: '10',
					}
				}
			]
		},

		{
			category: 'Edit',
			label: 'Continue Mode DNC',
			bank: {
				style: 'text',
				text: 'Do Not Continue',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'continue',
					options: {
						contId: '0',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Continue mode Auto continue',
			bank: {
				style: 'text',
				text: 'Auto Continue',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'continue',
					options: {
						contId: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Continue mode Auto Follow',
			bank: {
				style: 'text',
				text: 'Auto Follow',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'continue',
					options: {
						contId: '2',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Disarm',
			bank: {
				style: 'text',
				text: 'Disarm',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'arm',
					options: {
						armId: '0',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Arm',
			bank: {
				style: 'text',
				text: 'Arm',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'arm',
					options: {
						armId: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Autoload Enable',
			bank: {
				style: 'text',
				text: 'Autoload Enable',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'autoload',
					options: {
						autoId: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Autoload Disable',
			bank: {
				style: 'text',
				text: 'Autoload Disable',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'autoload',
					options: {
						autoId: '0',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Flagged',
			bank: {
				style: 'text',
				text: 'Flagged',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'flagged',
					options: {
						flaggId: '1',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Unflagged',
			bank: {
				style: 'text',
				text: 'Unflagged',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'flagged',
					options: {
						flaggId: '0',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'none',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(255, 0, 0)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'red',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(200, 200, 0)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'yellow',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 200, 0)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'green',
					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 255)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'blue',

					}
				}
			]
		},
		{
			category: 'Edit',
			label: 'Cue Colour',
			bank: {
				style: 'text',
				text: 'Cue Colour',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(255, 0, 255)
			},
			actions: [
				{
					action: 'cueColor',
					options: {
						colorId: 'purple',
					}
				}
			]
		},
	];

	self.setPresetDefinitions(presets);
};

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this;
	debug("destroy", self.id);
};

instance.prototype.continueMode = [
	{ label: 'Do Not Continue', id: '0' },
	{ label: 'Auto Continue', id: '1' },
	{ label: 'Auto Follow', id: '2' }
];

instance.prototype.colorName = [
	{ label: 'None', id: 'none' },
	{ label: 'Red', id: 'red' },
	{ label: 'Yellow', id: 'yellow' },
	{ label: 'Green', id: 'green' },
	{ label: 'Blue', id: 'blue' },
	{ label: 'Purple', id: 'purple' }
];


// eslint-disable-next-line no-unused-vars
instance.prototype.actions = function (system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {
		'start': {
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
		'prewait_dec': {
			label: 'Decrease Prewait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'prewait_inc': {
			label: 'Increase Prewait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'postwait_dec': {
			label: 'Decrease Postwait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'postwait_inc': {
			label: 'Increase Postwait',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'duration_dec': {
			label: 'Decrease Duration',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'duration_inc': {
			label: 'Increase Duration',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'startTime_dec': {
			label: 'Decrease Start Time',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'startTime_inc': {
			label: 'Increase Start Time',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'endTime_dec': {
			label: 'Decrease End Time',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'endTime_inc': {
			label: 'Increase End Time',
			options: [
				{
					type: 'textinput',
					label: 'Time in seconds',
					id: 'time',
					regex: self.REGEX_FLOAT,
					default: "1"
				}
			]
		},
		'continue': {
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
		'arm': {
			label: 'Arm/Disarm Cue',
			options: [
				{
					type: 'dropdown',
					label: 'Arm/Disarm',
					id: 'armId',
					choices: [{ id: '0', label: 'Disarm' }, { id: '1', label: 'Arm' }]
				}
			]
		},
		'autoload': {
			label: 'Enable/Disable Cue Autoload ',
			options: [
				{
					type: 'dropdown',
					label: 'Autoload',
					id: 'autoId',
					choices: [{ id: '0', label: 'Disable' }, { id: '1', label: 'Enable' }]
				}
			]
		},
		'flagged': {
			label: 'Flagged/Unflagged Cue',
			options: [
				{
					type: 'dropdown',
					label: 'Flagged',
					id: 'flaggId',
					choices: [{ id: '0', label: 'Disable' }, { id: '1', label: 'Enable' }]
				}
			]
		},
		'cueColor': {
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




		'go': { label: 'GO' },
		'pause': { label: 'Pause' },
		'stop': { label: 'Stop' },
		'panic': { label: 'Panic' },
		'reset': { label: 'Reset' },
		'previous': { label: 'Previous Cue' },
		'next': { label: 'Next Cue' },
		'resume': { label: 'Resume' },
		'load': { label: 'Load Cue' },
		'preview': { label: 'Preview' }
	});
};

instance.prototype.action = function (action) {
	var self = this;
	var opt = action.options;
	var cmd;
	var arg;
	var workspace = '/workspace/' + self.config.workspace;
	var passcode = {
		type: "s", value: self.config.passcode || ""
	};
	var optTime;
	var typeTime;

	// if this is a +/- time action, preformat seconds arg
	if (opt != undefined && opt.time != undefined) {
		optTime = parseFloat(opt.time);
		if (optTime.isInteger) {
			typeTime = 'i';
		} else {
			typeTime = 'f';
		}
	}

	switch (action.action) {

		case 'start':
			arg = null;
			cmd = '/cue/' + opt.cue + '/start';
			break;

		case 'go':
			arg = null;
			cmd = '/go';
			break;

		case 'preview':
			arg = null;
			cmd = '/cue/selected/preview';
			break;

		case 'pause':
			arg = null;
			cmd = '/pause';
			break;

		case 'stop':
			arg = null;
			cmd = '/stop';
			break;

		case 'panic':
			arg = null;
			cmd = '/panic';
			break;

		case 'reset':
			arg = null;
			cmd = '/reset';
			break;

		case 'previous':
			arg = null;
			cmd = '/playhead/previous';
			break;

		case 'next':
			arg = null;
			cmd = '/playhead/next';
			break;

		case 'resume':
			arg = null;
			cmd = '/resume';
			break;

		case 'load':
			arg = null;
			cmd = '/cue/selected/load';
			break;

		case 'prewait_dec':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/preWait/-';
			break;

		case 'prewait_inc':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/preWait/+';
			break;

		case 'postwait_dec':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/postWait/-';
			break;

		case 'postwait_inc':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/postWait/+';
			break;

		case 'duration_dec':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/duration/-';
			break;

		case 'duration_inc':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/duration/+';
			break;
		
		case 'startTime_inc':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/startTime/+';
			break;
			
		case 'startTime_dec':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/startTime/-';
			break;

		case 'endTime_inc':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/endTime/+';
			break;

		case 'endTime_dec':
			arg = {
				type: typeTime,
				value: optTime
			};
			cmd = '/cue/selected/endTime/-';
			break;

		case 'continue':
			arg = {
				type: "i",
				value: parseInt(opt.contId)
			};
			cmd = '/cue/selected/continueMode';
			break;

		case 'arm':
			arg = {
				type: "i",
				value: parseInt(opt.armId)
			};
			cmd = '/cue/selected/armed';
			break;

		case 'autoload':
			arg = {
				type: "i",
				value: parseInt(opt.autoId)
			};
			cmd = '/cue/selected/autoLoad';
			break;

		case 'flagged':
			arg = {
				type: "i",
				value: parseInt(opt.flaggId)
			};
			cmd = '/cue/selected/flagged';
			break;

		case 'cueColor':
			arg = {
				type: "s",
				value: "" + opt.colorId
			};
			cmd = '/cue/selected/colorName';
			break;

	}

	var ws = "";
	if (self.config.workspace !== undefined && self.config.workspace !== 'default' && self.config.workspace !== '') {
		ws = workspace;
	}

	if (arg == null) {
		arg = [];
	}

	var host = "";
	if (self.config.host !== undefined && self.config.host !== '') {
		host = self.config.host;
	}

	if (cmd !== undefined) {
		debug('sending', ws + cmd, arg, "to", host, ":53000");
		if (self.config.passcode !== undefined && self.config.passcode !== "") {
			self.system.emit('osc_send', host, 53000, "/connect", [passcode]);
		}
		self.system.emit('osc_send', host, 53000, ws + cmd, arg);
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
