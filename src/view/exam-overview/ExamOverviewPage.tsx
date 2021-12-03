import React, { ReactElement } from 'react';
import BaseView from '@view/BaseView';
import 'semantic-ui-css/semantic.min.css'
import './Bar.css'
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps  } from 'react-router-dom';

import ExamOverviewViewModel from '@view-model/exam-overview/ExamOverviewViewModel';
import IExamOverviewViewModel from '@view-model/exam-overview/IExamOverviewViewModel';

import Skeleton from '@mui/material/Skeleton';

import HeaderCard from "./components/HeaderCard";
import HeaderSkeleton from "./components/HeaderSkeleton";

import IAppStore from '@store/stores/AppStore/IAppStore';
import IExaminationStore from '@store/stores/ExaminationStore/IExaminationStore';

import {SIDEBAR_EXAMINATION} from '@constant/text';

export interface IExamOverviewPage extends BaseView {
  props : ExamOverviewProps
}

interface ExamOverviewComponentState {}

interface ExamOverviewProps extends RouteComponentProps {
  appStore ?: IAppStore,
  examinationStore ?: IExaminationStore,
}

@inject('examinationStore')
@inject('appStore')
@observer

class ExamOverviewPage
  extends React.Component<ExamOverviewProps, ExamOverviewComponentState>
  implements IExamOverviewPage
{
  private examOverviewViewModel: IExamOverviewViewModel;

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
    this.props.appStore!.hideStepper()
    this.examOverviewViewModel.attachView(this);
  }

  public render(): JSX.Element {
    const { data } = this.props.examinationStore!.store;
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
                  <span>{SIDEBAR_EXAMINATION}</span>
                </div>
              </>
            )}
          </div>
          {!data && <>
            <HeaderSkeleton />
            <HeaderSkeleton />
            <HeaderSkeleton />
          </>}
          {data && data.final_exam && <HeaderCard exam={data.final_exam} displayName='Final Examination' isEnabled={data.final_exam.can_do} isPassed={data.final_exam.results?.find(e=>e.is_passed) ? true : false} />}
          {data && data.mini_exam && data.mini_exam.length > 0 && <>
            {(()=>{
              let examList : ReactElement[] = [];
              data.mini_exam.forEach(e=>{
                const isPassed = e.results?.find(e=>e.is_passed) ? true : false;
                examList.push(<HeaderCard exam={e} isEnabled={true} isPassed={isPassed} key={e.exam_id} />)
              })
              return examList;
            })()}
          </>}
          {data && data.pre_exam && <HeaderCard exam={data.pre_exam} displayName='แบบทดสอบก่อนเรียน' isEnabled={true} isPassed={false} />}
        </div>
      </>
    );
  }
}
export default withRouter(ExamOverviewPage);
