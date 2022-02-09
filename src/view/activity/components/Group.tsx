// Matching.tsx
/**
 * This file contains components, related to matching choice in activity.
*/

import { Component, ReactElement } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChoiceBox from './Choicebox';

import Equal from '@assets/equal.svg';
import { GroupAnswer, GroupChoice, MatchingAnswer, MatchingChoice } from '@model/Learning';

type QuestionBox = {
  id: number,
  isFilled: boolean,
  ref: any,
}

interface GroupState {
  questions: QuestionBox[],
  hoverQuestion: number | null,
  result: string[][],
  groups : GroupData[]
}

type GroupData = {
  id : number,
  slots : GroupSlot[]
  text : string,
}

type GroupSlot = {
  ref : React.RefObject<HTMLDivElement>,
  id : string,
  isFilled : boolean
}

interface GroupProps {
  info: GroupChoice,
  updateResult(e: GroupAnswer): void
}

export default class Group extends Component<GroupProps, GroupState> {
  public constructor(props: any) {
    super(props);

    const { info } = this.props;
    let groups : GroupData[] = [];
    info.groups.forEach((e, k)=>{
      groups.push({
        id : k,
        text : e,
        slots : [],
      })
    })

    this.state = {
      hoverQuestion: null,
      questions: [],
      result: [],
      groups : []
    }

    this.onHoverQuestionEnter = this.onHoverQuestionEnter.bind(this);
    this.onHoverQuestionExit = this.onHoverQuestionExit.bind(this);
    this.snapPos = this.snapPos.bind(this);
    this.removeSnap = this.removeSnap.bind(this);
    this.appendRef = this.appendRef.bind(this);
  }
  public onHoverQuestionEnter(id: number): void {
    this.setState({ hoverQuestion: id });
  }
  public onHoverQuestionExit(): void {
    this.setState({ hoverQuestion: null });
  }
  public snapPos(text: string): any | null {
    const { groups, hoverQuestion } = this.state;
    if (hoverQuestion) {
      const group = groups.find(e=>e.id===hoverQuestion);
      if (!group) return null;
      else {
        const { result } = this.state;
        let temp = [...result];
        temp[group.id-1].push(text);
        this.setState({
          result: temp
        })
        this.props.updateResult(temp);
        let slot_tmp = [...group.slots];
        let emp = slot_tmp.find(e=>!e.isFilled);
        if (!emp) return null;
        emp.isFilled = true;
        this.setState(prev=>{
          prev.groups.find(e=>e.id===group.id)!.slots.find(e=>e.id===emp!.id)!.isFilled = true;
          return prev;
        })
        return {
          boxRef: emp.ref,
          boxID: emp.id
        }
      }
    }
  return null;
  }
  public removeSnap(id: string, displayText: string): void {
    const { groups, result } = this.state;
    let temp = [...result];
    const group = groups.find(e => e.slots.some(_e=>_e.id===id));
    if (!group) return;
    temp[group.id-1] = temp[group.id-1].filter((e: string) => e !== displayText);
    this.setState(prev=>{
      prev.groups.find(e=>e.slots.some(_e=>_e.id===id))!.slots.find(e=>e.id===id)!.isFilled = false;
      return prev;
    })
    this.setState({
      result : temp
    })
    this.props.updateResult(temp);
  }
  public appendRef(quest: GroupData): void {
    this.setState((prev: GroupState) => {
      prev.result[quest.id-1] = [];
      prev.groups.push(quest)
      return prev;
    })
  }

  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    let choiceList = [...info.vocabs];
    let groupBoxList: ReactElement[] = [];
    info.groups.forEach((e, i) => {
      groupBoxList.push(<GroupBox func={func} id={i + 1} key={i} groupName={e} maxNum={choiceList.length}/>);
    })
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={choiceList} />
          <div className='mx-auto text-base text-darkPrimary font-normal my-14 flex' >
            <div className='flex-grow'></div>
            <div className='flex w-3/4'>
              {groupBoxList}
            </div>
            <div className='flex-grow'></div>
          </div>
        </div>
      </>
    );
  }
}

type BoxState = {
  slots : GroupSlot[]
}

class GroupBox extends Component<any, BoxState> {

  private ref: React.Ref<HTMLDivElement>;
  private id: number;
  constructor(props: any) {
    super(props);
    this.id = this.props.id;
    this.ref = React.createRef<HTMLDivElement>();
    let i = 0;
    let slots : GroupSlot[] = [];
    while (i < this.props.maxNum) {
      slots.push({
        ref : React.createRef<HTMLDivElement>(),
        isFilled : false,
        id : uuidv4(),
      })
      i++;
    }
    this.state = {
      slots : slots
    }
    props.func?.append?.({
      id : this.id,
      slots : slots,
    })
  }

  onEnter(): void {
    const { enter } = this.props.func;
    enter(this.id);
  }
  onExit(): void {
    const { exit } = this.props.func;
    exit();
  }

  public render(): JSX.Element {
    const heightPerBox = 80;
    const {slots} = this.state;
    const totalBox = slots.length;
    return (<>
      <div className='w-3/4 m-5'>
        <p className='mx-auto text-center text-xl font-prompt'>
          {this.props.groupName}
        </p>
        <div>
          <div className='relative back'>
            <div className='w-full h-full absolute border border-gray rounded p-12 bg-white big-box ' style={{ height : heightPerBox * totalBox, boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            </div>
          </div>
          <div className='relative w-full h-full big-box box-plate z-50' style={{ height : heightPerBox * totalBox, boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }} ref={this.ref} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
            {(()=>{
              const _slots : ReactElement[] = [];
              slots.forEach((e : any)=>{
                _slots.push(<>
                  {<div className='w-1/3 m-auto' style={{height : heightPerBox}} ref={e.ref}>  </div>}
                </>)
              })
              return _slots;
            })()}
          </div>
        </div>
      </div>
    </>)
  }
}