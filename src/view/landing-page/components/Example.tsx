// Example.tsx
/**
 * This file contains components, relaed to example section in landing page.
*/

import React, { Component, ReactElement } from 'react';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

/**
 * Images list display on image sldie.
 */
const images = [
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/1.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/2.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/3.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/4.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/5.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/6.png" },
];

export default class Example extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <>
        <div className='w-full bg-bg-dark pt-44 mb-16 pb-16 font-prompt'>
            <div className='w-full text-center' >
              <span className='border-white mx-auto shadow-text text-3xl md:text-4xl lg:text-5xl text-darkPrimary font-semibold tracking-wider'  style={{borderBottom:'0.7px solid #000000'}}>ตัวอย่างเนื้อหา</span>
            </div>
          <div className='text-center mt-20 w-auto h-auto'>
            <div className=" slider mt-10">
              <AwesomeSlider mobileTouch={true}>
                {(()=>{
                  const imgList : ReactElement[] = [];
                  images.forEach((e: any, key : number) => {
                    imgList.push(<React.Fragment key={key}>
                      <div>
                        <img alt='example' src={e.url} key={key} />
                      </div>
                    </React.Fragment>)
                  })
                  return imgList;
                })()}
              </AwesomeSlider>
            </div>
          </div>
        </div>
      </>
    );
  }
}
