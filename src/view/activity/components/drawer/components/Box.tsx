import React, { Component, ReactElement, useEffect, useState } from 'react';
import { Box, Point, PointPosition, Position } from '@model/Drawer';
import { v4 as uuidv4 } from 'uuid';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { inject, observer } from "mobx-react";
import { DrawerStore } from '@store/stores/DrawerStore/DrawerStore';

const pointHitbox: number = 30;

type BoxProps = {
    data: Box
    drawerStore ?: DrawerStore
}

@inject("drawerStore")
@observer
class BoxComponent extends Component<BoxProps, {}> {
    
    public componentDidMount () {
        this.generatePoints();
    }

    private generatePoints () {
        const data = this.props.data;
        const _points: Array<Point> = [];
        data.entities.forEach((en, key) => {
            const L = React.createRef<SVGSVGElement>();
            const R = React.createRef<SVGSVGElement>();
            _points.push({
                uuid: uuidv4(),
                isHover: false,
                ref: L,
                position: PointPosition.Left,
                parentRef: en.ref,
                level : key
            })
            _points.push({
                uuid: uuidv4(),
                isHover: false,
                ref: R,
                position: PointPosition.Right,
                parentRef: en.ref,
                level : key
            })
        })
        this.props.drawerStore!.addBoxPoints(data, _points);
    }

    private generatePointElement (): ReactElement[] {
        const _points: ReactElement[] = [];
        let sum = 10;
        let borderNoise = 0;
        let borderNoiseAddup = .65;
        const points = this.props.data.points;
        points.forEach((e, key) => {
            const pos: Position = e.position === PointPosition.Left ? {
                x: 0,
                y: sum + borderNoise,
            } : {
                x: e.parentRef.current!.offsetWidth + borderNoiseAddup,
                y: sum + borderNoise,
            }
            if (e.position === PointPosition.Right) sum += e.parentRef.current!.clientHeight;
            borderNoise += borderNoiseAddup;
            _points.push(<PointComponent pos={pos} data={e} />);
        })
        return _points;
    }

    private onChangeEntityText (event: ContentEditableEvent, key: number) {
        let entity = this.props.data.entities[key];
        entity.text = event.target.value;
        this.props.drawerStore!.onEntityUpdate(this.props.data, entity)
    }
    render(): JSX.Element {
        const {data} = this.props;
        const {onHoverBox, onUnHoverBox} = this.props.drawerStore!;
        return (

            <>
                <div className={`box`}
                    style={{
                        transform: `translate(${data.pos.x}px, ${data.pos.y}px)`,
                    }}
                    ref={data.ref}
                    onMouseEnter={() => {
                        onHoverBox(data);
                    }}
                    onMouseLeave={() => {
                        onUnHoverBox(data);
                    }}
                    onMouseDown={() => {
                        // handleMouseDown();
                    }}
                    onMouseUp={() => {
                        // handleMouseUp();
                    }}
                >
                    <div className={`box-inner-container ${data.isSelect && !data.isDragging ? 'box-select' : ''} ${data.isDragging ? 'box-dragging' : ''} `}>
                        <div className='box-header' ref={data.entities[0].ref}>
                            <ContentEditable
                                html={data.entities[0].text}
                                disabled={false}
                                onChange={e=>this.onChangeEntityText(e, 0)}
                                tagName='div'
                                className='inp-field'
                            />
                        </div>
                        {(() => {
                            const details: Array<ReactElement> = [];
                            data.entities.slice(1).forEach((entity, key) => {
                                details.push(<React.Fragment key={key}>
                                    <div className={`${key % 2 === 0 ? 'row-even' : 'row-odd'} box-detail`} ref={entity.ref}>
                                        {/* {entity.text} */}
                                        <ContentEditable
                                            html={entity.text}
                                            disabled={false}
                                            onChange={(e) => { this.onChangeEntityText(e, key + 1) }}
                                            tagName='div'
                                            className='inp-field'
                                        />
                                    </div>
                                </React.Fragment>)
                            })
                            return details;
                        })()}
                    </div>
                    {this.generatePointElement()}
                </div>
            </>
        )
    }
}

