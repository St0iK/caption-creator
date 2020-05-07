import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { CuesContext } from "../common/cues-context";

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		width: '100%',
		height: '100%',
		backgroundColor: '#616161',
	},
	scrollContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		height: '100%',
	},
}));

const ZoomContext = React.createContext({ zoomContainerRect: {} });

ZoomContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ZoomContainer({ children }) {
	const classes = useStyles();
	const [pixelsPerSec] = React.useState(200);
	const [zoomContainerRef, setZoomContainerRef] = React.useState();
	const [zoomContainerRect, setZoomContainerRect] = React.useState({});
	const getCueDuration = (cues) => {
		if (cues && cues.length) {
			return cues[cues.length - 1].endTime;
		}
	}

	const { cues } = React.useContext(CuesContext);
	const duration = getCueDuration(cues);

	const width = Number.isFinite(duration) ? Math.round(pixelsPerSec * duration) : '100%';

	React.useLayoutEffect(() => {
		if (zoomContainerRef) {
			setZoomContainerRect(zoomContainerRef.getBoundingClientRect());
		}
	}, [zoomContainerRef, width]);

	// make sure we recalculate the rect after scrolling
	const onMouseUp = () => {
		setZoomContainerRect(zoomContainerRef.getBoundingClientRect());
	};

	const zoomContext = React.useMemo(() => ({ pixelsPerSec, zoomContainerRect }), [pixelsPerSec, zoomContainerRect]);

	return (
		<div className={classes.root}>
			<div
				pixelsPerSec={pixelsPerSec}
				onMouseUp={onMouseUp}
				className={classes.scrollContainer}>
				<div ref={setZoomContainerRef} className={classes.content} style={{ width }}>
					<ZoomContext.Provider value={zoomContext}>{children}</ZoomContext.Provider>
				</div>
			</div>


		</div>
	);
}

export function useZoom() {
	return React.useContext(ZoomContext);
}
