import React from 'react';
import BaseView from '../BaseView';
import './activity.css';

import Requirement from './components/Requirement';

import { withRouter } from 'react-router-dom';

import ActivityViewModel from '../../view-model/activity/ActivityViewModel';

import Completion from './components/Completion';
import MultipleChoice from './components/MultipleChoice';
import { inject, observer } from 'mobx-react';

@inject('learningStore')
@observer
class ActivityPage extends React.Component<any, any>
  implements BaseView {
  private activityViewModel: ActivityViewModel;
  constructor(props: any) {
    super(props);
    this.activityViewModel = new ActivityViewModel();
  }
  public componentDidMount(): void {
    this.activityViewModel.attachView(this);
  }
  public onViewModelChanged(): void {
  }
  public render(): JSX.Element {
    const { activityInfo } = this.props.learningStore.store;
    return (
      <>
        <div className='xl:grid xl:grid-cols-10 w-full h-full bg-bg-dark'>
          <Requirement />
          <div className='py-12 col-span-6'>
            <div className='flex h-auto'>
              <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
                <span className='w-full h-full bg-darkPrimary'>..</span>
              </div>
              <div className='w-96 py-6 -mx-4'>
                <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>กิจกรรม (1/5)</span> <span className=' text-lg text-success font-semibold tracking-wider'> + {activityInfo ? `${activityInfo.activity.point}` : 'xx'} Points</span>
              </div>
            </div>
            {
              activityInfo ? <> {(() => {
                const { activity } = activityInfo;
                const { activity_type_id: type, question } = activity;
                const act = (type: number) => {
                  if (type === 1) return <MultipleChoice info={activityInfo} />
                  else if (type === 2) return <MultipleChoice info={activityInfo} />
                  else if (type === 3) return <Completion info={activityInfo} />
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