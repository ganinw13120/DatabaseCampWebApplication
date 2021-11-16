import React from "react";
import '../app/applayout.css';
import HalfLeftLogo from '../../../assets/halfleftlogo.png';
import HalfRightLogo from '../../../assets/halfrightlogo.png';
import { AppstoreOutlined, FileTextOutlined, BarsOutlined, UserOutlined, LogoutOutlined, RightOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import Tooltip from '@mui/material/Tooltip';

interface SidebarState {
  isExpand: boolean
}


@inject('authStore')
@inject('appStore')
@observer
class Sidebar extends React.Component <any, SidebarState>{
  onLogout() {
    this.props.authStore.Logout();
    this.props.history.push('/login');
  }
  onClickPage(url : string): void {
    this.props.history.push('/' + url);
  }
  render(): JSX.Element {
    const { isExpand } = this.props.appStore.store;
    const widthBoxStyle = { width: isExpand ? 320 : 90 };
    const { userData } = this.props.authStore.store;
    return <>
      <div className='flex-none sticky md:block hidden top-0 bg-primary text-white h-screen z-20' style={{ boxShadow: '0 4px 4px #000', transition: "width 1s", ...widthBoxStyle}}>
        <div className={`cursor-pointer flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-3'} `} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}} onClick={() => { this.onClickPage('overview') }}>
          <img src={HalfLeftLogo} alt="Logo" className='mx-auto w-auto h-16' />
          <img src={HalfRightLogo} alt="Logo" className='m-auto w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0, width : isExpand ? '' : ''}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={isExpand} text='ภาพรวมเนื้อหา' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview') }} />
          
          <SideItem isExpand={isExpand} text='การทดสอบ'  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination') }}/>
          <SideItem  isExpand={isExpand} text='จัดลำดับคะแนน'  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking') }}/>
        </div>
        <div className='absolute bottom-0 mb-8' style={{...widthBoxStyle, transition: "width 1s"}}>
          <div className='w-12 h-24'>
            <div className='bg-darkPrimary toggleBtn  text-center align-middle justify-center' onClick={() => {
              this.props.appStore.setExpand(!isExpand);
            }} style={{ transition: 'transform .2s ease-in-out', transform: isExpand ? '' : 'rotate(180deg)' }}>
              <RightOutlined  style={{fontSize:25}} />
            </div>
          </div>
          <SideItem className='z-10' isExpand={isExpand} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('profile?id=' + userData.user_id) }}/>
          <SideItem className='z-10' isExpand={isExpand} text='ออกจากระบบ' icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.onLogout();}} />
        </div>
      </div>
      <div>
        
      </div>
      <div className='absolute hidden top-0 h-screen bg-primary w-full transition-all z-10'>
        <div className={`cursor-pointer flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-3'} `} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}} onClick={() => { this.onClickPage('overview') }}>
          <img src={HalfLeftLogo} alt="Logo" className='mx-auto w-auto h-16' />
          <img src={HalfRightLogo} alt="Logo" className='m-auto w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0, width : isExpand ? '' : ''}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={isExpand} text='ภาพรวมเนื้อหา' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview') }} />
          <SideItem isExpand={isExpand} text='การทดสอบ'  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination') }}/>
          <SideItem  isExpand={isExpand} text='จัดลำดับคะแนน'  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking') }}/>
          <SideItem className='z-10' isExpand={isExpand} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('profile?id=' + userData.user_id) }}/>
          <SideItem className='z-10' isExpand={isExpand} text='ออกจากระบบ' icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.onLogout();}} />
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