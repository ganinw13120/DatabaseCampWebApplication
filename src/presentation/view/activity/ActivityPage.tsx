import React from 'react';
import BaseView from '../BaseView';
import './activity.css';

import Requirement from './components/Requirement';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ActivityViewModel from '../../view-model/activity/ActivityViewModel';

import Matching from './components/Matching';
import Completion from './components/Completion';
import MultipleChoiceComponent from './components/MultipleChoice';
import { inject, observer } from 'mobx-react';

import { Activity, ActivityAlert, CompletionChoice, MatchingChoice, MultipleChoice } from '../../../domain/entity/model/Learning';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LearningStore } from '../../../domain/entity/state/stores/LearningStore';
import { AppStore } from '../../../domain/entity/state/stores/AppStore';

import AlertTab from './components/AlertTab';
interface ActivityState {
  activityInfo: Activity | null,
  alert : ActivityAlert | null
}

interface ActivityProps extends RouteComponentProps {
  learningStore?: LearningStore,
  appStore?: AppStore,

}

@inject('learningStore')
@inject('appStore')
@observer
class ActivityPage extends React.Component<ActivityProps, ActivityState>
  implements BaseView {
  private activityViewModel: ActivityViewModel;
  private swal: any;
  constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    this.state = {
      activityInfo: null,
      alert : null
    }
    this.activityViewModel = new ActivityViewModel();
    this.showHintPopup = this.showHintPopup.bind(this);
    this.swal = withReactContent(Swal);
  }
  public componentDidMount(): void {
    this.props.appStore!.setExpand(false)
    this.activityViewModel.attachView(this);
    const { isExpand } = this.props.appStore!.store;
    if (isExpand) {
      this.props.appStore!.setExpandWithDelay(false)
    }
  }


  componentDidUpdate(): void {
    let { activityInfo } = this.state;
    const search = this.props.location.search
    const activityID = new URLSearchParams(search).get('id');
    if (activityInfo && activityInfo?.activity?.activity_id.toString() !== activityID) {
      this.activityViewModel.attachView(this);
      this.setState({ activityInfo: null })
    }
  }
  showHintPopup(): void {
    this.swal.fire({
      title: 'ท่านต้องการขอคำใบ้ใช่หรือไม่?',
      text: "การขอคำใบ้จะหักเเต้มที่ได้รับในการทำกิจกรรม",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005FB7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result: any) => {
      if (result.isConfirmed)
        this.activityViewModel.onHint()
    })
  }
  public onViewModelChanged(): void {
    this.setState({
      activityInfo: this.activityViewModel.activityInfo,
      alert : this.activityViewModel.alert
    })
  }
  public render(): JSX.Element {
    const { activityInfo, alert } = this.state;
    const { roadMap, isLoading } = this.props.learningStore!.store;
    return (
      <>
        <div className='xl:grid xl:grid-cols-10 w-full pt-10 h-full'>
          <Requirement
            onHint={this.showHintPopup}
            onSubmit={this.activityViewModel.onSubmit}
            activityInfo={activityInfo?.activity}
            isLoading={isLoading}
            roadMap={roadMap}
          />
          <div className='pt-20 pb-12 col-span-6'>
            <div className='flex h-auto'>
              <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
                <span className='w-full h-full bg-darkPrimary'>..</span>
              </div>
              <div className='w-auto py-6 -mx-4'>
                <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>กิจกรรม {roadMap && roadMap.items.length !== 0 && activityInfo ? `(${roadMap!.items.find((e: any) => e.activity_id === activityInfo?.activity?.activity_id)!.order}/${roadMap.items.length})` : ''} </span> <span className=' text-lg text-success font-semibold tracking-wider'> {activityInfo ? ` + ${activityInfo.activity.point} Points` : ''} </span>
              </div>
            </div>
            {
              activityInfo ? <> {(() => {
                const { activity } = activityInfo;
                const { activity_type_id: type, question } = activity;
                const act = (type: number) => {
                  if (type === 1) return <Matching info={activityInfo.choice as MatchingChoice} updateResult={this.activityViewModel.updateResult} />
                  else if (type === 2) return <MultipleChoiceComponent info={activityInfo.choice as MultipleChoice[]} updateResult={this.activityViewModel.updateResult} />
                  else if (type === 3) return <Completion info={activityInfo.choice as CompletionChoice} updateResult={this.activityViewModel.updateResult} />
                }
                return <>
                  <div className='text-xl text-black font-sarabun tracking-wider mx-14 my-8'>
                    <span>{question}</span>
                  </div>
                  {act(type)}
                </>
              })()} </> : ''
            }
             <AlertTab alert={alert} /> 
            {activityInfo && 
            <div className='flex w-5/6 mx-auto'>
              <div className='flex-grow'>
              </div>
              <div onClick={() => {if(alert && alert.isSuccess) this.activityViewModel.moveNext(); else this.activityViewModel.onSubmit(); }} className={`hoverable flex-none bg-${isLoading ? 'darkPrimary' : 'primary'} mt-10 text-white text-lg font-normal py-4 px-10 tracking-wider rounded-xl cursor-${isLoading ? 'wait' : 'pointer'}`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                {alert && alert.isSuccess ? 'ถัดไป' : 'ตรวจคำตอบ'}
              </div>
            </div>}
          </div>
        </div>

      </>
    );
  }
}


export default withRouter(ActivityPage);