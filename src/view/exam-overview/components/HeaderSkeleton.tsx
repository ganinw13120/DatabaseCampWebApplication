// HeaderSkeleton.tsx
/**
 * This file contains components, skeleton used in examination overview page.
*/

import React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default class HeaderSkeleton extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <>
      <div className='w-full h-auto text-center align-middle mt-10'>
          <div className={`bg-primary w-full h-20 mx-auto flex align-middle`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <Typography component="div" key='h3' variant='h3' className='w-full my-auto mx-auto px-16 pt-3'>
              <Skeleton />
            </Typography>
          </div>
      </div>
      </>
    )
  }
}
