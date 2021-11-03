import React from 'react';
import BaseView from '../BaseView';
import './matching.css';

export default class CompletionPage extends React.Component<any, any>
  implements BaseView {
  public onViewModelChanged(): void {
  }
  public render(): JSX.Element {
    return (
      <>
        <div className='w-full'>
          <ChoiceBox />
          <Question />
          <Question />
          <Question />
        </div>
      </>
    );
  }
}

class Question extends React.Component {
  public render(): JSX.Element {
    return (<>
          <div className='mx-14 text-base text-darkPrimary font-normal my-6'>
            <span className='my-auto inline'>
              1. สมชายต้องทำสมชายต้
            </span>
            <div className='bg-white w-44 h-8 py-2 px-12 mx-4 border border-gray rounded-lg inline'>
              {'   '}
            </div>
            <span className='my-auto inline'>
              เพื่อที่จะบรรลุเป้าหมายนั้น
            </span>
          </div>
    </>)
  }
}

class ChoiceBox extends React.Component {
  public render () : JSX.Element {
    return (<>
      <div className='rounded-lg border border-gray bg-white w-5/6 h-auto mx-auto p-6 grid grid-cols-4 gap-y-6 mb-10' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
        <div className='p-4 bg-white w-32 text-center rounded-lg '  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          คำพูด
        </div>
      </div>
    </>)
  }
}

