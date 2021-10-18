import React from 'react';
import BaseView from '../BaseView';
import Profilehead from '../../assets/image-7.png';
import ProfilenameEdit from '../../assets/nameEditProfile.png';
import lineLine from '../../assets/Line.png';
import star from '../../assets/starProfile.png';
import hat from '../../assets/hat.png';
import database_design_badge from '../../assets/database_designer3.png';
import god_of from '../../assets/god_of_er_model3.png';
import badgePic from '../../assets/badge.png';
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
         <div className="font-prompt bg-bg w-screen h-screen">
         <div className='flex space-x-4 -mx-96 '>
                    <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
                      <span className='w-10 bg-darkPrimary'>..</span>
                    </div>
                    <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-6'>
                      <span>Overview</span>
                    </div>
              
                  </div>
                  <br></br><br></br>
                  <div className='text-base text-darkPrimary font-normal tracking-wider pr-96 -mx-96'>
                    <span>ยินดีต้อนรับ คุณ Gan Mongklakorn</span>
                    </div>
                    <br></br><br></br><br></br>
                    <div className='h-full text-white text-left align-left justify-left'>
                      <div className = 'rounded-none outline-none drop-shadow-shadowProfile h-20 w-2/4 align-middle text-center justify-center bg-primary -mx-96'> 
                     
                      <div className = 'rounded-none outline-none drop-shadow-shadowProfile h-10 w-1/4 text-center bg-red-500 mx-2 my-48 '>
                        
                        </div>
                      </div>
                    </div>
                         <div className='h-full text-white text-center align-middle justify-center '>
                         <br></br><br></br>
                      
                         <div className = 'rounded-none outline-none drop-shadow-shadowProfile h-20 w-2/4 sm mx-auto text-left filter bg-bluePrimary'> 
                         <div>
                           
                           <div className=' text-lg text-darkSecondary font-normal tracking-wider inline px-2 '>
                           <span>1,324 คะแนน</span>
                        </div>
                        </div>
                        <div className =' inline pl-40 py-5 text-right  w-full h-auto '>
                          <img src={hat} alt="Logo5" className='my-auto inline'/>
                        </div>
                           </div>
                      <br></br><br></br><br></br>
                      <div className=' text-lg text-darkPrimary font-prompt font-medium tracking-wider inline px-2 '>
                        <span>My Badge (5)</span>
                        </div>
                        <br></br><br></br><br></br>
                        
                        <div className='flex inline'>
                        <div className='object-contain my-auto text-left inline pl-60 ml-40'>
                        <div className=''>
                        <img src={god_of} alt="Logo6" className='h-36'/>
                        </div>
                           <div className=' text-lg text-darkSecondary font-normal tracking-wider'>
                          <span>เทพแห่ง ER-Model</span>
                        </div>
                        </div>

                        <div className='object-contain my-auto text-left inline pl-14'>
                        <div className=''>
                        <img src={database_design_badge} alt="Logo7" className='h-36'/>
                        </div>
                           <div className=' text-lg text-darkSecondary font-normal tracking-wider'>
                          <span>นักออกแบบฐานข้อมูล</span>
                        </div>
                        </div>
                        
                        <div className='object-contain my-auto text-left inline pl-14'>
                        <div className=''>
                        <img src={badgePic} alt="Logo8" className='h-36'/>
                        </div>
                           <div className=' text-lg text-darkSecondary font-normal tracking-wider px-6'>
                          <span>กินพิซซ่าฮัท</span>
                            </div>
                         </div>
                         </div>
                         
                        
                        
                        
                        
              </div>
            </div>
      </>
    );
  }
}
