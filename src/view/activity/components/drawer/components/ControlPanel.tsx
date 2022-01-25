import React from 'react';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import BorderTopIcon from '@mui/icons-material/BorderTop';
import BorderBottomIcon from '@mui/icons-material/BorderBottom';
import { ActionType, UserState } from '../model/Drawer';

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
    deleteItem: () => void
    addRelation: () => void
    changeFields: (amount: number) => void
    addField : (type : 'Buttom' | 'Top') => void
    userState: UserState
}

const ControlPanel: React.FC<ControlPanelProps> = ({ deleteItem, addRelation, changeFields, addField, userState }) => {
    return <>
        <ThemeProvider theme={theme}>
            <div className='panel-container'>
                <div className='panel'>
                    <div className='panel-item-group'>
                        <Button variant="outlined" color="secondary" onClick={addRelation}><AddIcon /> <WysiwygIcon /></Button>
                    </div>
                    {
                        (userState.BoxSelection || userState.LineSelection) &&
                        <div className='panel-item-group'>
                            <Button variant="outlined" color="secondary" onClick={deleteItem}><DeleteIcon /></Button>
                        </div>
                    }
                    {userState.BoxSelection &&
                        <BoxPanel changeFields={changeFields} addField={addField} fieldAmount={userState.BoxSelection.state.entities.length}/>
                    }
                    {userState.LineSelection &&
                        <LinePanel />
                    }
                </div>
            </div>
        </ThemeProvider>
    </>
}

type BoxPanelProps = {
    changeFields: (amount: number) => void
    addField : (type : 'Buttom' | 'Top') => void
    fieldAmount : number
}

const BoxPanel: React.FC<BoxPanelProps> = ({changeFields, addField, fieldAmount}) => {
    return <>
        <div className='panel-item-group'>
            <div className='panel-label'>
                Fields :
            </div>
            <div className='number-inp-container mr-r'>
                <TextField size='small' type={"number"} value={fieldAmount} onChange={(e)=>{
                    changeFields(Number(e.target.value));
                }}/>
            </div>
            <div className='panel-label'>
                Add :
            </div>
            <div className='panel-btn-container'>
                <Button variant="outlined" color="secondary" className="panel-btn-container" onClick={()=>{addField("Top")}}><BorderTopIcon /></Button>
            </div>
            <div className='panel-btn-container'>
                <Button variant="outlined" color="secondary" className="panel-btn-container" onClick={()=>{addField("Buttom")}}><BorderBottomIcon /></Button>
            </div>
        </div>
    </>
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
