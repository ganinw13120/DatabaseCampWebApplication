import { Content as ContentType } from '@model/Learning';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Progress } from 'semantic-ui-react'

type ContentProps = RouteComponentProps & {
  data  :  ContentType
}

class Content extends React.Component<ContentProps, any> {
  onSelectContent() {
    this.props.history.push('/learning/content/' + this.props.data.content_id);
  }
  public render(): JSX.Element {
    const { data } = this.props;
    const {group_name, progress, is_lasted} = data
    return (
      <>
        <div className='contentlist w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }} onClick={()=>this.onSelectContent()}>
              <div className='font-semibold text-sm md:text-base text-darkPrimary mx-8 md:mx-16 font-bold my-auto'>
                - {group_name}
              </div>
              {is_lasted &&
              <div className='flex-none bg-primary px-4 md:px-0 md:w-24 align-middle my-auto  rounded'>
                <div className=' font-normal text-white' style={{ marginTop: 2 }}>
                ล่าสุด
                </div>
              </div>}
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                    <Progress percent={progress} color='green' size='tiny' />
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto text-darkPrimary font-medium w-16'>
                  <span className=''>{progress}%</span>
                </div>
              </div>
            </div>
      </>
    )
  }
}

export default withRouter(Content);
