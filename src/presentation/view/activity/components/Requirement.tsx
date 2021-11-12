import React from 'react';
import bulb from '../../../assets/bulb.png';
import Hintbox from './Hintbox';
import HintTab from './HintTab';
import Skeleton from '@mui/material/Skeleton';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import {LearningStore} from '../../../../domain/entity/state/stores/LearningStore';
import { ActivityInfo, RoadMap } from '../../../../domain/entity/model/Learning';

interface RequirementProps extends RouteComponentProps {
  learningStore ?: LearningStore,
  onHint?() : void,
  onSubmit() : void,
  activityInfo : ActivityInfo | undefined,
  isLoading : boolean,
  roadMap : RoadMap | null,
  submitText ?: string,
  isHidden ?: boolean,
}

@inject('learningStore')
@observer
class Requirement extends React.Component<RequirementProps, any> {
  public constructor(props: any) {
    super(props);
  }
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
    const { onHint, onSubmit, activityInfo, isLoading, roadMap, submitText, isHidden } = this.props;
    return (<>
      <div className={`${isHidden?'hidden':''} col-span-4 bg-white pt-10 h-auto flex flex-col`} style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className='text-lg text-darkPrimary w-96 font-semibold tracking-wider pt-4 px-10'>
          {roadMap ? <span>เนื้อหา - {roadMap.content_name}</span> : <>
            <Skeleton variant='text' className='w-full' />
          </>}
        </div>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-96 text-3xl text-darkPrimary font-semibold tracking-wider py-6 -mx-4'>
            <span>ความต้องการของระบบ</span>
          </div>
        </div>
        <div className='font-sarabun text-xl text-wrap mx-auto mt-10 tracking-wider requirementtext'>
          <p>
            {activityInfo ? <>{activityInfo.story}</> : <>
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
                <Skeleton variant='text' className='w-full' />
            </>}
          </p>
        </div>
        <div className='mt-auto'>
          {/* { onHint && activityInfo && hint && hint.length !== 0 ? <Hintbox /> : ''} */}
          {activityInfo && <HintTab activityInfo={activityInfo} />}
        </div>
      </div>
    </>)
  }
}
export default withRouter(Requirement);