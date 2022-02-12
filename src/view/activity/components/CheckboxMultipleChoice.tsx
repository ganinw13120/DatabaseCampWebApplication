// MultipleChoiceComponent.tsx
/**
 * This file contains components, related to choices in multiple choice activity.
*/

import { Component, ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxMultipleAnswer, MultipleChoiceDetail } from '@model/Learning';
import parse from 'html-react-parser';

interface CheckboxMultipleChoiceState {
  selectedChoice: number[],
}

interface CheckboxMultipleChoiceProps {
  info: MultipleChoiceDetail[],
  updateResult(e: CheckboxMultipleAnswer): void
}

export default class CheckboxMultipleChoiceComponent extends Component<CheckboxMultipleChoiceProps, CheckboxMultipleChoiceState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      selectedChoice: [],
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
  handleSelect(e: number, type: 'Add' | 'Remove'): void {
    const { updateResult } = this.props;
    let newAnswer: number[] = [...this.state.selectedChoice];
    switch (type) {
      case "Add":
        newAnswer.push(e);
        break;
      case "Remove":
        newAnswer = newAnswer.filter(_e => _e !== e);
        break;
    }
    updateResult(newAnswer)
    this.setState({
      selectedChoice: newAnswer
    })
  }
  public render(): JSX.Element {
    const { selectedChoice } = this.state;
    const { info } = this.props;
    let choiceList: ReactElement[] = [];
    info.forEach((e, key: number) => {
      const isSelect = selectedChoice!.some(_e => _e === e.multiple_choice_id);
      choiceList.push(<Choice key={key} id={e.multiple_choice_id} displayText={e.content} handleSelect={this.handleSelect} selected={isSelect} />)
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
  selected: boolean
  handleSelect(id: number, type: 'Add' | 'Remove'): void
  id: number
  displayText: string
}

class Choice extends Component<ChoiceProps, {}> {
  public render(): JSX.Element {
    const { selected, handleSelect, id, displayText } = this.props;
    return (<>

      <div className='w-full flex'>
        <Checkbox name='choices' size='medium'
          value={id}
          checked={selected}
          onChange={(e) => {
            handleSelect(id, selected ? "Remove" : "Add");
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