**Qlab**

What does QLab do?
QLab makes it simple to create intricate designs of light, sound, and video, which you play back during a live performance.
QLab allows you to lock in exactly how you want the light, sound, and video to play during your performance. When you’re done designing, you'll switch to “show mode” and run your show just by pressing “GO”.

go over to [figure 53](https://figure53.com/)and checkout the software.

We currently support the following functions.

Qlab command| what i does.
------------ | -------------
Go| Tell the current cue list of the given workspace to GO.
Pause| Pause all currently running cues in the workspace.
Resume| Un-pause all paused cues in the workspace.
Stop| Stop playback but allow effects to continue rendering. e.g., playback stops, but reverbs decay naturally.
Panic| Tell the workspace to panic. A panic is a brief gradual fade out leading into a hard stop. A double panic will trigger an immediate hard stop.
Reset| Reset the workspace. Resetting stops all cues, returns the playhead to the top of the current cue list, and restores any temporary changes made to cues (such as retargeting via a Target cue or adjustments using a "live" OSC method.)
Next| Move the selection down one cue.
Previous| Move the selection up one cue.
Start (cue)| Start the specified cue. If the specified cue is playing, this command has no effect.
