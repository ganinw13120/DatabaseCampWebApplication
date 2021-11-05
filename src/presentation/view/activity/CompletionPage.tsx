import { Component, ReactElement } from 'react';
import React from 'react';
import BaseView from '../BaseView';
import './matching.css';

import Draggable from 'react-draggable';

type QuestionBox = {
  id : number,
  isFilled: boolean,
  ref : any,
}

type ChoiceInfo = {
  key :   number
}

interface CompletionPageState {
  questions: QuestionBox[],
  hoverQuestion : number | null
}

export default class CompletionPage extends React.Component<any, CompletionPageState>
  implements BaseView {
  public constructor(props: any) {
    super(props);
    this.state = {
      hoverQuestion: null,
      questions: [],
    }
    this.onHoverQuestionEnter = this.onHoverQuestionEnter.bind(this);
    this.onHoverQuestionExit = this.onHoverQuestionExit.bind(this);
    this.snapPos = this.snapPos.bind(this);
    this.removeSnap = this.removeSnap.bind(this);
    this.appendRef = this.appendRef.bind(this);
  }
  public onViewModelChanged(): void {

  }

  public onHoverQuestionEnter(id: number): void {
    this.setState({ hoverQuestion: id });
  }
  public onHoverQuestionExit(): void {
    this.setState({ hoverQuestion: null });
  }
  private updateQuestionState(id : number, isFilled : boolean): void {
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
  public snapPos(): any | null {
    const { questions, hoverQuestion } = this.state;
    console.log(hoverQuestion)
    if (hoverQuestion) {
      const question = questions.find(e => e.id === hoverQuestion && !e.isFilled);
      if (!question) return null;
      else {
        this.updateQuestionState(hoverQuestion, true);
        return {
          boxRef: question.ref,
          boxID : question.id
        }
      }
    }
    return null;
  }
  public removeSnap(id : number): void {
    this.updateQuestionState(id, false);
  }
  public appendRef(quest: QuestionBox): void {
    this.setState((prev: CompletionPageState) => {
      prev.questions.push(quest);
      return prev;
    })
  }
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    const { choice } = info;
    let questionList : ReactElement[] = [];
    choice.questions.forEach((e: any, key: number) => {
      questionList.push(<Question func={func} id={key + 1} info={{...e}}/>)
    });
    console.log(choice)
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={[...choice.contents]} />
          {questionList}
        </div>
      </>
    );
  }
}

class Question extends React.Component<any, any> {
  private ref: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isHover: false,
    }
    this.ref = React.createRef<HTMLDivElement>();
    props.func?.append?.({
      isFilled: false,
      ref : this.ref,
      id : props.id
    })
  }
  onEnter(): void {
    const { enter } = this.props.func;
    enter(this.props.id);
    this.setState({ isHover: true });
  }
  onExit(): void {
    const { exit } = this.props.func;
    exit();
    this.setState({ isHover: false });
  }

  public render(): JSX.Element {
    const { isHover } = this.state;
    const { info, id } = this.props;
    const { first, last } = info;
    return (<>
      <div className='mx-14 text-base text-darkPrimary font-normal my-6 flex' >
        <span className='my-auto'>
          {id}. {first}
        </span>
        <div ref={this.ref} className={`w-32 h-12 py-2 px-12 mx-4 border-b border-gray rounded-lg z-${20}`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }} style={{ color: isHover ? 'red' : 'blue' }}>
          {'  '}
        </div>
        <span className='my-auto  '>
          {last}
        </span>
      </div>
    </>)
  }
}

class ChoiceBox extends React.Component<any, any> {
  public render(): JSX.Element {
    const { snapPos, removeSnap, list } = this.props;
    const func = {
      snapPos: snapPos,
      removeSnap : removeSnap
    }
    let choiceList : ReactElement[] = [];
    list.forEach((e : any) => {
      choiceList.push(<Choice displayText={e} func={func} />)
    })
    return (<>
      <div className='rounded-lg border border-gray bg-white w-5/6 h-auto mx-auto p-6 grid grid-cols-4 gap-y-6 mb-10' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        {choiceList}
      </div>
    </>)
  }
}

type ChoiceProps = {
  displayText: string,
  func: any
}
class Choice extends React.Component<ChoiceProps, any> {
  private ref: any;
  private originalRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isDragging: false,
      posX: 0,
      posY: 0,
      boxRef: null,
      boxID : null,
    }
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.ref = React.createRef<HTMLDivElement>();
    this.originalRef = React.createRef<HTMLDivElement>();
    this.onWidthChange = this.onWidthChange.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.onWidthChange);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWidthChange);
  }
  onWidthChange = () => {
    const { boxRef } = this.state;
    if (boxRef) {
      const { x,y } = this.calculateCoordination(boxRef);
      this.setState({ posX: x, posY: y });
    }
  }
  calculateCoordination = (boxRef: any): {x : number , y : number}=> {
    const { x, y } = this.originalRef?.current.getBoundingClientRect();
    const { x: newX, y: newY } = boxRef?.current.getBoundingClientRect();
    return {
      x: newX - x, y: newY - y
    }
  }
  onStartDrag(): void {
    this.setState({ isDragging: true });
  }
  onStopDrag(): void {
    const { func } = this.props;
    const {snapPos, removeSnap} = func
    const { boxID } = this.state;
    if(boxID) removeSnap(boxID);
    const res = snapPos();
    if (res) {
      const { boxRef, boxID } = res;
      const { x, y } = this.calculateCoordination(boxRef);
      this.setState({ isDragging: false, posX : x, posY : y, boxRef : boxRef, boxID : boxID });
    }
    else {
      this.setState({ isDragging: false, posX: 0, posY: 0, boxRef : null, boxID : null });
    }
  }
  public render(): JSX.Element {
    const { displayText } = this.props;
    const { isDragging, posX, posY, boxID } = this.state;
    const pos = {
      x: posX,
      y: posY
    }
    return (
      <>
        <div ref={this.originalRef} className={`z-${isDragging ? '0' : '30'}`}>
          <Draggable onStart={this.onStartDrag} onStop={this.onStopDrag} position={pos}>
            <div ref={this.ref} className={`z-${isDragging ? '0' : '30'} p-4 bg-white w-32 text-center rounded-lg cursor-pointer`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              {displayText}
            </div>
          </Draggable>
        </div>
      </>
    )
  }
}