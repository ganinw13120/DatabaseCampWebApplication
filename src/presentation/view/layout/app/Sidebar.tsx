import React from "react";
import '../app/applayout.css';
import HalfLeftLogo from '../../../assets/halfleftlogo.png';
import HalfRightLogo from '../../../assets/halfrightlogo.png';
import { AppstoreOutlined, FileTextOutlined, BarsOutlined, UserOutlined, LogoutOutlined, RightOutlined } from '@ant-design/icons';

interface SidebarState {
  isExpand: boolean
}

export default class Sidebar extends React.Component <any, SidebarState>{
  constructor(props : any) {
    super(props)
    this.state = {
      isExpand : true,
    }
  }
  render(): JSX.Element {
    const { isExpand } = this.state;
    const widthBoxStyle = { width: isExpand ? 320 : 90, transition: "width 1s" };
    return <>
      <div className='flex flex-row md:block hidden bg-primary text-white h-screen' style={{ boxShadow: '0 4px 4px #000', ...widthBoxStyle}}>
        <div className={`flex flex-none inline h-auto pb-7 mt-7 w-8/12 mx-auto ${isExpand ? '' : 'pl-2'} gap-3`} style={{borderBottom:'0.5px solid #BBBFC0', transition: "all 1s"}}>
          <img src={HalfLeftLogo} alt="Logo" className='w-auto h-14' />
          <img src={HalfRightLogo} alt="Logo" className='w-auto h-14' style={{transition: "all 1s", opacity : isExpand ? 1 : 0}}/>
        </div>
        <div className="pt-5 grid grid-rows-3 gap-5">
          <SideItem isExpand={isExpand} text='Overview' icon={<AppstoreOutlined style={{ fontSize: 25 }} />} />
          <SideItem isExpand={isExpand} text='Examination'  icon={<FileTextOutlined  style={{fontSize:25}} />} />
          <SideItem  isExpand={isExpand} text='Point Ranking'  icon={<BarsOutlined  style={{fontSize:25}} />} />
        </div>
        <div className='absolute bottom-0 mb-8' style={widthBoxStyle}>
          <div className='w-12 h-24'>
            <div className='bg-darkPrimary toggleBtn  text-center align-middle justify-center' onClick={() => {
              console.log(this.state)
              this.setState({
                isExpand : !isExpand
              })
            }} style={{transition : 'transform .2s ease-in-out', transform: isExpand ? '' : 'rotate(180deg)' }}>
              <RightOutlined  style={{fontSize:25}} />
            </div>
          </div>
          <SideItem  isExpand={isExpand} text='Gan Mongklakorn...' icon={<UserOutlined  style={{fontSize:25}} />} />
          <SideItem  isExpand={isExpand} text='ออกจากระบบ' icon={<LogoutOutlined  style={{fontSize:25}} />} />
        </div>
      </div>
    </>
  }
}

class SideItem extends React.Component<any>{
  render(): JSX.Element {
    const {isExpand, icon, text} = this.props
    return (
      <>
        <div className=' truncate flex w-full mx-auto sideitem h-auto py-3  text-center align-middle justify-center ' onClick={this.props.onClick}>
          <div className={` flex pl-${isExpand ? '0' : '3'} w-9/12 text-left h-full text-center`} style={{ transition: 'padding 1s' }}>
            <div>
                {icon}
            </div>
            <div className='itemtext inline' style={{transition: "opacity 1s", opacity : isExpand ? 1 : 0}}>
              <span className="ml-5 tracking-wider  truncate ">{text}</span>
            </div>
          </div>
        </div>
      </>
    )
  }
}