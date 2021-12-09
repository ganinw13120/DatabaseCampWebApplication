// HeaderCard.tsx
/**
 * This file contains components, related examination overview page.
*/

import React from 'react';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import {ExamOverviewInfo} from '@model/Learning';
import {EXAMINATION_START, EXAMINATION_PASS, EXAMINATION_NOT_PASS} from '@constant/text';

interface ExamCardProps extends RouteComponentProps {
  exam : ExamOverviewInfo,
  isEnabled : boolean,
  displayName ?: string,
  isPassed : boolean
}

class HeaderCard extends React.Component<ExamCardProps, any>{

  /**
   * On user click start examination, load examination page
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private onClickStart () : void {
    const {exam} = this.props;
    const {exam_id} = exam;
    this.props.history.push('/examination/' + exam_id);

  }
  public render(): JSX.Element {
    const { exam, displayName, isEnabled, isPassed } = this.props;
    const {content_group_name} = exam;
    return (
      <>
        <div className='w-full h-auto text-center align-middle mt-10'>
            <div className={`bg-${isEnabled ? 'primary' : 'disabledPrimary'} w-full h-20 mx-auto flex align-middle`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className={`flex-none bg-white h-3/6 px-2 md:px-6 align-middle my-auto ml-3 md:ml-7 rounded  ${isEnabled ? 'continuebtn cursor-pointer' : ''}`} onClick={() => { if(isEnabled) this.onClickStart () }}>
                <div className={`font-semibold ${!isEnabled ? 'text-grayPrimary' : ''} text-sm md:text-lg`} style={{ marginTop: 8 }}>
                  {EXAMINATION_START}
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-base md:text-xl tracking-wider'>
                <span>{displayName ? displayName : content_group_name}</span>
              </div>
              <div className='flex-grow'></div>
              <div className='text-right flex-none  text-xl text-right my-auto ml-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>{isPassed ? EXAMINATION_PASS : EXAMINATION_NOT_PASS}</span>
                </div>
              </div>
            </div>
        </div>
      </>
    )
  }
}
export default withRouter(HeaderCard);