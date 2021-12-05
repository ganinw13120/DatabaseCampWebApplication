// Header.tsx
/**
 * This file contains components, related to application layout, in a page.
*/

import React from "react";
import Stepper from "./Stepper";
import '../app/applayout.css';
import Sidebar from "./Sidebar";

export default class AppLayout extends React.Component {
  public constructor(props : any) {
    super(props);
  }
  render(): JSX.Element {
    return <>
    
      <div className="md:flex font-prompt bg-bg">
        <Sidebar/>
        <div className='md:flex-grow relative'>
          <div className='stepper-container h-auto bottom-0'>
            <Stepper />
          </div>
          {this.props.children}
        </div>
      </div>
        
    </>
  }
}