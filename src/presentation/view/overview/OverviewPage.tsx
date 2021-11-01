import React from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import { Progress } from 'semantic-ui-react'
import './Bar.css'
import ContentCard from './components/ContentCard';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
export interface OverviewComponentState {

}

@inject('authStore')
  

@observer
class OverviewPage extends React.Component<any, OverviewComponentState>
  implements BaseView {

  public constructor(props: any) {
    super(props);

  }
  public onViewModelChanged(): void {
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="font-prompt w-full p-12 px-10">
          <div className='flex h-auto space-x-4'>
            <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
              <span className='w-full bg-darkPrimary'>..</span>
            </div>
            <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
              <span>Overview</span>
            </div>
          </div>
          <div className='mt-10'>
            <span>ยินดีต้อนรับ Gan Mongklakorn</span>
          </div>
          <HeaderContent />
          <ContentCard />
          <ContentCard />
        </div>
      </>
    );
  }
}
export default withRouter(OverviewPage);

class HeaderContent extends React.Component{

  public render(): JSX.Element {
    return (
      <>
        
        <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <div className='flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold' style={{ marginTop: 8 }}>
                  เรียนต่อ
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>Database Relationship</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span>( ER Model )</span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                    <Progress percent={30} color='green' size='tiny' />
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
        </div>
      </>
    )
  }
}