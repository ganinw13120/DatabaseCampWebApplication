// Requirement.tsx
/**
 * This file contains components, related to requirement section in activity.
*/

import React from 'react';
import HintTab from './HintTab';
import Skeleton from '@mui/material/Skeleton';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import { ActivityInfo, RoadMap } from '@model/Learning';
import parse from 'html-react-parser';

import {ACTIVITY_BREADCRUMBS, ACTIVITY_REQUIREMENT_HEADER} from '@constant/text'

interface RequirementProps extends RouteComponentProps {
  onHint?() : void,
  activityInfo : ActivityInfo | undefined,
  roadMap : RoadMap | null,
  isHidden ?: boolean,
  isHideHint ?: boolean
}

class Requirement extends React.Component<RequirementProps, {}> {
  public render(): JSX.Element {
    const { onHint, activityInfo, roadMap, isHidden } = this.props;
    return (<>
      <div className={`${isHidden?'hidden':''} col-span-4 bg-white pt-10 h-auto flex flex-col w-full`} style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className='text-lg text-darkPrimary font-semibold tracking-wider pt-4 px-10'>
          {roadMap ? <span>{ACTIVITY_BREADCRUMBS} - {roadMap.content_name}</span> : <>
            <Skeleton variant='text' className='w-full' />
          </>}
        </div>
        <div className='flex h-auto w-full'>
          <div className='text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='text-3xl text-darkPrimary font-semibold tracking-wider py-6 -mx-4'>
            <span>{ACTIVITY_REQUIREMENT_HEADER}</span>
          </div>
        </div>
        <div className='font-sarabun text-xl text-wrap mx-auto mt-24 md:mt-10 tracking-wider requirementtext pb-10'>
          <p>
            {activityInfo ? <>{parse(activityInfo.story)}</> : <>
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