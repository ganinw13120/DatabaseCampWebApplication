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
        <div className="font-prompt bg-bg w-full h-auto">
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

            <div className='rounded-lg outline-blackProfile drop-shadow-shadowProfile h-20 w-5/6 md:w-2/4 mx-auto bg-white my-24 flex'  style={{ boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)' }}>
              <div className='w-auto flex'>
                <img src={star} alt="Logo4" className='object-none mx-auto my-auto ml-8' />
                <span className='ml-6 text-lg text-darkSecondary font-normal tracking-wider w-44 text-left my-auto '>1,324 คะแนน</span>
              </div>
              <div className='flex-grow'>
              </div>
              <div className='w-auto flex'>
                <img src={hat} alt="Logo4" className='object-none mx-auto my-auto' />
                <span className='ml-6 text-lg text-darkSecondary font-normal tracking-wider w-32 text-left my-auto'>3 บทเรียน</span>
              </div>
            </div>
            <div className=' text-xl text-darkPrimary font-prompt font-semibold tracking-wider inline px-2 '>
              <span>My Badge (5)</span>
            </div>
            <div className='  mt-16 w-auto flex'>
              <div className='flex-grow'>
              </div>
              <Badge Icon={god_of} displayText={'เทพแห่ง ER-Model'} />
              <Badge Icon={database_design_badge} displayText={'เทพแห่ง ER-Model'} />
              <Badge Icon={badgePic} displayText={'เทพแห่ง ER-Model'} />
              <div className='flex-grow'>
              </div>
            </div>





          </div>

        </div>

      </>
    );
  }
}

class Badge extends React.Component <any, any> {
  render(): JSX.Element {
    const { Icon, displayText } = this.props;
    return (
      <>
      <div className='object-contain my-auto text-center mx-5'>
        <div className=''>
          <img src={Icon} alt="Logo8" className='h-36' />
        </div>
        <div className=' text-lg text-darkSecondary font-normal tracking-wider mt-6'>
          <span>{displayText}</span>
        </div>
      </div>
      </>
    )
  }
}