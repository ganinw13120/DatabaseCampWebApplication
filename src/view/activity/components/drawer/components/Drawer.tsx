import React, { ReactElement, useEffect, useRef, createContext, useContext } from 'react';
import { DrawerContext } from '../hooks/useDrawerContext';
import { useDrawer } from '../hooks/useDrawer';
import { Position, DrawerProps, BoxState, LineState } from '../model/Drawer';
import BoxComponent from './Box';
import generateBox from '../utils/generateBox';
import Line from './Line';
import Stat from './Stat';
import ControlPanel from './ControlPanel';

const Drawer: React.FC<DrawerProps> = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    const [
        boxes,
        lines,
        userState,
        clearSelection,
        mouseEvent,
        [currentPos, setCurrentPos],
        panelFunc
    ] = useDrawer();

    useEffect(() => {
        lines.setLines([]);
        boxes.setBoxes([
            // generateBox('นักเรียน', ['รหัสนักเรียน', 'ชื่อจริง', 'นามสกุล', 'เบอร์โทร', 'วันเกิด']),
            // generateBox('นักเลง', ['รหัสนักเรียน', 'ชื่อจริง', 'นามสกุล', 'เบอร์โทร', 'วันเกิด', 'ที่อยู่']),
            generateBox('Customer', ['cusomter_id', 'full_name', 'mobile_no', 'password', 'created_at', 'updated_at']),
            generateBox('Branch', ['branch_d', 'branch_name', 'branch_address', 'mobile_no', 'created_at', 'updated_at'])
        ]);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        let current: Position = {
            x: e.pageX - containerRef.current!.getClientRects()[0].x,
            y: e.pageY - containerRef.current!.getClientRects()[0].y
        }
        setCurrentPos(current);
    }

    const generateLineElement = (): ReactElement[] => {
        let list: ReactElement[] = [];
        lines.lines.forEach((e, key) => {
            const _setLineState = (state: LineState) => {
                lines.setLineState(key, state);
            }
            list.push(<Line data={e} setLineState={_setLineState} />)
        })
        return list;
    }

    const onBackgroundClick = () => {
        clearSelection();
    }

    return (
        <>
            {/* <Stat /> */}
            {/* <a style={{position : 'absolute'}}>{userState.Action}</a> */}
            <ControlPanel {...panelFunc} userState={userState} />
            <DrawerContext.Provider value={{
                pos: currentPos,
                offset: {
                    x: containerRef.current ? containerRef.current!.getClientRects()[0].x : 0,
                    y: containerRef.current ? containerRef.current!.getClientRects()[0].y : 0
                }
            }}>
                {/* <button onClick={onClear} style={{ position: 'absolute' }}>Clear</button> */}
                <div ref={containerRef} onMouseMove={handleMouseMove} className={`drawer-container`} onMouseDown={mouseEvent.onMouseDown} onMouseUp={mouseEvent.onMouseUp}>
                    {(() => {
                        let _boxes: Array<ReactElement> = [];
                        boxes.boxes.forEach((e, key) => {
                            const _setBoxState = (state: BoxState) => {
                                boxes.setBoxState(e.uuid, state);
                            }
                            _boxes.push(<React.Fragment key={e.uuid}>
                                <BoxComponent data={e} setBoxState={_setBoxState} />
                            </React.Fragment>)
                        })
                        return _boxes;
                    })()}
                    <svg style={{ width: '100%', height: '100%', top: 0 }} onMouseDown={onBackgroundClick}>
                        <g>
                            {generateLineElement()}
                        </g>
                    </svg>
                </div>
            </DrawerContext.Provider>
        </>
    );
}

export default Drawer