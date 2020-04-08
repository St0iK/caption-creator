import * as React from 'react';
import { CuesContext } from "./cues-context";

export const CueContext = React.createContext({
	cue: {},
	onChangeCueStart: () => {},
	onChangeCueEnd: () => {},
	onDeltaCue: () => {},
	onChangeCueText: () => {},
	onRemoveCue: () => {},
});

export function CueProvider({ cue, cueIndex, children }) {
	// get the onChangeCue & onRemoveCue from the CuesContext
	const { onChangeCue, onRemoveCue } =  React.useContext(CuesContext);

	return (
		<CueContext.Provider
			value={{
				cue,
				onChangeCueStart: newStartTime => {
					console.log('Called!');
					const newCue = new VTTCue(newStartTime, cue.endTime, cue.text);
					console.log(newCue);
					onChangeCue(newCue, cueIndex, true);
				},
				onChangeCueEnd: newEndTime => {
					const newCue = new VTTCue(cue.startTime, newEndTime, cue.text);
					onChangeCue(newCue, cueIndex);
				},
				onDeltaCue: ({ startDelta = 0, endDelta = 0 }) => {
					let newStartTime = cue.startTime + startDelta;
					let newEndTime = cue.endTime + endDelta;

					if (newStartTime < 0 && endDelta) {
						newStartTime = 0;
						newEndTime = cue.endTime - cue.startTime;
					} else if (newStartTime < 0) {
						newStartTime = 0;
					}

					const newCue = new VTTCue(newStartTime, newEndTime, cue.text);
					onChangeCue(newCue, cueIndex);
				},
				onChangeCueText: newText => {
					const newCue = new VTTCue(cue.startTime, cue.endTime, newText);
					onChangeCue(newCue, cueIndex);
				},
				onRemoveCue: () => onRemoveCue(cueIndex),
			}}>
			{children}
		</CueContext.Provider>
	);
}