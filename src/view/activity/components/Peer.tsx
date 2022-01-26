// MultipleChoiceComponent.tsx
/**
 * This file contains components, related to choices in multiple choice activity.
*/

import { Component, ReactElement } from 'react';
import Radio from '@mui/material/Radio';
import {MultipleAnswer, MultipleChoice, PeerChoice, PeerProblem} from '@model/Learning';
import Drawer from './drawer';

interface PeerState {
  selectedChoice : number | null,
}

interface PeerProps {
  info : PeerChoice,
  updateResult(e : MultipleAnswer) : void
}

export default class Peer extends Component<PeerProps, PeerState> {
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
    let problemList: ReactElement[] = [];
    info.problems.forEach(e=>{
      problemList.push(<Problem info={e} handleSelect={this.handleSelect} />)
    })
    // info.problems.forEach((e, key : number) => {
    //   choiceList.push(<Choice key={key} id={e.multiple_choice_id} displayText={e.content} handleSelect={this.handleSelect} selected={selectedChoice} />)
    // })
    return (
      <>
        <div className='peer-drawer-container'>
          <Drawer />

        </div>
        <div className='w-3/4 mx-auto'>
          {problemList}
        </div>

      </>
    );
  }
}

type ProblemProps = {
  info : PeerProblem
  handleSelect(e : number): void
}

class Problem extends Component<ProblemProps, {}> {
  public render () : JSX.Element {
    return (<>
    <div className='my-6'>
      
    <div className='text-xl'>
        {this.props.info.question}
      </div>
      {(()=>{
        const choiceList : ReactElement[] = [];
        this.props.info.choices.forEach((e, key)=>{
          choiceList.push(<Choice key={key} id={e.multiple_choice_id} displayText={e.content} handleSelect={this.props.handleSelect} selected={false} />)
        })
        return choiceList;
      })()}
    </div>
    </>)
  }
}

type ChoiceProps = {
  selected : boolean
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
              checked={selected}
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