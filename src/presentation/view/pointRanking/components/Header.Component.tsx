import { Skeleton } from "@mui/material";
import React from "react";

export default class Header extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <div className="flex h-auto space-x-4">
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
            <span className="w-full bg-darkPrimary">..</span>
          </div>
          <div className="text-3xl text-darkPrimary font-semibold tracking-wider pt-6">
            <span>Overview</span>
          </div>
        </div>
      </>
    );
  }
}
