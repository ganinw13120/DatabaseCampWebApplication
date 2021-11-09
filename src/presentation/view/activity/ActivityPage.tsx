import React from 'react';
import BaseView from '../BaseView';
import './activity.css';

import Requirement from './components/Requirement';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import ActivityViewModel from '../../view-model/activity/ActivityViewModel';

import Matching from './components/Matching';
import Completion from './components/Completion';
import MultipleChoice from './components/MultipleChoice';
import { inject, observer } from 'mobx-react';

@inject('learningStore')
@inject('appStore')
@observer
class ActivityPage extends React.Component<any, any>
  implements BaseView {
  private activityViewModel: ActivityViewModel;
  constructor(props: any) {
    super(props);
    this.props.appStore?.setPercent(0)
    this.state = {
      hintPopup : false
    }
    this.activityViewModel = new ActivityViewModel();
    this.showHintPopup = this.showHintPopup.bind(this);
    this.hideHintPopup = this.hideHintPopup.bind(this);
  }
  public componentDidMount(): void {
    this.props.appStore.setExpand(false)
    this.activityViewModel.attachView(this);
  }
  componentWillUpdate(): void {
    let { activityInfo } = this.props.learningStore.store;
    const search = this.props.location.search
    const activityID = new URLSearchParams(search).get('id');
    if (activityInfo?.activity?.activity_id.toString() !== activityID) {
      this.componentDidMount()
      activityInfo = null;
    }
  }
  showHintPopup(): void {
    this.setState({
      hintPopup : true
    })
  }
  hideHintPopup(): void {
    this.setState({
      hintPopup : false
    })
  }
  public onViewModelChanged(): void {
  }
  public render(): JSX.Element {
    const { hintPopup } = this.state;
    let { activityInfo, roadMap } = this.props.learningStore.store;
    return (
      <>
        <Modal
          title="ยืนยันการร้องขอคำใบ้"
          centered
          visible={hintPopup}
          onOk={() => {
            this.hideHintPopup( )
            this.activityViewModel.onHint()
          }}
          onCancel={() => this.hideHintPopup( )}
        >
          <p>ท่านต้องการใช้คำใบ้ใช่หรือไม่</p>
        </Modal>
        <div className='xl:grid xl:grid-cols-10 w-full h-full bg-bg-dark'>
          <Requirement onHint={this.showHintPopup} onSubmit={this.activityViewModel.onSubmit} />
          <div className='py-12 col-span-6'>
            <div className='flex h-auto'>
              <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
                <span className='w-full h-full bg-darkPrimary'>..</span>
              </div>
              <div className='w-auto py-6 -mx-4'>
                <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>กิจกรรม {roadMap && roadMap.items.length !== 0 && activityInfo ? `(${roadMap.items.find((e: any) => e.activity_id === activityInfo?.activity?.activity_id).order}/${roadMap.items.length})`: ''} </span> <span className=' text-lg text-success font-semibold tracking-wider'> {activityInfo ? ` + ${activityInfo.activity.point} Points` : ''} </span>
              </div>
            </div>
            {
              activityInfo ? <> {(() => {
                const { activity } = activityInfo;
                const { activity_type_id: type, question } = activity;
                const act = (type: number) => {
                  if (type === 1) return <Matching info={activityInfo} updateResult={this.activityViewModel.updateResult}/>
                  else if (type === 2) return <MultipleChoice info={activityInfo} updateResult={this.activityViewModel.updateResult} />
                  else if (type === 3) return <Completion info={activityInfo} updateResult={this.activityViewModel.updateResult} />
                }
                return <>
                  <div className='text-xl text-black font-sarabun tracking-wider mx-14 my-8'>
                      <span>{question}</span>
                  </div>
                  {act(type)}
                </>
              })()} </> : ''
            }
          </div>
        </div>

      </>
    );
  }
}


export default withRouter(ActivityPage);