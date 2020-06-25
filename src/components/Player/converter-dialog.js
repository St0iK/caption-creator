import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { styled } from '@material-ui/styles';
import UploadProgress, {
	UPLOAD_STATE_COMPLETED,
	UPLOAD_STATE_EXTRACTING,
	UPLOAD_STATE_PROCESSING,
	UPLOAD_STATE_UPLOADING,
	UPLOAD_STATE_FAILED,
} from './upload-progress.component';
import Button from '@material-ui/core/Button';

const Title = styled(DialogTitle)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

// CueExtractionDialog.propTypes = {
// 	open: PropTypes.bool,
// 	videoFile: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.instanceOf(Blob)]),
// 	onRequestClose: PropTypes.func.isRequired,
// 	onExtractComplete: PropTypes.func.isRequired,
// };

export default function CueExtractionDialog({ open = true, videoFile, onRequestClose, onExtractComplete }) {
	const [converting, setConverting] = React.useState(false);
	const [uploadState, setUploadState] = React.useState();

	const extractCuesFromVideo = async e => {
		// setConverting(true);
		// let filename;

		// try {
		// 	setUploadState(UPLOAD_STATE_EXTRACTING);

		// 	setUploadState(UPLOAD_STATE_UPLOADING);


		// 	setUploadState(UPLOAD_STATE_PROCESSING);

		// 	setUploadState(UPLOAD_STATE_COMPLETED);

		// 	if (results.length) {
		// 		onExtractComplete(results);
		// 		toast.success('Upload successful!');
		// 		onRequestClose(e);
		// 	} else {
		// 		toast.error('Unable to extract any audio!');
		// 	}
		// } catch (err) {
		// 	setUploadState(UPLOAD_STATE_FAILED);
		// }

		// setExtracting(false);


	};

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			open={open}
			aria-labelledby="extract-dialog-title">
			<Title id="extract-dialog-title" disableTypography>
				<Typography variant="h6">Extract cues from video</Typography>
				<IconButton aria-label="Close" edge="end">
					<CloseIcon />
				</IconButton>
			</Title>
			<DialogContent>
				{converting && (
					'yo'
					// <UploadProgress progressBytes={progressBytes} totalBytes={totalBytes} uploadState={uploadState} />
				)}
				{!converting && (
					'hi'
				)}
			</DialogContent>
			<DialogActions>
				<Button name="Extract Cues Cancel" onClick={onRequestClose} color="primary" disabled={converting}>
					Cancel
				</Button>
				<Button
					name="Extract Cues Confirm"
					onClick={extractCuesFromVideo}
					color="primary"
					variant="contained"
					disabled={converting}>
					Get Video Captions
				</Button>
			</DialogActions>
		</Dialog>
	);
}
