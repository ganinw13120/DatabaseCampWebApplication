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
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/1" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/2" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/3" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/4" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/5" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/6" },
  { url: "https://storage.googleapis.com/databasecamp-public/slide-show-example/7" },
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
