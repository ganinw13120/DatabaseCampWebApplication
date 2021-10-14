import React from "react";
import '../app/applayout.css';
import Sidebar from "./Sidebar";

export default class AppLayout extends React.Component {
  render(): JSX.Element {
    return <>
    
      <div className="grid md:grid-cols-2 font-prompt bg-bg">
        <Sidebar/>
        {this.props.children}
      </div>
        
    </>
  }
}