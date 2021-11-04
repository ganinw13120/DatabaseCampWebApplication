import React from "react";
import '../app/applayout.css';
import HalfLeftLogo from '../../../assets/halfleftlogo.png';
import HalfRightLogo from '../../../assets/halfrightlogo.png';
import { AppstoreOutlined, FileTextOutlined, BarsOutlined, UserOutlined, LogoutOutlined, RightOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

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
    const widthBoxStyle = { width: isExpand ? 320 : 90, transition: "width 1s" };
    const { userData } = this.props.authStore.store;
    return <>
      <div className='sticky top-0 flex flex-row md:block hidden bg-primary text-white h-screen' style={{ boxShadow: '0 4px 4px #000', ...widthBoxStyle}}>
        <div className={`flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-2'} gap-3`} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 0.5s"}}>
          <img src={HalfLeftLogo} alt="Logo" className='w-auto h-14' />
          <img src={HalfRightLogo} alt="Logo" className='w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={isExpand} text='Overview' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} onClick={() => { this.onClickPage('overview') }} />
          <SideItem isExpand={isExpand} text='Examination'  icon={<FileTextOutlined  style={{fontSize:25}} />} />
          <SideItem  isExpand={isExpand} text='Point Ranking'  icon={<BarsOutlined  style={{fontSize:25}} />} />
        </div>
        <div className='absolute bottom-0 mb-8' style={widthBoxStyle}>
          <div className='w-12 h-24'>
            <div className='bg-darkPrimary toggleBtn  text-center align-middle justify-center' onClick={() => {
              this.props.appStore.setStore({ isExpand: !isExpand });
            }} style={{ transition: 'transform .2s ease-in-out', transform: isExpand ? '' : 'rotate(180deg)' }}>
              <RightOutlined  style={{fontSize:25}} />
            </div>
          </div>
          <SideItem className='z-10' isExpand={isExpand} text={userData?.name} icon={<UserOutlined  style={{fontSize:25}} />} />
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
      </>
    )
  }
}