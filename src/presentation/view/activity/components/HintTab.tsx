import { Component, ReactElement } from 'react';

import { inject, observer } from 'mobx-react';
import { LearningStore } from '../../../../domain/entity/state/stores/LearningStore';

import ActiveBulb from '../../../assets/hint_bulb.png';
import InactiveBulb from '../../../assets/inactive_bulb.png';
import { ActivityInfo, Hint } from '../../../../domain/entity/model/Learning';

import parse from 'html-react-parser';


interface HintProps { 
  learningStore ?: LearningStore,
  activityInfo : ActivityInfo
}

interface HintState {
  currentTab : number
}

@inject('learningStore')
@observer
export default class Hintbox extends Component <HintProps, HintState> {
  constructor (props : HintProps) {
    super(props);
    this.state = {
      currentTab : 0
    }
    this.selectTab = this.selectTab.bind(this);
  } 
  private selectTab (tab : number) : void {
    this.setState({
      currentTab : tab
    })
  }
  public render(): JSX.Element {
    const { hint } = this.props.learningStore!.store;
    const {currentTab} = this.state;
    const {activityInfo} = this.props;
    console.log(activityInfo)
    let HintTabList : ReactElement[] = [];
    hint.forEach((e : any, key : number) => {
      console.log(e)
      HintTabList.push(<HintHeader isSelect={key===currentTab} key={key} id={key} onSelect={this.selectTab}/>)
    })
    return (<>
      <div>
        <div className='flex text-black font-semibold text-lg'>
          {HintTabList}
          <div className='active-hint px-2 hint-tab flex py-2'>
            <img src={ActiveBulb} alt='hint' className='h-10 my-auto mr-2' />
            <span className='my-auto'>Show Hint</span>
            <span className='font-normal text-base ml-3 my-auto'>(-300 points)</span>
          </div>
        </div>
      </div>
      <div className='hintbox border-t border-darkPrimary  w-full mx-auto bottom-0 mt-auto'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
        {hint && hint.length > 0 && (()=>{
          const _hint : Hint = hint[currentTab];
          return <HintText text={_hint.content}/>
        })()}
      </div>
      
    </>)
  }
}

interface HintHeadereProps {
  isSelect : boolean,
  onSelect (tab : number) : void,
  id : number
}
class HintHeader extends Component <HintHeadereProps, any> {
  public render () : JSX.Element {
    const {isSelect, onSelect, id} = this.props;
    return (<>
          <div className={`${isSelect ? '' : 'in'}active-hint px-2 hint-tab flex py-2`} onClick={()=>onSelect(id)}>
            <img src={isSelect ? ActiveBulb : InactiveBulb} alt='hint' className='h-10 my-auto mx-3' />
          </div>
    </>)
  }
}

interface HintTextProps {
  text : string
}

class HintText extends Component<HintTextProps, any> {
  public render(): JSX.Element {
    return (<>
        <div className='block py-16  mx-auto font-sarabun text-base text-wrap tracking-wider font-semibold text-xl hinttext requirementtext'>
          {parse(this.props.text)}
        </div>
    </>)
  }
}