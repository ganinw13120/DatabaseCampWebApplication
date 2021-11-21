import { Component, ReactElement } from "react";

import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import TvIcon from '@mui/icons-material/Tv';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { AppStore } from "@store/stores/AppStore/AppStore";

import { inject, observer } from 'mobx-react';

import {Step as StepEnum} from '@model/App';


const primaryColor = '#03EF62'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: primaryColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: primaryColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: primaryColor,
    }),
    '& .QontoStepIcon-completedIcon': {
      color: primaryColor,
      zIndex: 0,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

class CompleteStepIcon extends Component<StepIconProps, any> {
  render(): JSX.Element {
    const { active : isActive, completed, className } = this.props;
    const active = isActive || completed
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
          <Check className={completed ? `QontoStepIcon-completedIcn` : ''} />
      </QontoStepIconRoot>
    );
  }
}

class UnCompleteStepIcon extends Component<StepIconProps, any> {
  render(): JSX.Element {
    const { active : isActive, completed, className } = this.props;
    const active = isActive || completed
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
          <div className="QontoStepIcon-circle" />
      </QontoStepIconRoot>
    );
  }
}

class LectureIcon extends Component<StepIconProps, any> {
  render(): JSX.Element {
    const { active : isActive, completed, className } = this.props;
    const active = isActive || completed
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
          <TvIcon className="QontoStepIcon-completedIcon" />
      </QontoStepIconRoot>
    );
  }
}

interface StepperProps {
  appStore ?: AppStore
}

@inject('appStore')
@observer
export default class ActivityStepper extends Component<StepperProps, any> {
  render(): JSX.Element | null {
    const {stepper} = this.props!.appStore!.store;
    return (stepper ? <>
      <div className='absolute top-0 bg-darkPrimary w-full h-14' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)', marginTop: '0px', zIndex: -0 }}>
        <div className='mt-3 flex z-0'>
          <div className='flex-grow'></div>
          {stepper.onPrev && stepper.currentStep > 0 ?
          <div className='flex-none cursor-pointer' onClick={()=>{stepper?.onPrev?.()}}>
            <LeftOutlined className='text-white my-auto' style={{fontSize : 20, color : 'white'}} />
            <span className='my-auto ml-1 text-white font-normal'>
            Back
            </span>
          </div> : 
          <div className='flex-none cursor-pointer'>
            <LeftOutlined className='text-white my-auto' style={{fontSize : 20, color : '#BBBFC0'}} />
            <span className='ml-1 text-gray font-normal'>
            Back
            </span>
          </div>}
          <div className='w-4/6'>
            <Stepper alternativeLabel activeStep={stepper.currentStep} connector={<QontoConnector />}>
              {(() => {
                const steppers: ReactElement[] = [];
                let i = 1;
                while (i <= stepper.steps.length) {
                steppers.push(
                    <Step key={i}>
                      <StepLabel StepIconComponent={stepper.steps[i-1]===StepEnum.Activity ? CompleteStepIcon : stepper.steps[i-1]===StepEnum.Lecture ? LectureIcon : UnCompleteStepIcon}></StepLabel>
                    </Step>
                  )
                  i++;
                }
                return steppers;
              })()}
            </Stepper>
          </div>
          {stepper.onNext && stepper.currentStep !== stepper.steps.length - 1 ?
          <div className='flex-none cursor-pointer' onClick={()=>{stepper?.onNext?.()}}>
            <span className='my-auto mr-1 text-white font-normal'>
            Next
            </span>
            <RightOutlined className='text-white my-auto' style={{fontSize : 20, color : 'white'}} />
          </div> : 
          <div className='flex-none cursor-pointer'>
            <span className='my-auto mr-1 text-gray font-normal'>
            Next
            </span>
            <RightOutlined className='text-white my-auto' style={{fontSize : 20, color : '#BBBFC0'}} />
          </div>}
          <div className='flex-grow'></div>
        </div>
      </div>
    </> : null)
  }
}