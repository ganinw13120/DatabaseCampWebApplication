import React from "react";
import '../app/applayout.css';
import HalfLeftLogo from '../../../assets/halfleftlogo.png';
import HalfRightLogo from '../../../assets/halfrightlogo.png';
import { AppstoreOutlined, FileTextOutlined, BarsOutlined, UserOutlined, LogoutOutlined, RightOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';


import Tooltip from '@mui/material/Tooltip';
import { AppStore } from "@store/stores/AppStore/AppStore";
import { AuthStore } from '@store/stores/AuthStore/AuthStore';

interface SidebarState {
  isMobileExpand: boolean
}

interface OverviewProps extends RouteComponentProps {
  appStore ?: AppStore,
  authStore ?: AuthStore,
}

@inject('authStore')
@inject('appStore')
@observer
class Sidebar extends React.Component <OverviewProps, SidebarState>{
  constructor (props : OverviewProps) {
    super (props);
    this.state = {
      isMobileExpand : false
    }
  }
  onLogout() {
    this.props.authStore!.Logout();
    this.props.history.push('/login');
  }
  onClickPage(url : string): void {
    this.props.history.push('/' + url);
  }
  setMobileExpand (target : boolean) : void {
    this.setState({
      isMobileExpand : target
    })
  }
  render(): JSX.Element {
    const { isExpand } = this.props.appStore!.store;
    const {isMobileExpand} = this.state;
    const widthBoxStyle = { width: isExpand ? 320 : 90 };
    const { userData } = this.props.authStore!.store;
    return <>
      <div className='flex-none sticky md:block hidden top-0 bg-primary text-white h-screen z-40' style={{ boxShadow: '0 4px 4px #000', transition: "width 1s", ...widthBoxStyle}}>
        <div className={`cursor-pointer flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-3'} `} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}} onClick={() => { this.onClickPage('overview') }}>
          <img src={HalfLeftLogo} alt="Logo" className='mx-auto w-auto h-16' />
          <img src={HalfRightLogo} alt="Logo" className='m-auto w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0, width : isExpand ? '' : ''}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={isExpand} text='ภาพรวมเนื้อหา' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview') }} />
          
          <SideItem isExpand={isExpand} text='การทดสอบ'  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination/overview') }}/>
          <SideItem  isExpand={isExpand} text='จัดลำดับคะแนน'  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking') }}/>
        </div>
        <div className='absolute bottom-0 mb-8' style={{...widthBoxStyle, transition: "width 1s"}}>
          <div className='w-12 h-24'>
            <div className='bg-darkPrimary toggleBtn  text-center align-middle justify-center' onClick={() => {
              this.props.appStore!.setExpand(!isExpand);
            }} style={{ transition: 'transform .2s ease-in-out', transform: isExpand ? '' : 'rotate(180deg)' }}>
              <RightOutlined  style={{fontSize:25}} />
            </div>
          </div>
          <SideItem className='z-10' isExpand={isExpand} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('profile/' + userData?.user_id) }}/>
          <SideItem className='z-10' isExpand={isExpand} text='ออกจากระบบ' icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.onLogout();}} />
        </div>
      </div>
      <div className='bg-primary md:hidden px-8 py-4 w-full' style={{boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)'}}>
        <div  className='my-auto text-white' >
        <MenuOutlined  style={{ fontSize: 40 }} onClick={()=>{this.setMobileExpand(!isMobileExpand);}}/>
        </div>
      </div>
      <div className={`absolute ${isMobileExpand ? ' ' : 'hidden'} md:hidden top-0 h-screen bg-primary w-full transition-all z-50`} >
        <div className={`cursor-pointer flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-3'} `} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}} onClick={() => { this.onClickPage('overview') }}>
          <img src={HalfLeftLogo} alt="Logo" className='ml-auto w-auto h-16' />
          <img src={HalfRightLogo} alt="Logo" className='mr-auto w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0, width : isExpand ? '' : ''}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={true} text='ภาพรวมเนื้อหา' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview');this.setMobileExpand(false); }} />
          <SideItem isExpand={true} text='การทดสอบ'  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination/overview');this.setMobileExpand(false); }}/>
          <SideItem  isExpand={true} text='จัดลำดับคะแนน'  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking');this.setMobileExpand(false); }}/>
          <SideItem className='z-10' isExpand={true} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('profile/' + userData?.user_id);this.setMobileExpand(false); }}/>
          <SideItem className='z-10' isExpand={true} text='ออกจากระบบ' icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.onLogout();}} />
          <SideItem className='z-10' isExpand={true} text='ปิดหน้าต่าง' icon={<CloseOutlined  style={{ fontSize: 25 }} className='my-auto'   />}  onClick={()=>{this.setMobileExpand(false); }} />
        </div>
      </div>
    </>
  }
}

export default withRouter(Sidebar);


@inject('authStore')
@observer
class SideItem extends React.Component<any>{
  render(): JSX.Element {
    const { isLoading } = this.props.authStore.store;
    const { isExpand, icon, text, onClick, className } = this.props;
    return (
      <>
        <Tooltip title={text ? text : ' '} placement="right">
        <div className={`truncate flex w-full mx-auto sideitem h-auto py-3  text-center align-middle justify-center ${className}`} onClick={() => { if (onClick) onClick();}}>
          <div className={` flex pl-${isExpand ? '0' : '3'} w-9/12 text-left h-full text-center`} style={{ transition: 'padding 1s' }}>
            {isLoading ? <Skeleton variant="text" className='w-full' /> : <>
              <div>
                  {icon}
              </div>
              <div className='itemtext inline' style={{transition: "opacity 1s", opacity : isExpand ? 1 : 0}}>
                <span className="ml-5 tracking-wider  truncate ">{text}</span>
              </div>
            </>}
          </div>
        </div>
        </Tooltip>
      </>
    )
  }
}
