import React from 'react';
import BaseView from '../BaseView';
import './matching.css';

import Requirement from './Requirement';

import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ActivityViewModel from '../../view-model/activity/ActivityViewModel';

import CompletionPage from './CompletionPage';

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
                <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>กิจกรรม (1/5)</span> <span className=' text-lg text-success font-semibold tracking-wider'> + 15 Points</span>
              </div>
            </div>
            <div className='text-xl text-black font-sarabun tracking-wider mx-14 my-8'>
                <span>จงเลือกคำมาเติมช่องว่างให้ถูกต้อง</span>
            </div>
            <CompletionPage />
          </div>
        </div>

      </>
    );
  }
}


export default withRouter(ActivityPage);