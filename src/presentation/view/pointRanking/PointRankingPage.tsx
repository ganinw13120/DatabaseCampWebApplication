import React from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import { Progress } from 'semantic-ui-react'

export interface PointComponentState {

}

export default class PointRankingPage extends React.Component<any, PointComponentState>
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
         
          <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <div className='flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:8}}>
                #1150
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>11,505 Points</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{marginTop:8}}>
                #1
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>11,505 Points</span>
                </div>
              </div>
            </div>
            
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #2
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
             <div className=' font-semibold text-darkPrimary mx-16 font-bold' style={{marginTop:16}}>
            
                </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                 
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>69,505 Points</span>
                </div>
              </div>
            </div>
            
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #3
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>65,505 Points</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #4
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>61,505 Points</span>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #5
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>59,505 Points</span>
                </div>
              </div>
            </div>

            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #6
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>57,505 Points</span>
                </div>
              </div>
            </div>

            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #7
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>44,505 Points</span>
                </div>
              </div>
            </div>
            
            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #8
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
               
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>29,505 Points</span>
                </div>
              </div>
            </div>

            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #9
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>12,505 Points</span>
                </div>
              </div>
            </div>

            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #10
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>11,505 Points</span>
                </div>
              </div>
            </div>

            <div className='bg-white w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-primary h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-white' style={{marginTop:8}}>
                #11
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-darkPrimary font-medium text-xl tracking-wider'>
                <span>Gan Mongklakorn</span>
              </div>
                <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
                <div className='flex-none w-auto xl:w-1/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium'>
                  <span className=''>11,505 Points</span>
                </div>
              </div>
            </div>

           
           

          
          </div>
        </div>
      </>
    );
  }
}