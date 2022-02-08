import React, { Component } from 'react';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import BorderTopIcon from '@mui/icons-material/BorderTop';
import BorderBottomIcon from '@mui/icons-material/BorderBottom';
import { DrawerStore } from '@store/stores/DrawerStore/DrawerStore';

import { inject, observer } from 'mobx-react';
import { Box } from '@model/Drawer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#005FB7',
        },
        secondary: {
            main: '#262626',
        },
    },
});

type ControlPanelProps = {
    drawerStore?: DrawerStore
}


@inject('drawerStore')
@observer
class ControlPanel extends Component<ControlPanelProps, {}> {
    render(): JSX.Element {
        const { store, addRelation,
            isBox, isLine,
            deleteEntity } = this.props.drawerStore!;
        const {focusEntity} = store;
        console.log(focusEntity)
        return <>
            <ThemeProvider theme={theme}>
                <div className='panel-container'>
                    <div className='panel'>
                        <div className='panel-item-group'>
                            <Button variant="outlined" color="secondary" onClick={addRelation}><AddIcon /> <WysiwygIcon /></Button>
                        </div>
                        {
                            (focusEntity && (isBox(focusEntity) || isLine(focusEntity))) &&
                            <div className='panel-item-group'>
                                <Button variant="outlined" color="secondary" onClick={deleteEntity}><DeleteIcon /></Button>
                            </div>
                        }
                        {focusEntity && isBox(focusEntity) &&
                            <BoxPanel />
                        }
                        {focusEntity && isLine(focusEntity) &&
                            <LinePanel />
                        }
                    </div>
                </div>
            </ThemeProvider>
        </>
    }
}

type BoxPanelProps = {
    drawerStore?: DrawerStore
}

@inject('drawerStore')
@observer
class BoxPanel extends Component<BoxPanelProps, {}>{
    render(): JSX.Element {
        const { getFocusBox,
            changeFields, addField, store } = this.props.drawerStore!;
        const {focusEntity} = store;
        return <>
            <div className='panel-item-group'>
                <div className='panel-label'>
                    Fields :
                </div>
                <div className='number-inp-container mr-r'>
                    <TextField size='small' type={"number"} value={(focusEntity as Box)!.entities.length} onChange={(e) => {
                        changeFields(Number(e.target.value));
                    }} />
                </div>
                <div className='panel-label'>
                    Add :
                </div>
                <div className='panel-btn-container'>
                    <Button variant="outlined" color="secondary" className="panel-btn-container" onClick={() => { addField("Top") }}><BorderTopIcon /></Button>
                </div>
                <div className='panel-btn-container'>
                    <Button variant="outlined" color="secondary" className="panel-btn-container" onClick={() => { addField("Buttom") }}><BorderBottomIcon /></Button>
                </div>
            </div>
        </>
    }
}

const LinePanel: React.FC = () => {
    return <>
        <div className='panel-item-group'>
            <div className='panel-label'>
                Line
            </div>
        </div>
    </>
}

export default ControlPanel
