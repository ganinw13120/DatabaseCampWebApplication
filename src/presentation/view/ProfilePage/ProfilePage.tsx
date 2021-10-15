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

export interface ProfileComponentState {

}

export default class ProfilePage extends React.Component<any, ProfileComponentState>
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
          <div className='h-full text-white text-center align-middle justify-center '>
                <img src={Profilehead} alt="Logo2" className='object-none pt-20 mx-auto my-auto text-center' />
                <div className='text-5xl text-darkPrimary font-normal tracking-wider pt-6'>
                    <span>แกน มงคลากร
                    <img src={ProfilenameEdit} alt="Logo3" className='pl-4 inline object-none mx-auto my-auto text-center' />
                    </span>
                  </div>
                  <img src={lineLine} alt="Logo4" className='pl-4 inline object-none mx-auto my-auto text-center' />
                  <div className='text-base text-grayPrimary font-normal tracking-wider'>
                    <span>เข้าร่วมเมื่อ 18 ส.ค. 2564
                      </span>
                      </div>
                      <br></br><br></br>
                      
                      <div className = 'rounded-lg outline-blackProfile drop-shadow-shadowProfile h-20 w-2/4 sm mx-auto text-left filter bg-white'> 
                     <div>
                      <img src={star} alt="Logo4" className='object-none mx-auto my-auto  inline text-left pl-2 py-5'/>
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
