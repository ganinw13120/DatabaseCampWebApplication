// PointRankingPage.tsx
/**
 * This file contains components, relaed to point ranking page.
*/

import React from "react";
import BaseView from '@view/BaseView';
import "semantic-ui-css/semantic.min.css";
import { inject, observer } from "mobx-react";

import PointRankingViewModel from "@root/view-model/point-ranking/PointRankingViewModel";
import IPointRankingViewModel from "@root/view-model/point-ranking/IPointRankingViewModel";

import RankingItem from "./components/RankingItem";
import Header from "@view/layout/app/Header";
import { RouteComponentProps, withRouter } from "react-router";
import { AppStore } from "@store/stores/AppStore/AppStore";
import { PointRankingStore } from "@store/stores/PointRankingStore/PointRankingStore";
import {SIDEBAR_RANKING} from '@constant/text';


export interface IPointRanking extends BaseView {
  props : PointRankingProps
}

interface PointRankingProps extends RouteComponentProps {
  appStore ?: AppStore,
  pointRankingStore ?: PointRankingStore
}

@inject("pointRankingStore")
@inject("appStore")
@observer
class PointRankingPage
  extends React.Component<PointRankingProps, {}>
  implements IPointRanking
{
  private viewModel: IPointRankingViewModel;

  public constructor(props: any) {
    super(props);
    this.viewModel = new PointRankingViewModel();
  }


  /**
   * On component did mount, set application store, and attach view-model
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public componentDidMount(): void {
    const {isExpand} = this.props.appStore!.store;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.viewModel.attachView(this);
  }

  /**
   * On view-model changes, update view states.
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public onViewModelChanged(): void {}

  public render(): JSX.Element {
    const { isLoading, data } = this.props.pointRankingStore!.store;
    return (
      <>
        <div className="font-prompt w-full p-12 px-10">
          <Header text={SIDEBAR_RANKING} />
          <div className="mt-10">
            {data &&
            <RankingItem
              data={data.user_ranking}
              isLoading={isLoading}
              isHighlight={true}
            />}
          </div>

          <div className=" w-full h-auto text-center align-middle mt-10">
            { data &&
              <>
                {(() => {
                  let list: any = [];
                  data.leader_board.slice().sort((a,b)=>b.point-a.point).forEach((item: any, index: number) => {
                    list.push(
                      <RankingItem
                        key={index}
                        data={item}
                        isLoading={isLoading}
                        isHighlight={index === 0}
                      />
                    );
                  });
                  return list;
                })()}
              </>
            }
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(PointRankingPage);
