import React, { ReactElement, Component } from 'react';
import BoxComponent from './Box';
import Line from './Line';
import Stat from './Stat';
import ControlPanel from './ControlPanel';
import IDrawerStore from '@store/stores/DrawerStore/IDrawerStore';
import { inject, observer } from 'mobx-react';

type DrawerProps = {
    drawerStore?: IDrawerStore
}

@inject('drawerStore')
@observer
class Drawer extends Component<DrawerProps, {}> {
    
    private generateLineElement (): ReactElement[] {
        let list: ReactElement[] = [];
        const {lines} = this.props.drawerStore!.store;
        lines.forEach((e, key) => {
            list.push(<Line data={e} />)
        })
        return list;
    }
    render(): JSX.Element {
        const {store, handleMouseDown, handleMouseMove, handleMouseUp, onBackgroundClick} = this.props.drawerStore!;
        return <>
            <Stat />
            <ControlPanel />
                <div ref={store.containerRef} onMouseMove={handleMouseMove} className={`drawer-container`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                    {(() => {
                        let _boxes: Array<ReactElement> = [];
                        store.boxes.forEach((e, key) => {
                            _boxes.push(<React.Fragment key={e.uuid}>
                                <BoxComponent data={e} />
                            </React.Fragment>)
                        })
                        return _boxes;
                    })()}
                    <svg ref={store.svgRef} style={{ width: '100%', height: '100%', top: 0 }} onMouseDown={onBackgroundClick}>
                        <g>
                            {this.generateLineElement()}
                        </g>
                    </svg>
                </div>
        </>
    }
}

// const OldDrawer: React.FC<DrawerProps> = () => {

//     const containerRef = useRef<HTMLDivElement>(null);

//     const [
//         boxes,
//         lines,
//         userState,
//         clearSelection,
//         mouseEvent,
//         [currentPos, setCurrentPos],
//         panelFunc
//     ] = useDrawer();

//     useEffect(() => {
//         lines.setLines([]);
//         boxes.setBoxes([
//             // generateBox('นักเรียน', ['รหัสนักเรียน', 'ชื่อจริง', 'นามสกุล', 'เบอร์โทร', 'วันเกิด']),
//             // generateBox('นักเลง', ['รหัสนักเรียน', 'ชื่อจริง', 'นามสกุล', 'เบอร์โทร', 'วันเกิด', 'ที่อยู่']),
//             generateBox('Guest', ['guest_id', 'first_name', 'last_name', 'mobile_no', 'points', 'guest_type_id', 'created_at', 'updated_at']),
//             generateBox('Branch', ['branch_d', 'branch_name', 'branch_address', 'mobile_no', 'website', 'created_at', 'updated_at']),
//             generateBox('Room', ['room_id', 'room_no', 'branch_id', 'created_at', 'updated_at']),
//             generateBox('Record', ['record_id', 'room_id', 'guest_id', 'created_at', 'updated_at']),
//             generateBox('GuestType', ['guest_type_id', 'type_name', 'description', 'created_at', 'updated_at']),
//         ]);
//     }, []);

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         let current: Position = {
//             x: e.pageX - containerRef.current!.getClientRects()[0].x,
//             y: e.pageY - containerRef.current!.getClientRects()[0].y
//         }
//         setCurrentPos(current);
//     }

//     const generateLineElement = (): ReactElement[] => {
//         let list: ReactElement[] = [];
//         lines.lines.forEach((e, key) => {
//             list.push(<Line data={e} />)
//         })
//         return list;
//     }

//     const onBackgroundClick = () => {
//         clearSelection();
//     }

//     return (
//         <>
//             <Stat />
//             <a style={{ position: 'absolute' }}>{userState.Action}</a>
//             <ControlPanel />
//             <DrawerContext.Provider value={{
//                 pos: currentPos,
//                 offset: {
//                     x: containerRef.current ? containerRef.current!.getClientRects()[0].x : 0,
//                     y: containerRef.current ? containerRef.current!.getClientRects()[0].y : 0
//                 }
//             }}>
//                 {/* <button onClick={onClear} style={{ position: 'absolute' }}>Clear</button> */}
//                 <div ref={containerRef} onMouseMove={handleMouseMove} className={`drawer-container`} onMouseDown={mouseEvent.onMouseDown} onMouseUp={mouseEvent.onMouseUp}>
//                     {(() => {
//                         let _boxes: Array<ReactElement> = [];
//                         boxes.boxes.forEach((e, key) => {
//                             const _setBoxState = (state: BoxState) => {
//                                 boxes.setBoxState(e.uuid, state);
//                             }
//                             _boxes.push(<React.Fragment key={e.uuid}>
//                                 <BoxComponent data={e} setBoxState={_setBoxState} />
//                             </React.Fragment>)
//                         })
//                         return _boxes;
//                     })()}
//                     <svg style={{ width: '100%', height: '100%', top: 0 }} onMouseDown={onBackgroundClick}>
//                         <g>
//                             {generateLineElement()}
//                         </g>
//                     </svg>
//                 </div>
//             </DrawerContext.Provider>
//         </>
//     );
// }

export default Drawer