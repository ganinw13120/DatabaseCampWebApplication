import React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default class HeaderSkeleton extends React.Component<any, any> {
  public render(): JSX.Element {
    const { variant } = this.props;
    return (
      <>
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton />
        </Typography>
      </>
    )
  }
}
