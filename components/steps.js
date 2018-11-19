import React from 'react';
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import Form from './form'
import Download from './download'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    margin: '0 auto',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Choose the CSV expsort', 'Upload & process', 'Download'];
}


class HorizontalLinearStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    activeStep: 0,
	skipped: new Set(),
	error: false,
	file: ''
  };

  handleNext = () => {
    const { activeStep } = this.state;

    this.setState({
      activeStep: activeStep + 1
    });
  };

  finish = () => {
	this.setState({
		activeStep: getSteps().length
	  });
  }

  handleReset = () => {
    this.setState({
	  activeStep: 0,
	  error: false
    });
  };

  getStepContent = (step) => {
	switch (step) {
	  case 0:
		return (<Form onFile={file => this.hasFile(file)} />);
	  case 1:
		return (<LinearProgress />);
	  case 2:
		return (<Download content={ this.state.file } onDownload={this.onDownload} />);
	  default:
		return 'Unknown steps';
	}
  }

  hasFile = (fileContent) => {

	this.handleNext()
	fetch('https://titorder-service.now.sh/parse', {
		method: 'POST',
		headers: {
		  'Content-Type': 'text/csv'
		},
		body: fileContent
	  })
	  .then( r => r.text())
	  .then( text => {
		this.setState({
			file: text
		})
		this.handleNext()
	  })
	  .catch(e => {
		this.setState({
			error: this.state.activeStep,
		  });
		  this.finish()
	  })
  }

  onDownload = () => {
	this.finish()
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, error } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
			const labelProps = {};

			if (typeof error !== 'boolean' && error <= index) {
				labelProps.error = true
			}

			if (typeof error !== 'boolean' && error === index ) {
				labelProps.optional = (
					<Typography variant="caption" color="error">
					  There was an error during processing.
					</Typography>
				  );
			}



            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Button variant={'contained'} onClick={this.handleReset} className={classes.button}>
                Upload another one
              </Button>
            </div>
          ) : (
            <div>

              { this.getStepContent(activeStep) }

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinearStepper);
