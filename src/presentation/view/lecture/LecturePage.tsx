import React from 'react';
import BaseView from '../BaseView';
import { SourceInfo } from 'plyr';
import Plyr from 'plyr-react'
import './lecture.css';
import './plyr.css';
import { Button  } from 'antd';

export interface LectureComponentState {

}

export default class LecturePage extends React.Component<any, LectureComponentState>
  implements BaseView {

  public constructor(props: any) {
    super(props);

  }

  public componentDidMount(): void {
  }

  public onViewModelChanged(): void {
  }

  onFinishFailed = () => {
  }

  public render(): JSX.Element {
    const sourceInfo : SourceInfo = {
      type: 'video',
      sources: [
        {
          src : 'https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/test.mp4',
          provider : 'html5',
        }
      ]
    }
    return (
      <>
        <div className='bg-bg w-full'>
          <div className='mt-16'>
            <div className='mx-auto wrapper'>
                <Plyr
                  source={sourceInfo}
                />
            </div>
          </div>
          <div className="mt-10 mx-auto text-center w-3/4">
            <div className='flex'>
              <div className='flex-none flex h-auto space-x-4 mt-3'>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-full bg-darkPrimary'>..</span>
                </div>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span>เนื้อหา - Database Entity</span>
                </div>
              </div>
              <div className='flex-grow'>

              </div>
              <div className='flex-none w-1/6 bg-primary rounded-xl h-16'>
                  <Button className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>ถัดไป</span></Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}