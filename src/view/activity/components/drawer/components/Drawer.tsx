import React, { ReactElement, Component } from 'react';
import BoxComponent from './Box';
import Line from './Line';
import Stat from './Stat';
import ControlPanel from './ControlPanel';
import IDrawerStore from '@store/stores/DrawerStore/IDrawerStore';
import { inject, observer } from 'mobx-react';
import { DrawerAnswer, DrawerChoice } from '@root/model/Learning';
import '../drawer.css';

type DrawerProps = {
    drawerStore?: IDrawerStore
    info: DrawerChoice
}

@inject('drawerStore')
@observer
class Drawer extends Component<DrawerProps, {}> {

    public componentDidMount(): void {
        const { info } = this.props;
        this.props.drawerStore!.setupDrawer(info);
    }

    private generateLineElement(): ReactElement[] {
        let list: ReactElement[] = [];
        const { lines } = this.props.drawerStore!.store;
        lines.forEach((e, key) => {
            list.push(<Line data={e} />)
        })
        return list;
    }

    render(): JSX.Element {
        const { store, handleMouseDown, handleMouseMove, handleMouseUp, onBackgroundClick, handleMouseLeave } = this.props.drawerStore!;
        return <>
            {/* <Stat /> */}
            <ControlPanel />
            <div ref={store.containerRef} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className={`drawer-container`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                {(() => {
                    let _boxes: Array<ReactElement> = [];
                    store.boxes.forEach((e, key) => {
                        _boxes.push(<React.Fragment key={e.uuid}>
                            <BoxComponent data={e} key={key} />
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