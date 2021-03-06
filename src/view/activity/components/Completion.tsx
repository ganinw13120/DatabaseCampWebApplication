// Completion.tsx
/**
 * This file contains components, related to completion choice in activity.
*/

import { Component, ReactElement } from 'react';
import React from 'react';

import ChoiceBox from './Choicebox';

import {CompletionAnswer, CompletionChoice} from '../../../model/Learning';

type QuestionBox = {
  id : number,
  isFilled: boolean,
  ref : any,
}

interface CompletionPageState {
  questions: QuestionBox[],
  hoverQuestion : number | null,
  result : CompletionAnswer[],
}

interface CompletionProps {
  info : CompletionChoice,
  updateResult(e : CompletionAnswer[]) : void
}

export default class Completion extends Component<CompletionProps, CompletionPageState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      hoverQuestion: null,
      questions: [],
      result : []
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
  public onHoverQuestionEnter(id: number): void {
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
  public updateQuestionState(id : number, isFilled : boolean): void {
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
        const ans = temp.find(e=>e.completion_choice_id===question.id);
        if (!ans) return null;
        ans.content = text;
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
  */
  public removeSnap(id : number): void {
    const { questions,result } = this.state;
    const question = questions.find(e => e.id === id);
    if (!question) return;
    let temp = [...result];
    const ans = temp.find(e=>e.completion_choice_id===question.id);
    if (!ans) return;
    ans.content = null;
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
    this.setState((prev: CompletionPageState) => {
      prev.questions.push(quest);
      prev.result.push({
        completion_choice_id : quest.id,
        content : null
      })
      return prev;
    })
  }
  
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    let questionList : ReactElement[] = [];
    info.questions.forEach((e: any, key: number) => {
      questionList.push(<Question key={key} func={func} id={key + 1} info={{...e}}/>)
    });
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} removeSnap={this.removeSnap} list={[...info.contents]} />
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
      id : props.info.id
    })
  }
  onEnter(): void {
    const { enter } = this.props.func;
    enter(this.props.info.id);
  }
  onExit(): void {
    const { exit } = this.props.func;
    exit();
  }

  public render(): JSX.Element {
    return (<>
      <div className='relative'>
        <div className='question-box bg-white w-32 h-12 mx-4 absolute border-b border-gray rounded-lg' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {'  '}
        </div>
      </div>
        <div ref={this.ref} className={`question-box w-32 h-12 mx-4 z-20`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          {'  '}
        </div>
    </>)
  }
}
