// ChoiceBox.tsx
/**
 * This file contains components, related to choice box in word dragging type of activity.
*/

import { Component, ReactElement } from 'react';
import Draggable from 'react-draggable';
import React from 'react';

export default class ChoiceBox extends Component<any, any> {
  public render(): JSX.Element {
    const { snapPos, removeSnap, list } = this.props;
    const func = {
      snapPos: snapPos,
      removeSnap: removeSnap
    }
    let choiceList: ReactElement[] = [];
    list.forEach((e: any, key: number) => {
      choiceList.push(<Choice key={key} displayText={e} func={func} />)
    })
    return (<>
      <div className='rounded-lg border border-gray bg-white w-5/6 h-auto mx-auto p-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 mb-10' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
        {choiceList}
      </div>
    </>)
  }
}

type ChoiceProps = {
  displayText: string,
  func: any
}

/**
* Dragable choices, used in draggable activity.
*
* @remarks
* This is a part of view component.
*/
class Choice extends React.Component<ChoiceProps, any> {
  private ref: React.Ref<HTMLDivElement>;
  private originalRef: any;
  private observer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isDragging: false,
      posX: 0,
      posY: 0,
      boxRef: null,
      boxID: null,
    }
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.ref = React.createRef<HTMLDivElement>();
    this.originalRef = React.createRef<HTMLDivElement>();
    this.onWidthChange = this.onWidthChange.bind(this);


    this.observer = new ResizeObserver(() => {
      this.onWidthChange()
    })
  }

  /**
   * On component did mount, observe width changes.
   *
   * @remarks
   * This is a part of view component.
  */
  componentDidMount() {
    this.observer.observe(this.originalRef.current)
  }

  /**
   * On component did mount, unobserve width changes.
   *
   * @remarks
   * This is a part of view component.
  */
  componentWillUnmount() {
    this.observer.unobserve(this.originalRef.current)
  }

  /**
   * On width changes, recalculate position to adjusted.
   *
   * @remarks
   * This is a part of view component.
  */
  onWidthChange = () => {
    const { boxRef } = this.state;
    if (boxRef) {
      const { x, y } = this.calculateCoordination(boxRef);
      this.setState({ posX: x, posY: y });
    }
  }

  /**
   * Calculate coordination that choice box should be move to.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param boxRef Snap box reference
   *
   * @returns X,Y Coordination of choice
  */
  calculateCoordination = (boxRef: any): { x: number, y: number } => {
    const { x, y } = this.originalRef?.current.getBoundingClientRect();
    const { x: newX, y: newY } = boxRef?.current.getBoundingClientRect();
    return {
      x: newX - x, y: newY - y
    }
  }

  /**
   * On start dragging, update state.
   *
   * @remarks
   * This is a part of view component.
  */
  onStartDrag(): void {
    this.setState({ isDragging: true });
  }

  /**
   * On stop dragging, update state.
   *
   * @remarks
   * This is a part of view component.
  */
  onStopDrag(): void {
    const { func, displayText } = this.props;
    const { snapPos, removeSnap } = func
    const { boxID } = this.state;
    if (boxID) removeSnap(boxID, displayText);
    const res = snapPos(displayText);
    if (res) {
      const { boxRef, boxID } = res;
      const { x, y } = this.calculateCoordination(boxRef);
      this.setState({ isDragging: false, posX: x, posY: y, boxRef: boxRef, boxID: boxID });
    }
    else {
      this.setState({ isDragging: false, posX: 0, posY: 0, boxRef: null, boxID: null });
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
            <div ref={this.ref} className={`z-${isDragging ? '10' : '30'} ${isDragging ? 'dragging' : 'dragable'} p-4 bg-white mx-6 text-center rounded-lg cursor-pointer`} style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
              {displayText}
            </div>
          </Draggable>
        </div>
      </>
    )
  }
}