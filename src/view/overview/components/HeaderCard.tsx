// HeaderCard.tsx
/**
 * This file contains components, relaed to header card in overview page.
*/

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Progress } from 'semantic-ui-react'

import {Content} from '@model/Learning';

interface HeaderCardProps extends RouteComponentProps {
  data : Content,
}

class HeaderCard extends React.Component<HeaderCardProps, {}>{

  /**
   * On user click continue, load content
   *
   * @remarks
   * This is a part of view component.
   *
   */
  private onClickContinue () : void {
    const {content_id} = this.props.data;
    this.props.history.push('/learning/content/' + content_id);
  }
  public render(): JSX.Element {
    const { content_name, group_name, progress  } = this.props.data;
    return (
      <>
        <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className='flex-none bg-white h-3/6 px-4 md:px-0 md:w-36 align-middle my-auto ml-7 rounded cursor-pointer continuebtn' onClick={() => { this.onClickContinue () }}>
                <div className='font-semibold' style={{ marginTop: 8 }}>
                  เรียนต่อ
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-lg md:text-xl tracking-wider'>
                <span>{content_name}</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span>( {group_name} )</span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                    <Progress percent={progress} color='green' size='tiny' />
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>{progress}%</span>
                </div>
              </div>
            </div>
        </div>
      </>
    )
  }
}
export default withRouter(HeaderCard);