import React, { ReactElement } from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import './Bar.css'
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps  } from 'react-router-dom';
import ExamOverviewViewModel from '../../view-model/exam-overview/ExamOverviewViewModel';
import Skeleton from '@mui/material/Skeleton';

import HeaderCard from "./components/HeaderCard";
import HeaderSkeleton from "./components/HeaderSkeleton";

import {AppStore} from '../../../domain/entity/state/stores/AppStore';
import {ExaminationStore} from '../../../domain/entity/state/stores/ExaminationStore';

interface ExamOverviewComponentState {}

interface ExamOverviewProps extends RouteComponentProps {
  appStore ?: AppStore,
  examinationStore ?: ExaminationStore,
}

@inject('examinationStore')
@inject('appStore')
@observer

class OverviewPage
  extends React.Component<ExamOverviewProps, ExamOverviewComponentState>
  implements BaseView
{
  private examOverviewViewModel: ExamOverviewViewModel;

  public constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    const overviewViewModel = new ExamOverviewViewModel();

    this.examOverviewViewModel = overviewViewModel;
  }

  public onViewModelChanged(): void {}

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store ;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.examOverviewViewModel.attachView(this);
  }

  public render(): JSX.Element {
    const { data } = this.props.examinationStore!.store;
    console.log(data?.mini_exam)
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
                  <span>Examination</span>
                </div>
              </>
            )}
          </div>
          {!data && <>
            <HeaderSkeleton />
            <HeaderSkeleton />
            <HeaderSkeleton />
          </>}
          {data && data.final_exam && <HeaderCard exam={data.final_exam} displayName='Final Examination' isEnabled={true}/>}
          {data && data.mini_exam && data.mini_exam.length > 0 && <>
            {(()=>{
              let examList : ReactElement[] = [];
              data.mini_exam.forEach(e=>{
                examList.push(<HeaderCard exam={e} isEnabled={true} />)
              })
              return examList;
            })()}
          </>}
          {data && data.pre_exam && <HeaderCard exam={data.pre_exam} displayName='แบบทดสอบก่อนเรียน' isEnabled={false}/>}
        </div>
      </>
    );
  }
}
export default withRouter(OverviewPage);
