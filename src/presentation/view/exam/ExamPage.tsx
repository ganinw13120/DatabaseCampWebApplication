import { Component, ReactElement, Fragment } from 'react';
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

import { ActivityAlert, CompletionChoice, Exam, ExamActivity, MatchingChoice, MultipleChoice, RoadMap } from '../../../domain/entity/model/Learning';
import Matching from '../activity/components/Matching';
import MultipleChoiceComponent from '../activity/components/MultipleChoice';
import Completion from '../activity/components/Completion';
import AlertTab from '../activity/components/AlertTab';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

interface ExamPageState {
  exam: Exam | null,
  currentActivity: number,
  alert : ActivityAlert | null,
  isLoading : boolean
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
    const startActivity = -1;
    const examViewModel = new ExamViewModel(startActivity);
    this.examViewModel = examViewModel;
    this.state = {
      exam: null,
      currentActivity: startActivity,
      alert : null,
      isLoading : false
    }

  }

  public onViewModelChanged(): void {
    this.setState({
      exam: this.examViewModel.exam,
      currentActivity: this.examViewModel.currentActivity,
      alert : this.examViewModel.alert,
      isLoading : this.examViewModel.isLoading
    })
  }

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store;
    if (isExpand) {
      this.props.appStore!.setExpandWithDelay(false)
    }
    this.examViewModel.attachView(this);
  }

  private getCurrentActivity(act: number, currentActivity: number): ReactElement | null {
    const { exam, alert, isLoading } = this.state;
    if (!exam) return null;
    const examActivity: ExamActivity[] = exam?.activities;
    const data: ExamActivity = examActivity[act];
    const roadMap: RoadMap = {
      content_id: exam.exam.content_group_id,
      content_name: exam.exam.content_group_name,
      items: []
    }
    const updateActivityResult = (e: any): void => {
      this.examViewModel.updateResult(act, e)
    }
    const isHidden = !(currentActivity === act);
    return (<Fragment key={act}>
      <Requirement
        activityInfo={data.info}
        roadMap={roadMap}
        submitText={act === examActivity.length - 1 ? 'ส่งคำตอบ' : "ถัดไป"}
        isHidden={isHidden}
      />
      <div className={`${isHidden ? 'hidden' : ''} pt-20 pb-12 col-span-6`}>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-auto py-6 -mx-4'>
            <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>
              กิจกรรม {`(${act + 1}/${examActivity.length})`}
            </span>
          </div>
        </div>
        {
          data ? <> {(() => {
            const { info: activity } = data;
            const { activity_type_id: type } = activity;
            const act = (type: number) => {
              if (type === 1) return <Matching info={data.choices as MatchingChoice} updateResult={updateActivityResult} />
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
        
        <AlertTab alert={alert} /> 
            {data && 
            <div className='flex w-5/6 mx-auto'>
              <div className='flex-grow'>
              </div>
              <div onClick={() => { this.examViewModel.obSubmitActivity() }} className={`relative ${isLoading ? '' : 'hoverable'} flex-none bg-${isLoading ? 'disabledPrimary' : 'primary'} mt-10 text-white text-lg font-normal py-4 px-10 tracking-wider rounded-xl cursor-${isLoading ? 'loading' : 'pointer'}`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                {act === examActivity.length - 1 ? 'ส่งคำตอบ' : "ถัดไป"}
                {isLoading && <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />}
              </div>
            </div>}
      </div>
    </Fragment>)
  }

  public render(): JSX.Element {
    const { exam, currentActivity } = this.state;
    if (!exam) return <></>
    return (
      <>
        <div className='xl:grid xl:grid-cols-10 w-full h-full pt-12'>
          {currentActivity === -1 ? <Instruction displayText={exam.exam.instruction} onNext={this.examViewModel.moveNext}/> : (() => {
            const examList: ReactElement[] = [];
            let i = 0;
            while (i < exam!.activities.length) {
              const exam = this.getCurrentActivity(i, currentActivity)
              if (exam) examList.push(exam);
              i++;
            }
            return examList;
          })()}
        </div>
      </>
    );
  }
}

interface InstructionProps {
  displayText: string,
  onNext?(): void
}

class Instruction extends Component<InstructionProps, any> {
  render(): JSX.Element {
    return (<>

      <div className='pt-20 px-20 col-span-10'>
        <div className='flex w-16'>
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
            <span className="w-full bg-darkPrimary">..</span>
          </div>
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6 ml-7">
            <span>Overview</span>
          </div>
        </div>
        <div className='text-center mt-20 instruction  mx-auto text-xl'>
          {this.props.displayText}
        </div>
        <div onClick={()=>{this.props.onNext?.()}} className={`w-64 text-center mt-32 hoverable  mx-auto bg-primary text-white text-lg font-normal py-4 px-10 tracking-wider rounded-xl cursor-pointer`}  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          เริ่มทำแบบทดสอบ
        </div>
      </div>

    </>)
  }
}

export default withRouter(ExamPage);
