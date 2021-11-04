import React from 'react';
import BaseView from '../BaseView';
import './matching.css';

import Draggable from 'react-draggable';

type Position = {
  x: number,
  y : number
}

export default class CompletionPage extends React.Component<any, any>
  implements BaseView {
  public constructor (props : any) {
    super(props);
    this.state = {
      hoverQuestion : null,
    }
    this.onHoverQuestionEnter = this.onHoverQuestionEnter.bind(this);
    this.onHoverQuestionExit = this.onHoverQuestionExit.bind(this);
    this.snapPos = this.snapPos.bind(this);
  }
  public onViewModelChanged(): void {

  }
  public onHoverQuestionEnter (quest : Position) : void {
    this.setState({
      hoverQuestion : quest
    })
    console.log(quest)
  }
  public onHoverQuestionExit(): void {
    this.setState({
      hoverQuestion : null
    })
  }
  public snapPos(): Position | null {
    const { hoverQuestion } = this.state;
    if (hoverQuestion) {
      return hoverQuestion;
    }
    return null;
  }
  public render(): JSX.Element {
    return (
      <>
        <div className='w-full'>
          <ChoiceBox snapPos={this.snapPos} />
          <Question onHoverQuestionEnter={this.onHoverQuestionEnter} onHoverQuestionExit={this.onHoverQuestionExit}/>
          <Question onHoverQuestionEnter={this.onHoverQuestionEnter} onHoverQuestionExit={this.onHoverQuestionExit}/>
          <Question onHoverQuestionEnter={this.onHoverQuestionEnter} onHoverQuestionExit={this.onHoverQuestionExit}/>
          <Question onHoverQuestionEnter={this.onHoverQuestionEnter} onHoverQuestionExit={this.onHoverQuestionExit}/>
          <Question onHoverQuestionEnter={this.onHoverQuestionEnter} onHoverQuestionExit={this.onHoverQuestionExit}/>
        </div>
      </>
    );
  }
}

class Question extends React.Component<any, any> {
  private ref : any;
  constructor(props: any) {
    super(props);
    this.state = {
      isHover: false,
    }
    this.ref = React.createRef<HTMLDivElement>();
  }
  onEnter(): void {
    const { x, y } = this.ref?.current.getBoundingClientRect();
    const pos: Position = { x: x, y: y };
    const { onHoverQuestionEnter } = this.props;
    onHoverQuestionEnter(pos);
    this.setState({ isHover: true });
  }
  onExit(): void {
    const { onHoverQuestionExit } = this.props;
    onHoverQuestionExit();
    this.setState({ isHover: false });
  }

  public render(): JSX.Element {
    const { isHover } = this.state;
    return (<>
      <div className='mx-14 text-base text-darkPrimary font-normal my-6 flex' >
            <span className='my-auto'>
              1. สมชายต้องทำสมชายต้
            </span>
            <div ref={this.ref} className={`w-32 h-12 py-2 px-12 mx-4 border-b border-gray rounded-lg z-${20 }`} onMouseEnter={() => { this.onEnter() }} onMouseLeave={() => { this.onExit() }} style={{color : isHover ? 'red' : 'blue'}}>
              {'  '}
            </div>
            <span className='my-auto  '>
              เพื่อที่จะบรรลุเป้าหมายนั้น
            </span>
          </div>
    </>)
  }
}

class ChoiceBox extends React.Component <any, any> {
  public render(): JSX.Element {
    const { snapPos } = this.props;
    return (<>
      <div className='rounded-lg border border-gray bg-white w-5/6 h-auto mx-auto p-6 grid grid-cols-4 gap-y-6 mb-10' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <Choice displayText='คำพูด' snapPos={snapPos} />
        <Choice displayText='คำจา' snapPos={snapPos} />
      </div>
    </>)
  }
} 

type ChoiceProps = {
  displayText: string,
  snapPos : any
}
class Choice extends React.Component<ChoiceProps, any> {
  private ref : any;
  constructor(props: any) {
    super(props);
    this.state = {
      isDragging: false,
      posX: 0,
      // posY: 493-386,
      posY : 0,
      tempX: 0,
      tempY : 0,
    }
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.ref = React.createRef<HTMLDivElement>();
  }
  onStartDrag(e:any, pos:any): void {
    const { x, y } = this.ref?.current.getBoundingClientRect();
    console.log(x,y)
    this.setState({ isDragging: true, tempX : x, tempY : y });
  }
  onStopDrag(e: any, pos: any): void {
    const { tempX, tempY } = this.state;
    // this.setState({ isDragging: false });
    const { snapPos } = this.props;
    const newPos = snapPos();
    if (newPos) {
      this.setState({ isDragging: false, posX:  newPos.x - tempX , posY:  newPos.y- tempY });
    }
    else this.setState({ isDragging: false });
  }
  public render(): JSX.Element {
    const { displayText } = this.props;
    const { isDragging, posX, posY } = this.state;
    const pos = {
      x: posX,
      y: posY
    }
    return (
      <Draggable onStart={this.onStartDrag} onStop={this.onStopDrag} position={pos}>
        <div ref={this.ref} className={`z-${isDragging ? '0' : '30'} p-4 bg-white w-32 text-center rounded-lg cursor-pointer`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
          {displayText}
        </div>
      </Draggable>
    ) 
  }
}