import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';

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

Video.propTypes = {
	className: PropTypes.any,
};

export default function Video({ className }) {
	const [file, setFile] = React.useState();
	const classes = useStyles();

	const onFilesSelected = e => {
		const [file] = e.target.files;
		console.log(file);
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
					<Button variant="contained" color="primary" component="span" className={''} onChange={onFilesSelected}>
						Select Video
  				</Button>
				</label>
			</div>
		);
	}

	return (
		<div>
			<div>Video Player will be here</div>
			<Button color="secondary" component="span" className={''}>
				Generate Captions
			</Button>
		</div>
	);
}
