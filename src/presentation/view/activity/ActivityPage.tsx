import React from 'react';
import BaseView from '../BaseView';
import './matching.css';

import Hintbox from '../layout/activity/Hintbox';
import Requirement from '../layout/activity/Requirement';

import CompletionPage from './CompletionPage';

export interface CompletionPageState {
  width: number
}

export default class ActivityPage extends React.Component<any, CompletionPageState>
  implements BaseView {
  public onViewModelChanged(): void {
  }
  public render(): JSX.Element {
    return (
      <>
        <div className='xl:grid xl:grid-cols-2 w-full h-full bg-bg-dark'>
          <Requirement />
          <div className='py-12'>
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
            <div className='text-xl text-Redwrong font-semibold font-prompt tracking-wider mx-14 my-8'>
                <span>จงจับคู่คำต่อไปนี้</span>
            </div>
            <Hintbox />
          </div>
        </div>

      </>
    );
  }
}

