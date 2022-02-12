// MultipleChoiceComponent.tsx
/**
 * This file contains components, related to choices in multiple choice activity.
*/

import { Component, ReactElement } from 'react';
import Radio from '@mui/material/Radio';
import {MultipleAnswer, MultipleChoice, MultipleChoiceDetail} from '@model/Learning';
import parse from 'html-react-parser';

interface MultipleChoiceState {
  selectedChoice : number | null,
}

interface MultipleChoiceProps {
  info : MultipleChoiceDetail[],
  updateResult(e : MultipleAnswer) : void
}

export default class MultipleChoiceComponent extends Component<MultipleChoiceProps, MultipleChoiceState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      selectedChoice : null,
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  /**
   * On user select choice, update state and result.
   *
   * @remarks
   * This is a part of view component.
   *
   * @param quest question box information
  */
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
    info.forEach((e:  MultipleChoiceDetail, key : number) => {
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

type ChoiceProps = {
  selected : number | null
  handleSelect (id : number) : void
  id : number
  displayText : string
}

class Choice extends Component<ChoiceProps, {}> {
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
              {parse(displayText)}
            </span>
          </div>
    
    </>)
  }
}