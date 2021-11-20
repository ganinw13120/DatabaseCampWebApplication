import React from 'react';
import HintTab from './HintTab';
import Skeleton from '@mui/material/Skeleton';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import {LearningStore} from '@store/stores/LearningStore';
import { ActivityInfo, RoadMap } from '@model/Learning';

interface RequirementProps extends RouteComponentProps {
  learningStore ?: LearningStore,
  onHint?() : void,
  activityInfo : ActivityInfo | undefined,
  roadMap : RoadMap | null,
  submitText ?: string,
  isHidden ?: boolean,
  isHideHint ?: boolean
}

@inject('learningStore')
@observer
class Requirement extends React.Component<RequirementProps, {}> {
  componentDidMount() {
    this.getDimensions();
    window.addEventListener('resize', this.getDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions);
  }
  getDimensions = () => {
    this.setState({ width: window.innerWidth });
  }
  public render(): JSX.Element {
    const { onHint, activityInfo, roadMap, isHidden } = this.props;
    return (<>
      <div className={`${isHidden?'hidden':''} col-span-4 bg-white pt-10 h-auto flex flex-col w-full`} style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className='text-lg text-darkPrimary w-96 font-semibold tracking-wider pt-4 px-10'>
          {roadMap ? <span>เนื้อหา - {roadMap.content_name}</span> : <>
            <Skeleton variant='text' className='w-full' />
          </>}
        </div>
        <div className='flex h-auto w-full'>
          <div className='text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='text-3xl text-darkPrimary font-semibold tracking-wider py-6 -mx-4'>
            <span>ความต้องการของระบบ</span>
          </div>
        </div>
        <div className='font-sarabun text-xl text-wrap mx-auto mt-24 md:mt-10 tracking-wider requirementtext pb-10'>
          <p>
            {activityInfo ? <>{activityInfo.story}</> : <>
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
            </>}
          </p>
        </div>
        <div className='mt-auto'>
          {activityInfo && onHint && <HintTab onHint={onHint} />}
        </div>
      </div>
    </>)
  }
}
export default withRouter(Requirement);