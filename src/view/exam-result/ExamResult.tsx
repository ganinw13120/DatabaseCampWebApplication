import { Component } from 'react';
import BaseView from '../BaseView';
import ExamResultViewModel from '../../view-model/exam-result/ExamResultViewModel';
// import ExamResultViewModel from '../../view-model/exam-result/ExamResultViewModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './profile.css';

import Alerticon from '../../assets/alerticon.svg';
import SuccessIcon from '../../assets/alertsuccess.svg';

import { AppStore } from '../../store/stores/AppStore';
import { ExaminationStore } from '../../store/stores/ExaminationStore';
import { AuthStore } from '../../store/stores/AuthStore';
import { ExamResult } from '../../model/Learning';

export interface ProfileComponentState {
  data: ExamResult | null,
}

interface ExamPageProps extends RouteComponentProps {
  examinationStore?: ExaminationStore,
  authStore?: AuthStore,
  appStore?: AppStore,
}

var monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

@inject('examinationStore')
@inject('authStore')
@inject('appStore')
@observer
class ExamResultPage extends Component<ExamPageProps, ProfileComponentState>
  implements BaseView {
  private examResultViewModel: ExamResultViewModel;
  public constructor(props: any) {
    super(props);
    this.examResultViewModel = new ExamResultViewModel();
    this.state = {
      data: null,
    }
  }
  componentDidUpdate(): void {
    const search = this.props.location.search
    const { data } = this.state;
    const exam_result_id = new URLSearchParams(search).get('id');
    if (data && exam_result_id && exam_result_id !== data.exam_result_id.toString()) {
      this.examResultViewModel.attachView(this);
    }
  }

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store ;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.examResultViewModel.attachView(this);
  }

  public onViewModelChanged(): void {
    this.setState({
      data : this.examResultViewModel.data
    })
  }

  onFinishFailed = () => {
  }

  public render(): JSX.Element {
    const { data } = this.state;
    const date = data ? new Date(data.created_timestamp) : ''
    const dateString = date ? +date.getDate() + " " + monthNamesThai[date.getMonth()] + "  " + date.getFullYear() : '';
    const timeString = date ? date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0') : '';
    return (
      <>{ data && 
        <div className='w-full h-auto m-auto'>
          <div className='my-44 mx-auto text-center h-1/4'>
            <img src={data.is_passed ? SuccessIcon : Alerticon} alt='alert' className='m-auto my-auto h-72 py-10' />
            {data.is_passed ? 
            <h1 className='font-prompt text-3xl md:text-5xl my-10'>ยินดีด้วย!</h1> :
            <h1 className='font-prompt text-3xl md:text-5xl my-10'>ขอเเสดงความเสียใจ</h1>}
            <h1 className='font-prompt text-xl md:text-4xl font-light'>คุณ{data.is_passed ? '' : 'ไม่'}ผ่านด้วยคะแนน {`${data.score.toLocaleString()}`} คะแนน</h1>
            <h1 className='font-prompt text-lg md:text-2xl font-light my-10'>ข้อสอบชุด : {data.exam_type ==='MINI' ? data.content_group_name : data.exam_type ==='POST' ? 'Final Examination' : 'แบบทดสอบก่อนเรียน'}</h1>
            <h1 className='font-prompt text-lg md:text-2xl font-light my-10'>เมื่อวันที่ : {dateString}</h1>
            <h1 className='font-prompt text-lg md:text-2xl font-light my-10'>ณ เวลา : {timeString}</h1>
          </div>
        </div>}
      </>
    );
  }
}
export default withRouter(ExamResultPage);