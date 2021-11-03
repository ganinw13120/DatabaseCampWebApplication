import React from 'react';


export default class Requirement extends React.Component<any, any> {
  public constructor(props: any) {
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
    const { width } = this.state;
    return (<>
      <div className='bg-white py-4' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className='text-lg text-darkPrimary w-96 font-semibold tracking-wider pt-4 px-10'>
          <span>เนื้อหา - Database Entity</span>
        </div>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-96 text-3xl text-darkPrimary font-semibold tracking-wider py-6 -mx-4'>
            <span>ความต้องการของระบบ</span>
          </div>
        </div>
        <div className='font-sarabun text-xl text-wrap mx-auto mt-10 tracking-wider' style={{ width: width * 0.8 * 0.5 * 0.8 }}>
          <p>
          เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย 

          </p>
        </div>
      </div>
    </>)
  }
}