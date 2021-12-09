// Sidebar.tsx
/**
 * This file contains components, related to sidebar used in application.
*/

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

import {SIDEBAR_OVERVIEW, SIDEBAR_EXAMINATION, SIDEBAR_RANKING, SIDEBAR_LOGOUT, SIDEBAR_CLOSE, WARNING_LOGOUT_ACCEPT, WARNING_LOGOUT_CANCLE, WARNING_LOGOUT_DESCRIPTION, WARNING_LOGOUT_TITLE} from '@constant/text';
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";

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
  private swal: ReactSweetAlert;
  constructor (props : OverviewProps) {
    super (props);
    this.state = {
      isMobileExpand : false
    }
    this.swal = withReactContent(Swal);
  }

  /**
   * On user logout, update store datas, push user back to login page
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private onLogout() {
    this.props.authStore!.Logout();
    this.props.history.push('/login');
  }
  
  /**
   * On user select sidebar item, take user to target url
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private onClickPage(url : string): void {
    this.props.history.push('/' + url);
  }
  
  /**
   * On user click expand on mobile view, expand mobile navigation bar
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private setMobileExpand (target : boolean) : void {
    this.setState({
      isMobileExpand : target
    })
  }
  
  /**
   * On user select logout item, show confirmation popup
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private showLogoutPopup(): void {
    this.swal.fire({
      title: WARNING_LOGOUT_TITLE,
      text: WARNING_LOGOUT_DESCRIPTION,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005FB7',
      cancelButtonColor: '#d33',
      confirmButtonText: WARNING_LOGOUT_ACCEPT,
      cancelButtonText: WARNING_LOGOUT_CANCLE,
    }).then((result: any) => {
      if (result.isConfirmed)
        this.onLogout();
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
          <SideItem isExpand={isExpand} text={SIDEBAR_OVERVIEW} icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview') }} />
          
          <SideItem isExpand={isExpand} text={SIDEBAR_EXAMINATION}  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination/overview') }}/>
          <SideItem  isExpand={isExpand} text={SIDEBAR_RANKING}  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking') }}/>
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
          <SideItem className='z-10' isExpand={isExpand} text={SIDEBAR_LOGOUT} icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.showLogoutPopup();}} />
        </div>
      </div>
      <div className={`bg-primary ${isMobileExpand ? 'hidden' : ''} md:hidden px-8 py-4 w-full`}>
        <div  className='my-auto text-white' >
        <MenuOutlined  style={{ fontSize: 40 }} onClick={()=>{this.setMobileExpand(!isMobileExpand);}}/>
        </div>
      </div>
      <div className={`absolute ${isMobileExpand ? ' ' : 'hidden'} sticky md:hidden top-0 h-screen bg-primary w-full transition-all z-50`} >
        <div className={`cursor-pointer flex flex-none inline h-auto pb-7 pt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-3'} `} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}} onClick={() => { this.onClickPage('overview') }}>
          <img src={HalfLeftLogo} alt="Logo" className='ml-auto w-auto h-16' />
          <img src={HalfRightLogo} alt="Logo" className='mr-auto w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0, width : isExpand ? '' : ''}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={true} text={SIDEBAR_OVERVIEW} icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview');this.setMobileExpand(false); }} />
          <SideItem isExpand={true} text={SIDEBAR_EXAMINATION}  icon={<FileTextOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('examination/overview');this.setMobileExpand(false); }}/>
          <SideItem  isExpand={true} text={SIDEBAR_RANKING}  icon={<BarsOutlined  style={{fontSize:25}} />} onClick={() => { this.onClickPage('ranking');this.setMobileExpand(false); }}/>
          <SideItem className='z-10' isExpand={true} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />}  onClick={() => { this.onClickPage('profile/' + userData?.user_id);this.setMobileExpand(false); }}/>
          <SideItem className='z-10' isExpand={true} text={SIDEBAR_LOGOUT} icon={<LogoutOutlined style={{ fontSize: 25 }}/>}  onClick={() => { this.showLogoutPopup();}} />
          <SideItem className='z-10' isExpand={true} text={SIDEBAR_CLOSE} icon={<CloseOutlined  style={{ fontSize: 25 }} className='my-auto'   />}  onClick={()=>{this.setMobileExpand(false); }} />
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
