import React from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import './Bar.css'
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import OverviewViewModel from '../../view-model/app/OverviewViewModel';
import Skeleton from '@mui/material/Skeleton';

import ContentCard from './components/ContentGroup';
import HeaderCard from './components/HeaderCard';
import HeaderSkeleton from './components/HeaderSkeleton';
import SkeletonCard from './components/SkeletonCard';

export interface OverviewComponentState {

}

@inject('overviewStore')
@observer
class OverviewPage extends React.Component<any, OverviewComponentState>
  implements BaseView {
  private overviewViewModel: OverviewViewModel;

  public constructor(props: any) {
    super(props);
    const overviewViewModel = new OverviewViewModel();
    
    this.overviewViewModel = overviewViewModel;
  }

  public onViewModelChanged(): void {
  }

  public componentDidMount(): void {
    this.overviewViewModel.attachView(this);
  }

  public render(): JSX.Element {
    const { isLoading, data } = this.props.overviewStore.store;
    return (
      <>
        <div className="font-prompt w-full p-12 px-10">
          <div className='flex h-auto space-x-4'>
            {
              isLoading ? <Skeleton variant="text" className='w-full' />  : <>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
                  <span className='w-full bg-darkPrimary'>..</span>
                </div>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
                  <span>Overview</span>
                </div>
              </>
            }
          </div>
          <div className='mt-10'>
            { isLoading ?  <Skeleton variant="text" className='w-full' /> : <span>ยินดีต้อนรับ Gan Mongklakorn</span> }
          </div>
          {isLoading ? <HeaderSkeleton variant='h1' /> : <HeaderCard />}
          { isLoading ? <SkeletonCard /> : <>
          
            {(() => {
              let cardList : any = [];
              const { content_group_overview } = data;
              content_group_overview.slice().sort((a : any, b : any) => a.group_id - b.group_id).forEach((item: any, key : number)=> {
                cardList.push(<ContentCard data={item} key={key}/>)
              })
              return cardList;
            })()}
          
          </>}
        </div>
      </>
    );
  }
}
export default withRouter(OverviewPage);
