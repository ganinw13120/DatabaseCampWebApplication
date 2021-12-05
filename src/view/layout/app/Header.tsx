// Header.tsx
/**
 * This file contains components, related to header title used in pages.
*/

import React from "react";

interface HeaderProps {
  text : string
}

export default class Header extends React.Component <HeaderProps ,{}> {
  public render(): JSX.Element {
    return (
      <>
        <div className="flex h-auto space-x-4">
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
            <span className="w-full bg-darkPrimary">..</span>
          </div>
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
            <span>{this.props.text}</span>
          </div>
        </div>
      </>
    );
  }
}
