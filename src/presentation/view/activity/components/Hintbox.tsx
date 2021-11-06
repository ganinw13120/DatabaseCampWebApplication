import bulb from '../../../assets/bulb.png';

import { Component, ReactElement } from 'react';

import { inject, observer } from 'mobx-react';

@inject('learningStore')
@observer
export default class Hintbox extends Component <any, any> {
  public render(): JSX.Element {
    console.log({ ...this.props.learningStore.store.hint })
    const { hint } = this.props.learningStore.store;
    let HintTextList : ReactElement[] = [];
    hint.forEach((e : any, key : number) => {
      HintTextList.push(<HintText text={e.content} key={key}/>)
    })
    return (<>
      <div className='border rounded-lg bg-white w-auto h-auto pb-10 px-4 w-10/12 mx-auto bottom-0 mt-auto py-4'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider py-6 pr-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-96 py-6 -mx-4 flex'>
            <span className=' text-xl text-darkPrimary font-semibold tracking-wider'>คำใบ้ </span>
              <img src={bulb} alt="Logo4" className='-m-4 pl-4 pr-8' style={{ marginLeft: 3 }} />
            <span className=' text-lg text-Redwrong font-semibold tracking-wider'> -50 Points  (-30%)</span>
          </div>
        </div>
        {HintTextList}
      </div>
      
    </>)
  }
}

class HintText extends Component<any, any> {
  public render(): JSX.Element {
    return (<>
        <div className='my-3 mx-auto font-sarabun text-base text-wrap tracking-wider ' style={{width:'30rem'}}>
          <span>- {this.props.text}</span>
        </div>
    </>)
  }
}