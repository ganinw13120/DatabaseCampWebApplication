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

    private generateLineElement(): ReactElement[] {
        let list: ReactElement[] = [];
        const { lines } = this.props.drawerStore!.store;
        lines.forEach((e, key) => {
            list.push(<Line data={e} />)
        })
        return list;
    }
    render(): JSX.Element {
        const { store, handleMouseDown, handleMouseMove, handleMouseUp, onBackgroundClick } = this.props.drawerStore!;
        return <>
            {/* <Stat /> */}
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

export default Drawer