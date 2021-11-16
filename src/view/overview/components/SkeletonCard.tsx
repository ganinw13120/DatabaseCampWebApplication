import React from 'react';

import HeaderSkeleton from './HeaderSkeleton';

export default class SkeletonCard extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <>
        <div className='w-full h-auto text-center align-middle mt-10'>
          <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='pl-10 w-3/4'>
              <HeaderSkeleton variant='h2' />
            </div>
          </div>
          <SkeletonContentList />
          <SkeletonContentList />
          <SkeletonContentList />
          <SkeletonContentList />
        </div>
      </>
    );
  }
}

class SkeletonContentList extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <div className='w-2/4 font-semibold text-darkPrimary mx-16 font-bold' style={{ marginTop: 16 }}>
            <HeaderSkeleton variant='body1' />
          </div>
          <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
            <span></span>
          </div>
          <div className='flex-none w-auto w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
            <div className='flex-grow my-auto w-full'>
            <HeaderSkeleton variant='body1' />
            </div>
          </div>
        </div>
      </>
    )
  }
}