export default BoxComponent;

type PointComponentProps = {
    data: Point
    pos: Position
    drawerStore ?: DrawerStore
}

@inject("drawerStore")
@observer
class PointComponent extends Component <PointComponentProps, {}> {
    private onHoverPoint () : void {
        let point = this.props.data;
        point.isHover = true;
    }
    private onUnHoverPoint () : void {
        let point = this.props.data;
        point.isHover = false;
    }
    render () : JSX.Element {
        const {data, pos} = this.props;
        const pointR = 2.5;
        return (<>
            <svg key={data.uuid} ref={data.ref} onMouseEnter={() => { this.onHoverPoint() }} onMouseLeave={() => { this.onUnHoverPoint() }} style={{ padding: `${pointR * 3}px`, cursor: 'pointer', position: 'absolute', top: 0, zIndex: 10, width: `${pointHitbox}px`, height: `${pointHitbox}px`, transform: `translate(${pos.x - (pointHitbox / 2)}px, ${pos.y}px)` }}>
                {data.isHover && <circle cx={pointR * 4} cy={pointR * 4} r={pointR * 2} fill="#d99a9a" />}
            </svg>
        </>)
    }
}

// const BoxComponeasdnt: React.FC<BoxComponentProps> = ({ data, setBoxState }) => {

//     const { pos: currentPos } = useDrawerContext();

//     const [points, setPoints] = useState<Array<Point>>([]);

//     const [state, setState] = useState<BoxState>(data.state);

//     const [lastPos, setLastPos] = useState<Position>(currentPos);

//     useEffect(() => {
//         if (state.isDragging) {
//             const newPos: Position = {
//                 x: state.pos.x + (currentPos.x - lastPos.x),
//                 y: state.pos.y + (currentPos.y - lastPos.y)
//             }
//             setLastPos(currentPos);
//             setState({
//                 ...state,
//                 pos: newPos
//             });
//         }
//     }, [currentPos])

//     useEffect(() => {
//         setBoxState(state);
//     }, [state])

//     useEffect(() => {
//         generatePoints();
//     }, []);

//     useEffect(() => {
//         setPoints([]);
//         generatePoints();
//     }, [data, state.entities.length])


//     const onHoverPoint = (key: string) => {
//         setPoints(prev => {
//             let temp = [...prev];
//             temp.find(e => e.uuid === key)!.isHover = true;
//             return temp;
//         })
//     }

//     const onUnHoverPoint = (key: string) => {
//         setPoints(prev => {
//             let temp = [...prev];
//             temp.find(e => e.uuid === key)!.isHover = false;
//             return temp;
//         })
//     }

//     useEffect(() => {
//         setState({
//             ...state,
//             pointAiming: points.find(e => e.isHover)
//         })
//     }, [points])

//     const onHoverDiv = () => {
//         setState({
//             ...state,
//             isHover: true
//         })
//     }

//     const onUnHoverDiv = () => {
//         setState({
//             ...state,
//             isHover: false
//         })
//     }

//     const startDrag = () => {
//         setLastPos(currentPos);
//         setState({
//             ...state,
//             isSelect: true,
//             isDragging: true
//         })

//     }

//     const stopDrag = () => {
//         setLastPos(currentPos);
//         setState({
//             ...state,
//             isDragging: false
//         })
//     }

//     const isAnyHoveringPoint = (): boolean => {
//         return !points.every(e => !e.isHover);
//     }

//     const handleMouseDown = () => {
//         if (isAnyHoveringPoint()) return;
//         else startDrag();
//     }
//     const handleMouseUp = () => {
//         if (state.isDragging) {
//             stopDrag();
//         }
//     }
//     const onChangeTitle = (event: ContentEditableEvent) => {
//         setState({
//             ...state,
//             title: {
//                 ...state.title,
//                 text: event.target.value
//             }
//         })
//     }
//     const onChangeEntity = (event: ContentEditableEvent, key: number) => {
//         let temp = [...state.entities];
//         temp[key].text = event.target.value;
//         setState({
//             ...state,
//             entities: temp
//         })
//     }
// }

