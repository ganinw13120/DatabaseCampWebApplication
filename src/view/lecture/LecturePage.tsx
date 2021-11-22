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
import ILectureViewModel from '@view-model/lecture/ILectureViewModel';

import ILearningStore from '@store/stores/LearningStore/ILearningStore';
import IAppStore from '@store/stores/AppStore/IAppStore';
import { Lecture } from '@model/Learning';

export interface ILecturePage extends BaseView {
  props : LectureProps
}

interface LectureComponentState {
  lectureInfo : Lecture | null
}

interface LectureProps extends RouteComponentProps <{
  id : string
}> {
  learningStore ?: ILearningStore
  appStore ?: IAppStore
}

@inject('learningStore')
@inject("appStore")
@observer
class LecturePage extends React.Component<LectureProps, LectureComponentState>
  implements ILecturePage {

  private lectureViewModel: ILectureViewModel;

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
      lectureInfo: this.lectureViewModel.getLectureInfo()
    })
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
          <div className='pt-32'>
            <div className='mx-auto wrapper'>
                {
                sourceInfo  && <Plyr
                  source={sourceInfo}
                />
                }
            </div>
          </div>
          <div className="mt-10 mx-auto text-center w-3/4">
            <div className='md:flex'>
              <div className='flex-none flex h-auto space-x-4 mt-3'>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-full bg-darkPrimary'>..</span>
                </div>
                <div className='text-lg md:text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span>{!lectureInfo ?  <Skeleton variant="text" className="w-36" /> : `เนื้อหา - ${lectureInfo.content_name}`}</span>
                </div>
              </div>
              <div className='flex-grow'>
              </div>
              <div className='mt-10 md:mt-0 nextbtn flex-none w-44 bg-primary rounded-xl h-16' onClick={this.lectureViewModel.onClickNext}>
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