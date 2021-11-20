import { Component } from 'react';
import Skeleton from '@mui/material/Skeleton';
export default class SkeletonActivity extends Component<{}, {}>{
  public render(): JSX.Element {
    return (
      <>
            <Skeleton variant='text' className='w-3/4 mx-auto' />
            <Skeleton variant="rectangular" className='w-3/4 mx-auto my-10' height={200} />
            <Skeleton variant='text' className='w-3/4 mx-auto py-3' />
            <Skeleton variant='text' className='w-3/4 mx-auto py-3' />
            <Skeleton variant='text' className='w-3/4 mx-auto py-3' />

      </>
    );
  }
}