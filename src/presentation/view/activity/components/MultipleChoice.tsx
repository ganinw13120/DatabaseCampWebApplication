import { Component, ReactElement } from 'react';
import BaseView from '../../BaseView';
import Radio from '@mui/material/Radio';
import {MultipleChoice} from '../../../../model/Learning';

interface MultipleChoiceState {
  selectedChoice : number | null,
}

interface MultipleChoiceProps {
  info : MultipleChoice[],
  updateResult(e : number) : void
}

export default class MultipleChoiceComponent extends Component<MultipleChoiceProps, MultipleChoiceState>
  implements BaseView {
  public constructor(props: any) {
    super(props);
    this.state = {
      selectedChoice : null,
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  public onViewModelChanged(): void {

  }
  handleSelect(e : number): void {
    const {updateResult} = this.props;
    updateResult(e)
    this.setState({
      selectedChoice : e
    })
  }
  public render(): JSX.Element {
    const { selectedChoice } = this.state;
    const {info} = this.props;
    let choiceList: ReactElement[] = [];
    info.forEach((e:  MultipleChoice, key : number) => {
      choiceList.push(<Choice key={key} id={e.multiple_choice_id} displayText={e.content} handleSelect={this.handleSelect} selected={selectedChoice} />)
    })
    return (
      <>
        <div className='w-3/4 mx-auto'>
          {choiceList}
        </div> 

      </>
    );
  }
}
class Choice extends Component<any, any> {
  public render () : JSX.Element {
    const { selected, handleSelect, id, displayText } = this.props;
    return (<>

          <div className='w-full flex'>
            <Radio  name='choices' size='medium' 
              value={id}
              checked={id === selected}
              onChange={() => {
                handleSelect(id);
              }}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 30,
                },
              }} />
            <span className='my-auto'>
              {displayText}
            </span>
          </div>
    
    </>)
  }
}