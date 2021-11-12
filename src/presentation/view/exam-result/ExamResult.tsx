import { Component, ReactElement } from 'react';
import BaseView from '../BaseView';
import Profilehead from '../../assets/image-7.png';
import ProfilenameEdit from '../../assets/nameEditProfile.png';
import star from '../../assets/starProfile.png';
import hat from '../../assets/hat.png';
import ExamResultViewModel from '../../view-model/exam-result/ExamResultViewModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './profile.css';
import Skeleton from '@mui/material/Skeleton';

import Alerticon from '../../assets/alerticon.svg';
import SuccessIcon from '../../assets/alertsuccess.svg';

import { User } from '../../../domain/entity/model/User';

import { AppStore } from '../../../domain/entity/state/stores/AppStore';
import { ExaminationStore } from '../../../domain/entity/state/stores/ExaminationStore';
import { AuthStore } from '../../../domain/entity/state/stores/AuthStore';
import { ExamResult } from '../../../domain/entity/model/Learning';

export interface ProfileComponentState {
  data: ExamResult | null,
}

interface ExamPageProps extends RouteComponentProps {
  examinationStore?: ExaminationStore,
  authStore?: AuthStore,
  appStore?: AppStore,
}

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

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
    // const { userData } = this.props.authStore!.store;
    return (
      <>{ data && 
        <div className='w-full h-auto m-auto'>
          <div className='my-44 mx-auto text-center h-1/4'>
            <img src={data.is_passed ? SuccessIcon : Alerticon} className='m-auto my-auto h-72 py-10' />
            {data.is_passed ? 
            <h1 className='font-prompt text-5xl my-10'>ยินดีด้วย!</h1> :
            <h1 className='font-prompt text-5xl my-10'>ขอเเสดงความเสียใจ</h1>}
            <h1 className='font-prompt text-4xl font-light'>คุณ{data.is_passed ? '' : 'ไม่'}ผ่านด้วยคะแนน {`${data.score.toLocaleString()}`} คะแนน</h1>
            <h1 className='font-prompt text-2xl font-light my-10'>ข้อสอบชุด : ER-Model</h1>
            <h1 className='font-prompt text-2xl font-light my-10'>เมื่อวันที่ : {dateString}</h1>
            <h1 className='font-prompt text-2xl font-light my-10'>ณ เวลา : {timeString}</h1>
          </div>
        </div>}
      </>
    );
  }
}
export default withRouter(ExamResultPage);
