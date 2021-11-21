import { Component, ReactElement } from 'react';
import BaseView from '@view/BaseView';

import Profilehead from '@assets/image-7.png';
import ProfilenameEdit from '@assets/nameEditProfile.png';
import star from '@assets/starProfile.png';
import hat from '@assets/hat.png';

import './profile.css';

import ProfileViewModel from '@view-model/profile/ProfileViewModel';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Skeleton from '@mui/material/Skeleton';

import { User } from '@model/User';

import { Modal, Button, Form, Input } from 'antd';
import { AppStore } from '@store/stores/AppStore/AppStore';
import { AuthStore } from '@store/stores/AuthStore/AuthStore';
import { ProfileStore } from '@store/stores/ProfileStore/ProfileStore';


export interface IProfilePage extends BaseView {
  props : ProfilePageProps,
}

interface ProfilePageProps extends RouteComponentProps <{
  id : string
}> {
  appStore ?: AppStore,
  profileStore ?: ProfileStore,
  authStore ?: AuthStore,
}

interface ProfileComponentState {
  data: User | null,
  isShowModal: boolean,
  textAlertModal: string,
}

var monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

@inject('profileStore')
@inject('authStore')
@inject('appStore')
@observer
class ProfilePage extends Component<ProfilePageProps, ProfileComponentState>
  implements IProfilePage {
  private profileViewModel: ProfileViewModel;
  public constructor(props: any) {
    super(props);
    this.profileViewModel = new ProfileViewModel();
    this.state = {
      data: null,
      isShowModal: false,
      textAlertModal: ''
    }
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }
  componentDidUpdate(): void {
    const { data } = this.state;
    const profileId = this.props.match.params?.id;
    if (data && profileId && profileId !== data.user_id.toString()) {
      this.profileViewModel.attachView(this);
    }
  }

  public componentDidMount(): void {
    const { isExpand } = this.props.appStore!.store;
    if (!isExpand) {
      this.props.appStore!.setExpandWithDelay(true)
    }
    this.props.appStore!.hideStepper()
    this.profileViewModel.attachView(this);
  }

  public onViewModelChanged(): void {
    const alertText = this.profileViewModel.alertText;
    this.setState({
      data: this.profileViewModel.profileData,
      isShowModal: alertText !== '',
      textAlertModal: alertText
    })
  }

  private showEditModal(): void {
    this.setState({
      isShowModal: true
    })
  }

  private hideEditModal(): void {
    this.setState({
      isShowModal: false
    })
  }

  onFinishFailed = () => {
  }

  public render(): JSX.Element {
    const { data, isShowModal, textAlertModal } = this.state;
    const date = data ? new Date(data.created_timestamp) : ''
    const dateString = date ? +date.getDate() + " " + monthNamesThai[date.getMonth()] + "  " + date.getFullYear() : '';
    const { userData } = this.props.authStore!.store;
    return (
      <>
        <Modal
          visible={isShowModal}
          onCancel={this.hideEditModal}
          footer={[
            <>
              <div className='flex font-prompt'>
                <div className=' w-32 ml-auto  rounded-lg'>
                  <Button key="back" ghost className='w-full ' onClick={this.hideEditModal}>
                    <span className='text-black'>ยกเลิก</span>
                  </Button>
                </div>
                <div className='bg-primary w-32 ml-4 rounded-lg'>
                  <Button key="back" ghost className='w-full' onClick={this.profileViewModel.submitChangeName}>
                    บันทึก
                  </Button>
                </div>
              </div>
            </>,
          ]}
        >
          <div className='font-prompt gap-9'>
            <div className='mb-10'>เปลี่ยนชื่อ </div>
            <Form
              ref={this.profileViewModel.formRef}
              name="basic"
              autoComplete="off"
              className='mt-10'
            >
              <Form.Item name="name" className='mt-10'>
                <Input className='w-full' size="large" placeholder="ชื่อ" defaultValue={data?.name} />
              </Form.Item>
            </Form>
          </div>
          <span className='text-red-500'> {textAlertModal} </span>
        </Modal>
        <div className="font-prompt bg-bg w-full h-auto">
          <div className='h-full text-white text-center align-middle justify-center '>
            <img src={Profilehead} alt="Logo2" className='object-none pt-20 mx-auto my-auto text-center' />
            <div className='text-2xl md:text-5xl text-darkPrimary font-normal tracking-wider py-6 border-b-2 mx-16 border-gray'>
              {data && userData ? <>
                <span>{data.name}
                  {userData.user_id === data.user_id && <img src={ProfilenameEdit} alt="Logo3" className='pl-4 inline object-none mx-auto my-auto text-center cursor-pointer' onClick={this.showEditModal} />}
                </span>
              </> : <>
                <Skeleton variant="text" className="w-3/4 mx-auto" />
              </>}
            </div>
            {/* <img src={lineLine} alt="Logo4" className='pl-4 inline object-none mx-auto my-auto text-center w-3/4' /> */}
            <div className='text-base text-grayPrimary font-normal tracking-wider mt-6'>
              {data ? <>
                <span>เข้าร่วมเมื่อ {dateString}
                </span>
              </> : <>
                <Skeleton variant="text" className="w-3/4 mx-auto" />
              </>}
            </div>

            <div className='rounded-lg outline-blackProfile drop-shadow-shadowProfile h-20 w-5/6 md:w-2/4 mx-auto bg-white my-24 flex' style={{ boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)' }}>

              {data ? <>
                <div className='w-auto flex'>
                  <img src={star} alt="Logo4" className='object-none mx-auto my-auto ml-2 md:ml-8' />
                  <span className='ml-6 text-sm md:text-lg text-darkSecondary font-normal tracking-wider text-left my-auto '>{data.point.toLocaleString()} คะแนน</span>
                </div>
                <div className='flex-grow'>
                </div>
                <div className='w-auto flex'>
                  <img src={hat} alt="Logo4" className='object-none mx-auto my-auto' />
                  <span className='ml-2 pr-10 md:ml-6 text-sm md:text-lg text-darkSecondary font-normal tracking-wider text-left my-auto'>{data.activity_count} กิจกรรม</span>
                </div>
              </> : <>
                <Skeleton variant="text" className="w-5/6 mx-auto" />
              </>}
            </div>
            {data ? <>
              <div className=' text-xl text-darkPrimary font-prompt font-semibold tracking-wider inline px-2 '>
                <span>My Badge ({data.badges.filter(e => e.is_collect).length})</span>
              </div>
            </> : <>
              <Skeleton variant="text" className="w-1/6 mx-auto" />
            </>}
            {data && <>
              <div className='  mt-16 w-auto md:flex'>
                <div className='flex-grow'>
                </div>
                {(() => {
                  let badgeList: ReactElement[] = [];
                  data.badges.forEach((e: any, key: number) => {
                    badgeList.push(<Badge Icon={e.icon_path} displayText={e.name} isCollect={e.is_collect} key={key} />)
                  })
                  return badgeList
                })()}
                <div className='flex-grow'>
                </div>
              </div>
            </>}
          </div>
        </div>

      </>
    );
  }
}
export default withRouter(ProfilePage);

class Badge extends Component<any, any> {
  render(): JSX.Element {
    const { Icon, displayText, isCollect } = this.props;
    return (
      <>
        <div className='object-contain my-auto text-center mx-5'>
          <div className=''>
            <img src={Icon} alt="Logo8" className={`h-36 ${isCollect ? '' : 'monochrome'} mx-auto`} />
          </div>
          <div className=' text-lg text-darkSecondary font-normal tracking-wider mt-6'>
            <span>{displayText}</span>
          </div>
        </div>
      </>
    )
  }
}