import React, { ReactElement } from 'react';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const images = [
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/lecture.PNG" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/255320565_585943135947303_7779091040160912802_n.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/255333815_429245658552866_8449361491653152883_n.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/255487567_311424903877521_1895775101799180789_n.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/255876676_976203003104708_3235251087368652750_n.png" },
  { url: "https://databasecamp-public.s3.ap-southeast-1.amazonaws.com/example/255370667_272475894807346_8730018879687982747_n.png" },
];

export default class Example extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { width: 0 };
  }
  componentDidMount() {
    this.getDimensions(); 
    window.addEventListener('resize', this.getDimensions); 
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions); 
  }

  getDimensions = () => {
    this.setState({ width: window.innerWidth });
  }
  public render(): JSX.Element {
    const { width } = this.state
    let Swidth: number = width * 0.7;
    return (
      <>
        <div className='w-full bg-bg-dark pt-44 mb-16 pb-16 font-prompt'> 
            <div className='w-full text-center' >
              <span className='border-white mx-auto shadow-text text-3xl md:text-4xl lg:text-5xl text-darkPrimary font-semibold tracking-wider'  style={{borderBottom:'0.7px solid #000000'}}>ตัวอย่างเนื้อหา</span>
            </div>
          <div className='text-center mt-20 w-auto h-auto'>
            <div className=" slider mt-10" style={{width : Swidth, height : (Swidth / 1.77) + 100}}>
              <AwesomeSlider mobileTouch={true}>
                {(()=>{
                  const imgList : ReactElement[] = [];
                  images.forEach((e: any) => {
                    imgList.push(<>
                      <div>
                        <img alt='example' src={e.url} />
                      </div>
                    </>)
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
