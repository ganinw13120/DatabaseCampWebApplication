import { Component, ReactElement } from 'react';
import React from 'react';
import BaseView from '../../BaseView';

import ChoiceBox from './Choicebox';

type QuestionBox = {
  id : number,
  isFilled: boolean,
  ref : any,
}

interface CompletionPageState {
  questions: QuestionBox[],
  hoverQuestion : number | null
}

export default class Completion extends Component<any, CompletionPageState>
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
      questionList.push(<Question key={key} func={func} id={key + 1} info={{...e}}/>)
    });
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

class Question extends Component<any, any> {
  public render(): JSX.Element {
    const { info, id } = this.props;
    const { first, last } = info;
    return (<>
      <div className='mx-14 text-base text-darkPrimary font-normal my-6 flex' >
        <span className='my-auto'>
          {id}. {first}
        </span>
        <Dropzone {...this.props} />
        <span className='my-auto  '>
          {last}
        </span>
      </div>
    </>)
  }
}

class Dropzone extends React.Component<any, any> {
  private ref: any;
  constructor(props: any) {
    super(props);
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
  }
  onExit(): void {
    const { exit } = this.props.func;
    exit();
  }

  public render(): JSX.Element {
    return (<>
      <div className='relative'>
        <div className='bg-white w-32 h-12 py-2 px-12 mx-4 absolute border-b border-gray rounded-lg' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {'  '}
        </div>
      </div>
        <div ref={this.ref} className={` w-32 h-12 py-2 px-12 mx-4 z-20`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          {'  '}
        </div>
    </>)
  }
}
