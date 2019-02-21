import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import "./step.css";

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['TAKE SELFIE', 'CLICK IMAGE', 'CHOOSE FRAME', 'SAVE & SHARE'];
}

class SelfieSteps extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
  };

  totalSteps = () => {
    return getSteps().length;
  };

  isStepOptional = step => {
    return step === 5;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeStep !== this.props.activeStep) {
      if (nextProps.activeStep > this.props.activeStep) {
        this.setState(state => {
          const completed = new Set(state.completed.values());
          completed.add(this.props.activeStep);
          return {
            activeStep: state.activeStep + 1,
            completed,
          };
        });
      }
      else {
        this.setState(state => {
          const completed = new Set(state.completed.values());
          completed.delete(this.props.activeStep - 1);
          if (nextProps.activeStep === 0) {
            completed.clear();
          }
          return {
            activeStep: state.activeStep - 1,
            completed,
          };
        });
      }
    }
  }




  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }


  isLastStep() {
    return this.props.activeStep === this.totalSteps() - 1;
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.props;

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const buttonProps = {};
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

SelfieSteps.propTypes = {
  classes: PropTypes.object,
  activeStep: PropTypes.number.isRequired
};

export default withStyles(styles)(SelfieSteps);