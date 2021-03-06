// AlertTab.tsx
/**
 * This file contains components, related to alert tab pages in activity.
*/
import { Component } from 'react';
import { ActivityAlert } from '@model/Learning';

import Alerticon from '@assets/alerticon.svg';
import SuccessIcon from '@assets/alertsuccess.svg';

const greenAlert = '#BFF4B9';
const successAlert = '#38A605';
const pinkAlert = "#EAB3B7";
const redAlert = '#FFE2E4';

interface AlertProps {
    alert : ActivityAlert | null,
}

export default class AlertTab extends Component<AlertProps, {}> {
    public render(): JSX.Element {
        const {alert} = this.props;
        const {isSuccess, feedback} = alert || {} as ActivityAlert;
        return (<>
            <div className='flex mt-10' style={{opacity : alert ? 1 : 0}}>
                <div className='flex-none w-6 ' style={{backgroundColor : isSuccess ? successAlert : pinkAlert}}>

                </div>
                <div className='flex-grow my-auto h-auto flex'  style={{backgroundColor : isSuccess ? greenAlert : redAlert}}>
                    <img src={Alerticon} alt="Alert" className={`px-10 h-12 my-4 ${isSuccess ? ' hidden' : ' '}`} />
                    <img src={SuccessIcon} alt="Alert" className={`px-10 h-12 my-4 ${isSuccess ? ' ' : ' hidden'}`} />
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
