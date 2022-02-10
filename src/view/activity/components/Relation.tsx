// Matching.tsx
/**
 * This file contains components, related to matching choice in activity.
*/

import { Component, ReactElement } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChoiceBox from './Choicebox';

import Arrow from '@assets/arrow.svg';
import { MatchingAnswer, MatchingChoice, RelationAnswer, RelationChoice, RelationProblem } from '@model/Learning';

type QuestionBox = {
  id : string,
  isFilled: boolean,
  ref: any,
  pairId : number
  side : 'dependent' | 'determinants'
}

interface RelationState {
  questions: QuestionBox[],
  hoverQuestion: string | null,
  result: RelationAnswer[]
}

interface RelationProps {
  info : RelationChoice
  updateResult(e :  RelationAnswer[]) : void
}

export default class Relation extends Component<RelationProps, RelationState> {
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
        if (question.side==='dependent') {
          temp[question.pairId - 1].dependent = text;
        } else {
          temp[question.pairId - 1].determinants = [...temp[question.pairId - 1].determinants, {value : text}];
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
    let temp = [...result];
    const question = questions.find(e => e.id === id);
    if (!question) return;
    if (temp[question.pairId-1].dependent===displayText) {
      temp[question.pairId-1].dependent='';
    } else {
      temp[question?.pairId - 1].determinants = temp[question?.pairId - 1].determinants.filter((e: any) => e.value !== displayText);
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
    let determinants = [...info.dependencies[quest.pairId - 1].determinants]
    let _determinants : Array<{value : string}> = [];
    determinants.forEach(e=>{
      _determinants.push({
        value : e!
      })
    })
    this.setState((prev: RelationState) => {
      prev.result[quest.pairId - 1] = {
        dependent : info.dependencies[quest.pairId-1].dependent ? info.dependencies[quest.pairId-1].dependent! : '',
        determinants : _determinants
      }
      prev.questions.push(quest);
      return prev;
    })
  }
  

  
  public render(): JSX.Element {
    const func = { enter: this.onHoverQuestionEnter, exit: this.onHoverQuestionExit, append: this.appendRef };
    const { info } = this.props;
    // let choiceList = [...info.items_left, ...info.items_right];
    let choiceList = info.vocabs;
    let questionList: ReactElement[] = [];
    info.dependencies.forEach((e, k)=>{
      questionList.push(<Question func={func} id={k + 1} key={k} info={e}/>);
    })
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
    const {determinants_count, determinants} = this.props.info
    return (<>
      <div className='mx-auto text-base text-darkPrimary font-normal my-14 flex px-56' >
        {(()=>{
          const list : ReactElement[] = [];
          determinants.forEach((e : string | null)=>{
            if (e) {
              list.push(<EmptyBox text={e} />) 
            } else {
              list.push(<Dropzone {...this.props} side={'determinants'}/>)
            }
          })
          let i = 0;
          while (i < determinants_count - determinants.length) {
            list.push(<Dropzone {...this.props} side={'determinants'}/>)
            i++;
          }
          return list;
        })()}
        <div className='flex-grow pr-12'></div>
        <div className='flex-none m-auto text-center mr-24'>
          <img src={Arrow} alt="Equal to" className='m-auto' />
        </div>
        
        { this.props.info.dependent ? <EmptyBox text={this.props.info.dependent} /> :  <Dropzone {...this.props} side='dependent'/>}
      </div>
    </>)
  }
}

class EmptyBox extends Component <{text : string}, {}> {
  render () : JSX.Element {
    return (<>
      <div className={` questionbox h-12 py-2 px-12 mx-4 z-20 text-center pt-5`}  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        {this.props.text}
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
      pairId : props.id,
      side : this.props.side
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
        <div className='bg-white questionbox h-12 py-2 px-12 mx-4 absolute border-b border-gray rounded-lg z-0' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {'  '}
        </div>
      </div>
        <div ref={this.ref} className={` questionbox h-12 py-2 px-12 mx-4 z-20`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }}>
          {'  '}
        </div>
    </>)
  }
}
