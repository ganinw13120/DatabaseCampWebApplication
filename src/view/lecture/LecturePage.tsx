import React from 'react';
import BaseView from '@view/BaseView';
import { SourceInfo } from 'plyr';
import Plyr from 'plyr-react'
import './lecture.css';
import './plyr.css';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import LectureViewModel from '@view-model/lecture/LectureViewModel';

import { LearningStore } from '@store/stores/LearningStore';
import { AppStore } from '@store/stores/AppStore';

export interface ILecturePage extends BaseView {
  props : LectureProps
}

interface LectureComponentState {
  lectureInfo : any
}

interface LectureProps extends RouteComponentProps <{
  id : string
}> {
  learningStore ?: LearningStore,
  appStore ?: AppStore,
}

@inject('learningStore')
@inject("appStore")
@observer
class LecturePage extends React.Component<LectureProps, LectureComponentState>
  implements ILecturePage {

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
    const {isExpand} = this.props.appStore!.store;
    if (isExpand) {
      this.props.appStore!.setExpandWithDelay(false)
    }
  }

  public onViewModelChanged(): void {
    this.setState({
      lectureInfo: this.lectureViewModel.lectureInfo
    })
  }

  onFinishFailed = () => {
  }

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
          <div className='mt-32'>
            <div className='mx-auto wrapper'>
                {
                sourceInfo  && <Plyr
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
              <div className='nextbtn flex-none w-44 bg-primary rounded-xl h-16' onClick={this.lectureViewModel.onClickNext}>
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