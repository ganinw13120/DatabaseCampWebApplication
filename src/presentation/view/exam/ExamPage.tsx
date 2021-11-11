import { Component, ReactElement } from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import './Bar.css'
import './overview.css'
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ExamViewModel from '../../view-model/exam/ExamViewModel';

import Requirement from '../activity/components/Requirement';

import { AppStore } from '../../../domain/entity/state/stores/AppStore';
import { ExaminationStore } from '../../../domain/entity/state/stores/ExaminationStore';

import { CompletionChoice, Exam, ExamActivity, MatchingChoice, MultipleChoice, RoadMap } from '../../../domain/entity/model/Learning';
import Matching from '../activity/components/Matching';
import MultipleChoiceComponent from '../activity/components/MultipleChoice';
import Completion from '../activity/components/Completion';

interface ExamPageState {
  exam: Exam | null,
  currentActivity: number
}

interface ExamPageProps extends RouteComponentProps {
  appStore?: AppStore,
  examinationStore?: ExaminationStore,
}

@inject('examinationStore')
@inject('appStore')
@observer

class ExamPage
  extends Component<ExamPageProps, ExamPageState>
  implements BaseView {
  private examViewModel: ExamViewModel;

  public constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    const startActivity = 0;
    const examViewModel = new ExamViewModel(startActivity);
    this.examViewModel = examViewModel;
    this.state = {
      exam: null,
      currentActivity: startActivity,
    }

  }

  public onViewModelChanged(): void {
    this.setState({
      exam: this.examViewModel.exam,
      currentActivity : this.examViewModel.currentActivity
    })
  }

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store;
    if (isExpand) {
      this.props.appStore!.setExpandWithDelay(false)
    }
    this.examViewModel.attachView(this);
  }

  private getCurrentActivity(): ReactElement | null {
    const { exam, currentActivity } = this.state;
    if (!exam) return null;
    const examActivity : ExamActivity[] = exam?.activities;
    const data : ExamActivity = examActivity[currentActivity];
    const roadMap : RoadMap = {
      content_id : exam.exam.content_group_id,
      content_name : exam.exam.content_group_name,
      items : []
    }
    this.examViewModel.updateResult(currentActivity ,null)
    const updateActivityResult = (e : any) : void => {
      this.examViewModel.updateResult(currentActivity ,e)
    }
    return (<>
      <Requirement 
        activityInfo={data.info}
        feedback=''
        onSubmit={this.examViewModel.obSubmitActivity}
        isLoading={false}
        roadMap={roadMap}
      />
      <div className='py-12 col-span-6'>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-auto py-6 -mx-4'>
            <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>
              กิจกรรม {`(${currentActivity + 1}/${examActivity.length})`}
            </span>
          </div>
        </div>
            {
              data ? <> {(() => {
                const { info : activity } = data;
                const { activity_type_id: type } = activity;
                const act = (type: number) => {
                  if (type === 1) return <Matching info={data.choices as MatchingChoice} updateResult={updateActivityResult}/>
                  else if (type === 2) return <MultipleChoiceComponent info={data.choices as MultipleChoice[]} updateResult={updateActivityResult} />
                  else if (type === 3) return <Completion info={data.choices as CompletionChoice} updateResult={updateActivityResult} />
                }
                return <>
                  <div className='text-xl text-black font-sarabun tracking-wider mx-14 my-8'>
                      <span>{data.info.question}</span>
                  </div>
                  {act(type)}
                </>
              })()} </> : ''
            }
      </div>
    </>)
  }

  public render(): JSX.Element {
    return (
      <>
        <div className='xl:grid xl:grid-cols-10 w-full h-full pt-10 bg-bg-dark'>
          {this.getCurrentActivity()}
        </div>
      </>
    );
  }
}
export default withRouter(ExamPage);
