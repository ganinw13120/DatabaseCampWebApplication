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
  type : 'title' | 'attr'
}

interface TableState {
  questions: QuestionBox[],
  hoverQuestion: string | null,
  result: TableAnswer
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
      result: {
        tables : []
      }
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
        // let temp = [...result];
        let temp = result;
        if (question.type==='attr') {
          temp.tables[question.pairId - 1].attributes = [...temp.tables[question.pairId - 1].attributes, {value : text}];
        } else {
          temp.tables[question.pairId - 1].title = text;
        }
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
    let temp = result;
    const question = questions.find(e => e.id === id);
    if (!question) return;
    if (question.type==='attr') {
      temp.tables[question?.pairId - 1].attributes = temp.tables[question?.pairId - 1].attributes.filter((e) => e.value !== displayText);
    } else {
      temp.tables[question?.pairId - 1].title = '';
    }
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
    const { info } = this.props;
    this.setState((prev: TableState) => {
      prev.result.tables[quest.pairId - 1] = {
        title : info.tables[quest.pairId-1].title ? info.tables[quest.pairId-1].title! : '',
        attributes : [...info.tables[quest.pairId-1].attributes.map(e=>{return {value : e.value}})]
      };
      prev.questions.push(quest);
      return prev;
    })
  }
  
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    // let choiceList = [...info.items_left, ...info.items_right];
    let choiceList = info.vocabs
    const tableList : ReactElement[] = [];
    info.tables.forEach((e, key)=>{
      tableList.push(<TableBlock func={func} id={key + 1} key={key} info={e}/>);
    })
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={choiceList} offsetY={0}/>
          <div className='flex gap-8'>
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
    let offset = 0;
    tableList.push(<React.Fragment key={offset}>
        {info.title ? <EmptyBox text={info.title} id={0} /> : <Dropzone {...this.props} order={offset} type='title'/>}
    </React.Fragment>)
    offset++;
    info.attributes.forEach((e : any, key : number)=>{
      tableList.push(<React.Fragment key={offset}>
          {e !== null ? <EmptyBox text={e.value} id={offset}/> : <Dropzone {...this.props} order={offset} type='attr'/>}
      </React.Fragment>)
      offset++;
    })
    let i = 0;
    while (i < info.attributes_count - info.attributes.length) {
      tableList.push(<React.Fragment key={offset}>
          <Dropzone {...this.props} order={offset} type='attr' />
      </React.Fragment>)
      i ++;
      offset++;
    }
    return (<>
      <div className='flex flex-col gap-table text-center'>
        {tableList}
      </div>
    </>)
  }
}

class EmptyBox extends Component <{text : string, id : number}, {}> {
  render () : JSX.Element { 
    const {id, text} = this.props;
    return (
      <>
        <div className={``} style={{ width : '177.99px', height : 65}}>
        </div>
      <div className={`pt-7 text-xl absolute ${id===0 ? 'header' : (id%2===0 ? 'even' : 'odd')}`} style={{transform : `translate(0, ${ (81 * (id)) - 15}px)`, width : '177.99px', height : 75}}>
        {this.props.text}
      </div>
      </>
    )
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
      pairId : props.id,
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
    const {order} = this.props;
    return (<>
      <div className='relative'>
        <div className='bg-box questionbox h-12 py-2 px-12 mx-4 absolute border-b border-gray rounded-lg z-10' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {'  '}
        </div>
      </div>
        <div ref={this.ref} className={` questionbox col-box h-12 px-12 mx-4 z-20`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          {'  '}
        </div>
      <div className={`h-28 absolute w-42 ${order===0 ? 'header' : (order%2===0 ? 'even' : 'odd')}`} style={{transform : `translate(0, ${ (81 * (this.props.order)) - 15}px)`, width : '177.99px', height : 75}}>
        {' '}
      </div>
    </>)
  }
}
