import React from "react";
import '../app/applayout.css';
import Sidebar from "./Sidebar";

export default class AppLayout extends React.Component {
  render(): JSX.Element {
    return <>
    
      <div className="flex font-prompt bg-bg">
        <Sidebar/>
        <div className='flex-grow'>
          {this.props.children}
        </div>
      </div>
        
    </>
  }
}