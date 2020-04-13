import * as React from "react";
import sortBy from "lodash.sortby";

export const CuesContext = React.createContext({
  cues: [],
  onAddCue: () => {},
  onRemoveCue: () => {},
  // onChangeCue takes three args, the new cue, the index of the cue, and a boolean to indicate whether startTime was changed
  onChangeCue: () => {},
  onChangeCues: () => {},
  onLoadingCues: () => {},
});

export function CuesProvider({ children }) {
  const [cues, setCues] = React.useState([]);
  const [loading, onLoadingCues] = React.useState(true);

  const onChangeCues = React.useCallback((newCues, reorder) => {
    console.log("onChangeCues");
    console.log(newCues);
    console.log(newCues);

    const orderedCues = reorder ? sortBy(newCues, ["startTime"]) : newCues;
    console.log(orderedCues);
    setCues(orderedCues);
  }, []);

  return (
    <CuesContext.Provider
      value={{
        cues,
        loading,
        onAddCue: () => {
          if (cues.length) {
            const lastCue = cues[cues.length - 1];
            return onChangeCues(
              cues.concat(new VTTCue(lastCue.endTime, lastCue.endTime + 2, ""))
            );
          }
          return onChangeCues([new VTTCue(0, 2, "")]);
        },
        onRemoveCue: (i) => {
          const newCues = cues.slice();
          newCues.splice(i, 1);
          return onChangeCues(newCues);
        },
        // onChangeCue args (cue, i, reorder)
        onChangeCue: (cue, i, reorder) => {
          console.log("onChangeCue");
          const newCues = cues.slice();
          newCues[i] = cue;
          onChangeCues(newCues, reorder);
        },
        // onChangeCues args (cue, reorder)
        onChangeCues,
        onLoadingCues,
      }}
    >
      {children}
    </CuesContext.Provider>
  );
}
