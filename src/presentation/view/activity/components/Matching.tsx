import { Component, ReactElement } from 'react';
import React from 'react';
import BaseView from '../../BaseView';
import { v4 as uuidv4 } from 'uuid';
import ChoiceBox from './Choicebox';
import { inject, observer } from 'mobx-react';
import Equal from '../../../assets/equal.svg';
type QuestionBox = {
  id : string,
  isFilled: boolean,
  ref: any,
  pairId : number
}

interface MatchingPageState {
  questions: QuestionBox[],
  hoverQuestion: string | null,
  result: any
}


@inject('learningStore')
@observer
export default class Matching extends Component<any, MatchingPageState>
  implements BaseView {
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
  public onViewModelChanged(): void {

  }

  public onHoverQuestionEnter(id: string): void {
    this.setState({ hoverQuestion: id });
  }
  public onHoverQuestionExit(): void {
    this.setState({ hoverQuestion: null });
  }
  private updateQuestionState(id : string, isFilled : boolean): void {
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
  public appendRef(quest: QuestionBox): void {
    this.setState((prev: MatchingPageState) => {
      prev.result[quest.pairId - 1] = [];
      prev.questions.push(quest);
      return prev;
    })
  }
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    const { choice } = info;
    let choiceList = [...choice.items_left, ...choice.items_right];
    let i = 0;
    let questionList: ReactElement[] = [];
    while (i < Math.floor(choiceList.length / 2)) {
      questionList.push(<Question func={func} id={i + 1} key={i} />);
      i++;
    }
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={choiceList} />
          {questionList}
        </div>
      </>
    );
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
  private ref: any;
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
