import React from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import { Progress } from 'semantic-ui-react'
import './Bar.css'
export interface OverviewComponentState {

}

export default class OverviewPage extends React.Component<any, OverviewComponentState>
  implements BaseView {

  public constructor(props: any) {
    super(props);

  }

  public componentDidMount(): void {
  }

  public onViewModelChanged(): void {
  }

  onFinishFailed = () => {
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
          <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <div className='flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold' style={{marginTop:8}}>
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
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:3}}>
                  แนะนำ
                </div>
              </div>
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:3}}>
                  ล่าสุด
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>ER Model</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - ER Diagram
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={100} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>100%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Entity
                </div>
                <div className='flex-none bg-blueSecondary h-2/6 w-20 align-middle my-auto ml-7 rounded'>
                <div className=' font-regular text-white' style={{marginTop:3}}>
                  ล่าสุด
                </div>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Relationship
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Attributes
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Relational Keys
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>
            
            <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:3}}>
                  แนะนำ
                </div>
              </div>
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:3}}>
                  ล่าสุด
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>ER Model</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - ER Diagram
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={100} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>100%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Entity
                </div>
                <div className='flex-none bg-blueSecondary h-2/6 w-20 align-middle my-auto ml-7 rounded'>
                <div className=' font-regular text-white' style={{marginTop:3}}>
                  ล่าสุด
                </div>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Relationship
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Database Attributes
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
                  - Relational Keys
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={0} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>0%</span>
                </div>
              </div>
            </div>

          </div>
          </div>
        </div>
      </>
    );
  }
}