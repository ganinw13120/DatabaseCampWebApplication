import React from 'react';
import BaseView from '@view/BaseView';
import 'semantic-ui-css/semantic.min.css'
import './Bar.css'
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps  } from 'react-router-dom';
import OverviewViewModel from '@view-model/overview/OverviewViewModel';
import Skeleton from '@mui/material/Skeleton';

import ContentGroup from "./components/ContentGroup";
import HeaderCard from "./components/HeaderCard";
import HeaderSkeleton from "./components/HeaderSkeleton";
import SkeletonCard from "./components/SkeletonCard";

import {AppStore} from '@store/stores/AppStore';
import {OverviewStore} from '@store/stores/OverviewStore';
import {AuthStore} from '@store/stores/AuthStore';

import {Overview} from '@model/Learning';

export interface IOverview extends BaseView {
  props : OverviewProps,
}

interface OverviewState {
  data : Overview | null
}

interface OverviewProps extends RouteComponentProps {
  appStore ?: AppStore,
  overviewStore ?: OverviewStore,
  authStore ?: AuthStore,
}

@inject('overviewStore')
@inject('authStore')
@inject('appStore')
@observer

class OverviewPage
  extends React.Component<OverviewProps, OverviewState>
  implements IOverview
{
  private overviewViewModel: OverviewViewModel;

  public constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    const overviewViewModel = new OverviewViewModel();

    this.state = {
      data : null
    }

    this.overviewViewModel = overviewViewModel;
  }

  public onViewModelChanged(): void {
    this.setState({
      data : this.overviewViewModel.data
    })
  }

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store ;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.overviewViewModel.attachView(this);
  }

  public render(): JSX.Element {
    const { data } = this.state;
    const {userData} = this.props.authStore!.store;
    return (
      <>
        <div className="font-prompt w-full p-12 px-10">
          <div className="flex h-auto space-x-4">
            {!data ? (
              <Skeleton variant="text" className="w-full" />
            ) : (
              <>
                <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
                  <span className="w-full bg-darkPrimary">..</span>
                </div>
                <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
                  <span>ภาพรวมเนื้อหา</span>
                </div>
              </>
            )}
          </div>
          <div className="mt-10">
            {data && userData ? (
              <span>ยินดีต้อนรับ {userData.name}</span>
            ) : (
              <Skeleton variant="text" className="w-full" />
            )}
          </div>
          {!data  ? <HeaderSkeleton variant="h1" /> : data.lasted_group && <HeaderCard data={data.lasted_group}/> }
          {!data ? (
            <SkeletonCard />
          ) : (
            <>
              {(() => {
                let cardList: any = [];
                const { content_group_overview } = data;
                content_group_overview
                  .slice()
                  .sort((a: any, b: any) => a.group_id - b.group_id)
                  .forEach((item: any, key: number) => {
                    cardList.push(<ContentGroup data={item} key={key} />);
                  });
                return cardList;
              })()}
            </>
          )}
        </div>
      </>
    );
  }
}
export default withRouter(OverviewPage);
