import React from "react";
import BaseView from "../BaseView";
import "semantic-ui-css/semantic.min.css";
import { inject, observer } from "mobx-react";
import PointRankingViewModel from "../../view-model/app/PointRanking.ViewModel";
import RankingItem from "./components/RankingItem";
import Header from "./components/Header";
import { RouteComponentProps, withRouter } from "react-router";
import { AppStore } from "../../store/stores/AppStore";
import { PointRankingStore } from "../../store/stores/PointRankingStore";

interface PointRankingProps extends RouteComponentProps {
  appStore ?: AppStore,
  pointRankingStore ?: PointRankingStore
}

@inject("pointRankingStore")
@inject("appStore")
@observer
class PointRankingPage
  extends React.Component<PointRankingProps, {}>
  implements BaseView
{
  private viewModel: PointRankingViewModel;

  public constructor(props: any) {
    super(props);
    this.viewModel = new PointRankingViewModel();
  }

  public componentDidMount(): void {
    const {isExpand} = this.props.appStore!.store;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.viewModel.attachView(this);
  }

  public onViewModelChanged(): void {}

  onFinishFailed = () => {};

  public render(): JSX.Element {
    const { isLoading, data } = this.props.pointRankingStore!.store;
    return (
      <>
        <div className="font-prompt w-full p-12 px-10">
          <Header />
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
                  data.leader_board.slice().sort((a,b)=>a.name>b.name ? 1 : -1).sort((a,b)=>b.point-a.point).forEach((item: any, index: number) => {
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
