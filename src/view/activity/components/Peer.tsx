// MultipleChoiceComponent.tsx
/**
 * This file contains components, related to choices in multiple choice activity.
*/

import { Component, ReactElement } from 'react';
import Radio from '@mui/material/Radio';
import { DrawerChoice, MultipleAnswer, MultipleChoice, PeerAnswer, PeerChoice, PeerChoiceGroup, PeerProblem } from '@model/Learning';
import Drawer from './drawer/components/Drawer';

interface PeerState {
  selectedChoice: PeerAnswer,
}

interface PeerProps {
  info: PeerChoice,
  drawerInfo: DrawerChoice,
  updateResult(e: PeerAnswer): void
}

export default class Peer extends Component<PeerProps, PeerState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      selectedChoice: {
        selected: []
      },
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
  handleSelect(e: string, key: number): void {
    const { updateResult } = this.props;
    let tmp = this.state.selectedChoice;
    tmp.selected[key] = e;
    this.setState({
      selectedChoice: tmp
    })
    updateResult(tmp);
  }
  public render(): JSX.Element {
    const { selectedChoice } = this.state;
    const { info, drawerInfo } = this.props;
    let problemList: ReactElement[] = [];
    info.problems.groups.forEach((e, key) => {
      problemList.push(<Problem info={e} handleSelect={this.handleSelect} group_id={key} key={key} answer={selectedChoice.selected[key]} />)
    })
    // info.problems.forEach((e, key : number) => {
    //   choiceList.push(<Choice key={key} id={e.multiple_choice_id} displayText={e.content} handleSelect={this.handleSelect} selected={selectedChoice} />)
    // })
    return (
      <>
        <div className='peer-drawer-container'>
          <Drawer info={drawerInfo} />
        </div>
        <div className='w-3/4 mx-auto'>
          {problemList}
        </div>

      </>
    );
  }
}

type ProblemProps = {
  info: PeerChoiceGroup
  group_id: number
  handleSelect(e: string, key: number): void
  answer: string
}

class Problem extends Component<ProblemProps, {}> {
  public render(): JSX.Element {
    return (<>
      <div className='my-6'>
        <div className='text-xl'>
          {this.props.info.name}
        </div>
        {(() => {
          const choiceList: ReactElement[] = [];
          this.props.info.choices.forEach((e, key) => {
            choiceList.push(<Choice key={key} id={key} displayText={e} handleSelect={() => {
              this.props.handleSelect(e, this.props.group_id)
            }} selected={this.props.answer === e} />)
          })
          return choiceList;
        })()}
      </div>
    </>)
  }
}

type ChoiceProps = {
  selected: boolean
  handleSelect(): void
  id: number
  displayText: string
}

class Choice extends Component<ChoiceProps, {}> {
  public render(): JSX.Element {
    const { selected, handleSelect, id, displayText } = this.props;
    return (<>

      <div className='w-full flex'>
        <Radio name='choices' size='medium'
          value={id}
          checked={selected}
          onChange={() => {
            handleSelect();
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