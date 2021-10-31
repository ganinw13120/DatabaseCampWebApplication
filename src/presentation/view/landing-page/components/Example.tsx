import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://miro.medium.com/max/578/1*GqKCwu0iDD0h3XRn8OB9Kw.png" },
  { url: "https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/social/reactt-light_1200x628.png?sfvrsn=43eb5f2a_2" },
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
        <div className='w-full bg-bg-dark pt-32 mb-16 font-prompt'> 
          <div className='text-center'>
            <span className='border-white pb-4 mx-auto shadow-text text-xl md:text-3xl lg:text-4xl text-darkPrimary font-normal tracking-wider'  style={{borderBottom:'1px solid #364655'}}>ตัวอย่างการเรียน</span>
          </div>
          <div className='text-center mt-20 w-auto h-auto'>
            <div className=" slider mt-10" style={{width : Swidth, height : (Swidth / 1.77) + 100}}>
              <SimpleImageSlider
                width={Swidth}
                height={Swidth / 1.77}
                images={images}
                showBullets={true}
                showNavs={true}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
