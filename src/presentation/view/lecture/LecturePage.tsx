import React from 'react';
import BaseView from '../BaseView';
import { SourceInfo } from 'plyr';
import Plyr from 'plyr-react'
import './lecture.css';
import './plyr.css';
import { Button ,notification } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import LectureViewModel from '../../view-model/lecture/LectureViewModel';

export interface LectureComponentState {
  lectureInfo : any
}

@inject('learningStore')
@inject("appStore")
@observer
class LecturePage extends React.Component<any, LectureComponentState>
  implements BaseView {

  private lectureViewModel: LectureViewModel;

  public constructor(props: any) {
    super(props);
    this.lectureViewModel = new LectureViewModel();
    this.state = {
      lectureInfo : null,
    }
  }

  public componentDidMount(): void {
    this.lectureViewModel.attachView(this);
    const {isExpand} = this.props.appStore.store;
    if (isExpand) {
      this.props.appStore.setExpandWithDelay(false)
    }
  }

  public onViewModelChanged(): void {
    this.setState({
      lectureInfo: this.lectureViewModel.lectureInfo
    })
  }

  onFinishFailed = () => {
  }

  public openNotification () : void {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  public render(): JSX.Element {
    const { lectureInfo } = this.state;
    const sourceInfo : SourceInfo | null = lectureInfo ? {
      type: 'video',
      sources: [
        {
          src : lectureInfo.video_link,
          provider : 'html5',
        }
      ]
    } : null
    return (
      <>
        <div className='bg-bg my-auto w-full'>
          <div className='mt-16'>
            <div className='mx-auto wrapper'>
                {
                sourceInfo && <Plyr
                  source={sourceInfo}
                />
                }
            </div>
          </div>
          <div className="mt-10 mx-auto text-center w-3/4">
            <div className='flex'>
              <div className='flex-none flex h-auto space-x-4 mt-3'>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-full bg-darkPrimary'>..</span>
                </div>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span>{!lectureInfo ?  <Skeleton variant="text" className="w-36" /> : `เนื้อหา - ${lectureInfo.content_name}`}</span>
                </div>
              </div>
              <div className='flex-grow'>
              </div>
              <div className='nextbtn flex-none w-1/6 bg-primary rounded-xl h-16' onClick={this.lectureViewModel.onClickNext}>
                  <Button className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>ถัดไป</span></Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(LecturePage);