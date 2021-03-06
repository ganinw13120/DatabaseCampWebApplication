// ContentGroup.tsx
/**
 * This file contains components, relaed to contentGroup in overview page.
*/

import React from 'react';

import Content from './Content';

import { Progress } from 'semantic-ui-react'
import { ContentGroup as ContentGroupType, Content as ContentType } from '@model/Learning';

type ContentGroupProps = {
  data : ContentGroupType,
  isRecommend : boolean
}

export default class ContentGroup extends React.Component<ContentGroupProps, {}> {
  public render(): JSX.Element {
    const { contents, group_name, is_lasted, progress } = this.props.data;
    return (
      <>
        <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-primary w-full h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              { this.props.isRecommend &&
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{ marginTop: 2 }}>
                  แนะนำ
                </div>
              </div> }
              { is_lasted &&
              <div className='flex-none bg-white h-2/6 w-24 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold text-blueSecondary' style={{ marginTop: 2 }}>
                ล่าสุด
                </div>
              </div> }
              <div className='flex-none my-auto ml-10 text-white text-xl font-medium tracking-wider'>
                <span>{group_name}</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span></span>
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
          {(() => {
            let contentList: any = [];
            contents.slice().sort((a: any, b: any) => a.content_id - b.content_id).forEach((content: ContentType, key: number) => {
              contentList.push(<Content data={content} key={key} />)
            })
            return contentList;
          })()}
        </div>
      </>
    );
  }
}
