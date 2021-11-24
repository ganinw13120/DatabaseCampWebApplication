import React from 'react';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import {ExamOverviewInfo} from '@model/Learning';

interface ExamCardProps extends RouteComponentProps {
  exam : ExamOverviewInfo,
  isEnabled : boolean,
  displayName ?: string
}

class HeaderCard extends React.Component<ExamCardProps, any>{
  private onClickContinue () : void {
    const {exam} = this.props;
    const {exam_id} = exam;
    this.props.history.push('/examination/start?id=' + exam_id);
  }
  public render(): JSX.Element {
    const { exam, displayName, isEnabled } = this.props;
    const {content_group_name} = exam;
    // const { content_name, group_name, progress  } = this.props.overviewStore.store.data?.lasted_group;
    return (
      <>
        <div className='w-full h-auto text-center align-middle mt-10'>
            <div className={`bg-${isEnabled ? 'primary' : 'disabledPrimary'} w-full h-20 mx-auto flex align-middle`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className={`flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded  ${isEnabled ? 'continuebtn cursor-pointer' : ''}`} onClick={() => { this.onClickContinue () }}>
                <div className={`font-semibold ${!isEnabled ? 'text-grayPrimary' : ''}`} style={{ marginTop: 8 }}>
                  เริ่มทำแบบทดดสอบ
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>{displayName ? displayName : content_group_name}</span>
              </div>
            </div>
        </div>
      </>
    )
  }
}
export default withRouter(HeaderCard);