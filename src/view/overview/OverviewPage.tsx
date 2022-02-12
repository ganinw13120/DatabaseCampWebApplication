// OverviewPage.tsx
/**
 * This file contains components, relaed to overview page.
*/

import React, { ReactElement } from 'react';
import BaseView from '@view/BaseView';
import 'semantic-ui-css/semantic.min.css'
import '@view/overview/Bar.css';
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import OverviewViewModel from '@view-model/overview/OverviewViewModel';
import IOverviewViewModel from '@view-model/overview/IOverviewViewModel';

import Skeleton from '@mui/material/Skeleton';

import ContentGroup from "./components/ContentGroup";
import HeaderCard from "./components/HeaderCard";
import HeaderSkeleton from "./components/HeaderSkeleton";
import SkeletonCard from "./components/SkeletonCard";

import IAppStore from '@store/stores/AppStore/IAppStore';
import IOverviewStore from '@store/stores/OverviewStore/IOverviewStore';
import IAuthStore from '@store/stores/AuthStore/IAuthStore';

import { Overview, Recommend } from '@model/Learning';

import {SIDEBAR_OVERVIEW} from '@constant/text';

export interface IOverview extends BaseView {
  props: OverviewProps,
}

interface OverviewState {
  data: Overview | null,
  recommend : Recommend | null
}

interface OverviewProps extends RouteComponentProps {
  appStore?: IAppStore,
  overviewStore?: IOverviewStore,
  authStore?: IAuthStore,
}

@inject('overviewStore')
@inject('authStore')
@inject('appStore')
@observer

class OverviewPage
  extends React.Component<OverviewProps, OverviewState>
  implements IOverview {
  private overviewViewModel: IOverviewViewModel;

  public constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    const overviewViewModel = new OverviewViewModel();

    this.state = {
      data: null,
      recommend : null
    }

    this.overviewViewModel = overviewViewModel;
  }

  /**
   * On view-model changes, update view states.
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public onViewModelChanged(): void {
    this.setState({
      data: this.overviewViewModel.getData(),
      recommend: this.overviewViewModel.getRecommend(),
    })
  }


  /**
   * On component did mount, set application store, and attach view-model
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.overviewViewModel.attachView(this);
  }

  public render(): JSX.Element {
    const { data, recommend } = this.state;
    const { userData } = this.props.authStore!.store;
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
                  <span>{SIDEBAR_OVERVIEW}</span>
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
          {!data ? <HeaderSkeleton variant="h1" /> : data.lasted_group && <HeaderCard data={data.lasted_group} />}
          {!data ? (
            <SkeletonCard />
          ) : (
            <>
              {(() => {
                let cardList: ReactElement[] = [];
                const { content_group_overview } = data;
                content_group_overview
                  .slice()
                  .sort((a: any, b: any) => a.group_id - b.group_id)
                  .forEach((item, key: number) => {
                    const is_recommend = recommend?.recommend_group.find(e=>e.content_group_id===item.group_id)?.is_recommend;
                    cardList.push(<ContentGroup data={item} key={key} isRecommend={is_recommend!==undefined ? is_recommend : false} />);
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
