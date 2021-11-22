import { Component, ReactElement } from 'react';
import Draggable from 'react-draggable';
import React from 'react';

export default class ChoiceBox extends Component<any, any> {
  public render(): JSX.Element {
    const { snapPos, removeSnap, list } = this.props;
    const func = {
      snapPos: snapPos,
      removeSnap : removeSnap
    }
    let choiceList : ReactElement[] = [];
    list.forEach((e: any, key: number) => {
      choiceList.push(<Choice key={key} displayText={e} func={func} />)
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
  private ref: React.Ref<HTMLDivElement>;
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
    const { func, displayText } = this.props;
    const {snapPos, removeSnap} = func
    const { boxID } = this.state;
    if(boxID) removeSnap(boxID, displayText);
    const res = snapPos(displayText);
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
    const { isDragging, posX, posY } = this.state;
    const pos = {
      x: posX,
      y: posY
    }
    return (
      <>
        <div ref={this.originalRef} className={`z-${isDragging ? '10' : '30'}`}>
          <Draggable onStart={this.onStartDrag} onStop={this.onStopDrag} position={pos}>
            <div ref={this.ref} className={`z-${isDragging ? '10' : '30'} ${isDragging ? 'dragging' : 'dragable'} p-4 bg-white w-32 text-center rounded-lg cursor-pointer`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              {displayText}
            </div>
          </Draggable>
        </div>
      </>
    )
  }
}