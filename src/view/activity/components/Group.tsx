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
  result: string[][]
}

interface GroupProps {
  info: GroupChoice,
  updateResult(e: GroupAnswer): void
}

export default class Group extends Component<GroupProps, GroupState> {
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
  public onHoverQuestionEnter(id: number): void {
    console.log(id)
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
    console.log('on leave')
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
  public updateQuestionState(id: number, isFilled: boolean): void {
    const { questions } = this.state;
    let temp = [...questions];
    ((obj) => {
      if (!obj) return;
      else obj.isFilled = isFilled
    })(temp.find(e => e.id === id))
    return this.setState({
      questions: temp
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
  public snapPos(text: string): any | null {
    const { questions, hoverQuestion } = this.state;
    if (hoverQuestion) {
      const question = questions.find(e => e.id === hoverQuestion);
      console.log(question)
      console.log(questions)
      if (!question) return null;
      else {
        this.updateQuestionState(hoverQuestion, true);
        const { result } = this.state;
        let temp = [...result];
        temp[question.id].push(text);
        this.setState({
          result: temp
        })
        this.props.updateResult(temp);
        return {
          boxRef: question.ref,
          boxID: question.id
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
  public removeSnap(id: number, displayText: string): void {
    const { questions, result } = this.state;
    let temp = [...result];
    const question = questions.find(e => e.id === id);
    if (!question) return;
    temp[question.id] = temp[question.id].filter((e: any) => e !== displayText);
    this.setState({
      result: temp
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
    this.setState((prev: GroupState) => {
      prev.result[quest.id] = [];
      prev.questions.push(quest);
      return prev;
    })
  }

  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    let choiceList = [...info.choices];
    let i = 0;
    let groupBoxList: ReactElement[] = [];
    info.group_list.forEach((e, i) => {
      groupBoxList.push(<GroupBox func={func} id={i + 1} key={i} groupName={info.group_list[i]} />);
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

class GroupBox extends Component<any, any> {

  private ref: React.Ref<HTMLDivElement>;
  private id: number;
  constructor(props: any) {
    super(props);
    this.id = this.props.id;
    this.ref = React.createRef<HTMLDivElement>();
    props.func?.append?.({
      isFilled: false,
      ref: this.ref,
      id: this.id,
      pairId: props.id
    })
  }
  onEnter(): void {
    console.log('entering..')
    const { enter } = this.props.func;
    enter(this.id);
  }
  onExit(): void {
    const { exit } = this.props.func;
    exit();
  }

  public render(): JSX.Element {
    return (<>
      <div className='w-3/4 m-5'>
        <p className='mx-auto text-center text-xl font-prompt'>
          {this.props.groupName}
        </p>
        <div>
          <div className='relative back'>
            <div className='w-full h-full absolute border border-gray rounded p-12 bg-white big-box ' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            </div>
          </div>
          <div className='relative w-full h-full big-box box-plate z-50' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }} ref={this.ref} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          </div>
        </div>
      </div>
    </>)
  }
}