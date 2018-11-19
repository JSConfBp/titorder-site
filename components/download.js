import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
	  marginTop: theme.spacing.unit * 5,
  },
  input: {
	  display: 'none'
  }
});

class Download extends React.Component {
	state = {
	  name: 'Composed TextField',
	};
  
	onClick = event => {

		const fileName = 'normalized.csv'
		const blob = new Blob([this.props.content], { type: 'text/csv;charset=utf-8;' });

		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, fileName);
		} else {
			var link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", fileName);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}

		this.props.onDownload()
	};

	render() {
	  const { classes } = this.props;

	  return (
		<div className={classes.container}>
			<label htmlFor="raised-button-file">
				<Button variant={'contained'} component="span" color="primary" className={classes.button} onClick={this.onClick}>
					<a>Download</a>
				</Button>
			</label>
		</div>
		);
	}
  }

  export default withStyles(styles)(Download);