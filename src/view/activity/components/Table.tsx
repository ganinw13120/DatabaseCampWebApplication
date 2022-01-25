// Matching.tsx
/**
 * This file contains components, related to matching choice in activity.
*/

import { Component, ReactElement } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChoiceBox from './Choicebox';

import Equal from '@assets/equal.svg';
import { MatchingAnswer, MatchingChoice, TableAnswer, TableChoice } from '@model/Learning';

type QuestionBox = {
  id : string,
  isFilled: boolean,
  ref: any,
  pairId : number
}

interface TableState {
  questions: QuestionBox[],
  hoverQuestion: string | null,
  result: string[][]
}

interface TableProps {
  info : TableChoice,
  updateResult(e : TableAnswer) : void
}

export default class Table extends Component<TableProps, TableState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      hoverQuestion: null,
      questions: [],
      result: []
    }
    this.onHoverQuestionEnter = this.onHoverQuestionEnter.bind(this);
    this.onHoverQuestionExit = this.onHoverQuestionExit.bind(this);
    this.snapPos = this.snapPos.bind(this);
    this.removeSnap = this.removeSnap.bind(this);
    this.appendRef = this.appendRef.bind(this);
  }
  
  /**
   * On user hovering question, update states.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param id question's indentifire
  */
  public onHoverQuestionEnter(id: string): void {
    this.setState({ hoverQuestion: id });
  }

  /**
   * On user exit hovering question, update states.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param id question's indentifire
  */
  public onHoverQuestionExit(): void {
    this.setState({ hoverQuestion: null });
  }

  /**
   * On user interact with question, update question state.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param id id of choice
   *
   * @param isFilled is choice is filled
  */
  public updateQuestionState(id : string, isFilled : boolean): void {
    const { questions } = this.state;
    let temp = [...questions];
    ((obj) => {
      if (!obj) return;
      else obj.isFilled = isFilled
     })(temp.find(e => e.id === id))
    return this.setState({
      questions : temp
    })
  }

  /**
   * On user release question, check for snap points, return if any.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param text text on dragable choice
   *
   * @return if there is any enabled snap point, move choice to snap
  */
  public snapPos(text : string): any | null {
    const { questions, hoverQuestion } = this.state;
    if (hoverQuestion) {
      const question = questions.find(e => e.id === hoverQuestion && !e.isFilled);
      if (!question) return null;
      else {
        this.updateQuestionState(hoverQuestion, true);
        const { result } = this.state;
        let temp = [...result];
        temp[question.pairId - 1] = [...temp[question.pairId - 1], text];
        this.setState({
          result : temp
        })
        this.props.updateResult(temp);
        return {
          boxRef: question.ref,
          boxID : question.id
        }
      }
    }
    return null;
  }

  /**
   * On user remove choice from snaping point
   *
   * @remarks
   * This is a part of view component.
   *
   * @param id choice identifier
   *
   * @param displayText text on removed choice
  */
  public removeSnap(id: string, displayText : string): void {
    const { questions,result } = this.state;
    let temp = [...result];
    const question = questions.find(e => e.id === id);
    if (!question) return;
    temp[question?.pairId - 1] = temp[question?.pairId - 1].filter((e: any) => e !== displayText);
    this.setState({
      result : temp
    })
    this.props.updateResult(temp);
    this.updateQuestionState(id, false);
  }

  /**
   * On component mount, append question snap point references.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param quest question box information
  */
  public appendRef(quest: QuestionBox): void {
    this.setState((prev: TableState) => {
      prev.result[quest.pairId - 1] = [];
      prev.questions.push(quest);
      return prev;
    })
  }
  
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    // let choiceList = [...info.items_left, ...info.items_right];
    let choiceList = info.choices
    let i = 0;
    const tableList : ReactElement[] = [];
    info.tables.forEach((e, key)=>{
      tableList.push(<TableBlock func={func} id={i + 1} key={i} info={e}/>);
    })
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={choiceList} />
          <div className='flex'>
            <div className='flex-grow'></div>
          {tableList}
            <div className='flex-grow'></div>
          </div>

        </div>
      </>
    );
  }
}

class TableBlock extends Component<any, any> {
  public render(): JSX.Element {
    const info = this.props.info
    const tableList : ReactElement[] = [];
    info.forEach((e : any, key : number)=>{
      tableList.push(<>
        <div className={`w-auto cell p-5 px-12 text-center mx-auto ${key===0 ? 'header' : (key%2===0 ? 'even' : 'odd')}`}>
          {e !== null ? e : <Dropzone {...this.props} />}
        </div>
      </>)
    })
    return (<>
      <div className='w-auto table-box bg-white m-6 rounded'>
        <div>
          {tableList}
        </div>
      </div>
    </>)
  }
}

class Question extends Component<any, any> {
  public render(): JSX.Element {
    return (<>
      <div className='mx-auto text-base text-darkPrimary font-normal my-14 flex' >
        <div className='flex-grow'></div>
        <Dropzone {...this.props} />
        <div className='flex-grow m-auto text-center'>
          <img src={Equal} alt="Equal to" className='m-auto' />
        </div>
        <Dropzone {...this.props} />
        <div className='flex-grow'></div>
      </div>
    </>)
  }
}

class Dropzone extends React.Component<any, any> {
  private ref: React.Ref<HTMLDivElement>;
  private id: string;
  constructor(props: any) {
    super(props);
    const id = uuidv4();
    this.id = id;
    this.ref = React.createRef<HTMLDivElement>();
    props.func?.append?.({
      isFilled: false,
      ref : this.ref,
      id: id,
      pairId : props.id
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
    return (<>
      <div className='relative'>
        <div className='bg-white w-48 h-12 py-2 px-12 mx-4 absolute border-b border-gray rounded-lg' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {'  '}
        </div>
      </div>
        <div ref={this.ref} className={` w-48 h-12 py-2 px-12 mx-4 z-20`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          {'  '}
        </div>
    </>)
  }
}
