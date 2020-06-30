import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { getCuesFromWords } from '../../services/VttGenerator';
import { useDispatch } from "react-redux";
import { onChangeCues } from "../../store/actions/cueActions";
import UploadProgress, {
	UPLOAD_STATE_COMPLETED,
	UPLOAD_STATE_EXTRACTING,
	UPLOAD_STATE_PROCESSING,
	UPLOAD_STATE_UPLOADING,
	UPLOAD_STATE_FAILED,
} from './upload-progress.component';
import CueExtractionDialog from './converter-dialog';

const useStyles = makeStyles({
	loaderRoot: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
});

VideoPlayer.propTypes = {
	className: PropTypes.any,
};

export default function VideoPlayer({ className, videoTrack, width, height }) {
	const dispatch = useDispatch();
	const [file, setFile] = React.useState();
	const [src, setSrc] = React.useState();
	const [converting, setConverting] = React.useState(false);
	const [uploadState, setUploadState] = React.useState('');
	const classes = useStyles();

	const onFilesSelected = e => {
		const [file] = e.target.files;
		setFile(file);
		if (src) {
			URL.revokeObjectURL(src);
		}
		const localUrl = URL.createObjectURL(file);
		setSrc(localUrl);
	};

	const onGenerateCaptions = async (e) => {
		setConverting(true);
		const formData = new FormData()
		formData.append('file', file)
		setUploadState(UPLOAD_STATE_EXTRACTING);
		const res = await axios.post('http://localhost:5000/api/upload/video', formData);
		const { operationId } = res.data;

		const intervalId = setInterval(async () => {
			const resp = await fetch(`http://localhost:5000/api/operation/poll/${operationId}`);
			if (resp.ok) {
				const job = await resp.json();
				console.log({ job });
				setUploadState(UPLOAD_STATE_EXTRACTING);
				if (job.done) {
					clearInterval(intervalId);
					const cues = getCuesFromWords(job.result.words);
					dispatch(onChangeCues(cues))
					setUploadState(UPLOAD_STATE_COMPLETED);
					setConverting(false)
				}
			} else {
				clearInterval(intervalId);
			}
		}, 2000);

		setTimeout(() => {
			clearInterval(intervalId);
		}, 200000);

	};

	if (!file) {
		return (

			<div className={classes.loaderRoot}>

				<input
					className={''}
					style={{ display: 'none' }}
					id="raised-button-file"
					multiple
					type="file"
					onChange={onFilesSelected}
				/>
				<label htmlFor="raised-button-file">
					<Button variant="contained" color="primary" component="span" className={''}>
						Select Video
  				</Button>
				</label>
			</div>
		);
	}

	return (
		<div>
			<video
				controls
				src={src}
				width={width || 200}
				height={height || 200}

			>
			</video>
			<Button color="secondary" component="span" className={''} onClick={onGenerateCaptions}>
				Generate Captions
			</Button>

			{converting && <CueExtractionDialog uploadState={uploadState} />}

		</div>
	);
}
