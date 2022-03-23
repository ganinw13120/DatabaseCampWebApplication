// HintTab.tsx
/**
 * This file contains components, related to hint tab in requirement section.
*/

import { Component, ReactElement } from 'react';

import { inject, observer } from 'mobx-react';
import { AuthStore } from '@store/stores/AuthStore/AuthStore';
import { LearningStore } from '@store/stores/LearningStore/LearningStore';

import ActiveBulb from '@assets/hint_bulb.png';
import InactiveBulb from '@assets/inactive_bulb.png';
import { Hint, HintRoadMap } from '@model/Learning';
import Tooltip from '@mui/material/Tooltip';

import parse from 'html-react-parser';
import { HINT_HEADER_TEXT } from '@constant/text';


interface HintProps {
  learningStore?: LearningStore,
  authStore?: AuthStore,
  onHint(): void
}

interface HintState {
  currentTab: number
}

@inject('learningStore')
@inject('authStore')
@observer
export default class HintTab extends Component<HintProps, HintState> {
  constructor(props: HintProps) {
    super(props);
    this.state = {
      currentTab: 0
    }
    this.selectTab = this.selectTab.bind(this);
  }

  /**
   * On user select hint tab, update state
   *
   * @remarks
   * This is a part of view component.
   *
   * @param tab target tab index
  */
  private selectTab(tab: number): void {
    this.setState({
      currentTab: tab
    })
  }
  
  public render(): JSX.Element {
    const { hint, hintRoadMap } = this.props.learningStore!.store;
    const { currentTab } = this.state;
    const { onHint } = this.props;
    let HintTabList: ReactElement[] = [];
    let maximumLevel: number = 0;
    hint.forEach((e: Hint, key: number) => {
      if (e.level > maximumLevel) maximumLevel = e.level;
      HintTabList.push(<HintHeader isSelect={key === currentTab} key={key} id={key} onSelect={this.selectTab} />)
    })
    console.log(hint)
    const nextHint: HintRoadMap | undefined = hintRoadMap.find(e => e.level === maximumLevel + 1);
    return (<>
      <div>
        <div className='flex text-black font-semibold text-lg'>
          {HintTabList}
          {nextHint && <NextHintHeader isEnabled={this.props.authStore?.store.userData!==null && this.props.authStore!.store.userData!.point >= nextHint.reduce_point} onHint={onHint} reduce_point={nextHint.reduce_point} />}
        </div>
      </div>
      <div className='hintbox border-t border-darkPrimary  w-full mx-auto bottom-0 mt-auto' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        {hint && hint.length > 0 && (() => {
          const _hint: Hint = hint[currentTab];
          return <HintText text={_hint.content} />
        })()}
      </div>

    </>)
  }
}

interface HintHeadereProps {
  isSelect: boolean
  onSelect(tab: number): void
  id: number
}
class HintHeader extends Component<HintHeadereProps, {}> {
  public render(): JSX.Element {
    const { isSelect, onSelect, id } = this.props;
    return (<>
      <div className={`${isSelect ? '' : 'in'}active-hint px-2 hint-tab flex py-2`} onClick={() => onSelect(id)}>
        <img src={isSelect ? ActiveBulb : InactiveBulb} alt='hint' className='h-10 my-auto mx-3' />
      </div>
    </>)
  }
}

interface NextHintHeaderProps {
  isEnabled: boolean
  reduce_point: number
  onHint(): void
}

class NextHintHeader extends Component<NextHintHeaderProps, {}> {
  public render(): JSX.Element {
    const { reduce_point, onHint, isEnabled } = this.props;
    return (<>

      <Tooltip title={isEnabled ? `Show Hint` : 'Point ไม่เพียงพอ'} placement="top">
        <div className={`px-2 pr-5 hint-tab flex py-2 ${isEnabled ? 'active-hint ' : ' disabled-hint'}`} onClick={() => { if (isEnabled) onHint() }}>
          <img src={ActiveBulb} alt='hint' className='h-10 my-auto mr-2' />
          <span className='my-auto'>{HINT_HEADER_TEXT}</span>
          <span className='font-normal text-base ml-3 my-auto'>(-{reduce_point} points)</span>
        </div>
      </Tooltip>
    </>)
  }
}

interface HintTextProps {
  text: string
}

class HintText extends Component<HintTextProps, {}> {
  public render(): JSX.Element {
    return (<>
      <div className='block py-16  mx-auto font-sarabun text-base text-wrap tracking-wider font-semibold text-xl hinttext requirementtext'>
        {parse(this.props.text ? this.props.text : '')}
      </div>
    </>)
  }
}