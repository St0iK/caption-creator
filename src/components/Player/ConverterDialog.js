import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { styled } from '@material-ui/styles';
import UploadProgress, {
	UPLOAD_STATE_COMPLETED,
	UPLOAD_STATE_EXTRACTING,
	UPLOAD_STATE_PROCESSING
} from './UploadProgress';
import Button from '@material-ui/core/Button';

const Title = styled(DialogTitle)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export default function CueExtractionDialog({ uploadState }) {
	console.log({ uploadState });
	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			open={true}
			aria-labelledby="extract-dialog-title">
			<Title id="extract-dialog-title" disableTypography>
				<Typography variant="h6">Extract cues from video</Typography>
				<IconButton aria-label="Close" edge="end">
					<CloseIcon />
				</IconButton>
			</Title>
			<DialogContent>
				<UploadProgress uploadState={uploadState} />
			</DialogContent>
			<DialogActions>
				<Button name="Extract Cues Cancel" color="primary">
					Cancel
				</Button>
				<Button
					name="Extract Cues Confirm"
					color="primary"
					variant="contained">
					Get Video Captions
				</Button>
			</DialogActions>
		</Dialog>
	);
}
