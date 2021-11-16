import { Component } from 'react';
import { ActivityAlert } from '../../../model/Learning';

import Alerticon from '../../../assets/alerticon.svg';
import SuccessIcon from '../../../assets/alertsuccess.svg';

const greenAlert = '#BFF4B9';
const successAlert = '#38A605';
const pinkAlert = "#EAB3B7";
const redAlert = '#FFE2E4';

interface AlertProps {
    alert : ActivityAlert | null,
}

interface AlertState {
}

export default class AlertTab extends Component<AlertProps, AlertState> {
    public render(): JSX.Element {
        const {alert} = this.props;
        const {isSuccess, feedback} = alert || {} as ActivityAlert;
        return (<>
            <div className='flex mt-10' style={{opacity : alert ? 1 : 0}}>
                <div className='flex-none w-6 ' style={{backgroundColor : isSuccess ? successAlert : pinkAlert}}>

                </div>
                <div className='flex-grow my-auto h-auto flex'  style={{backgroundColor : isSuccess ? greenAlert : redAlert}}>
                    <img src={isSuccess ? SuccessIcon : Alerticon} alt="Alert" className='px-10 h-12 my-4' />
                    <div className='text-left text-2xl font-medium my-auto'>
                        <span>
                            {feedback}
                        </span>
                    </div>
                </div>
            </div>

        </>)
    }
}
