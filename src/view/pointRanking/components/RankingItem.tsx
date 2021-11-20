import { Skeleton } from "@mui/material";
import { withRouter, RouteComponentProps  } from 'react-router-dom';
import React from "react";
import { UserRanking } from "@model/User";

interface Props extends RouteComponentProps  {
  data: UserRanking;
  isLoading: boolean;
  isHighlight: boolean;
};

class RankingItem extends React.Component<Props> {
  constructor (props : any) {
    super (props);
    this.onInspectPerson = this.onInspectPerson.bind(this)
  }
  onInspectPerson () : void {
    this.props.history.replace('/profile/' + this.props.data.user_id)
  }
  public render(): JSX.Element {
    const data = this.props.data;
    const isLoading = this.props.isLoading;
    const isHighlight = this.props.isHighlight;
    return (
      <>
        <div className=" w-full h-auto text-center align-middle" onClick={this.onInspectPerson}>
          <div
            className={`${
              isHighlight ? "bg-primary primary-contentlist" : "contentlist"
            } w-full h-20 mx-auto flex align-middle`}
            style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            <div
              className={`flex-none ${
                isHighlight ? "bg-white" : "bg-primary"
              } h-3/6 px-6 md:px-12 align-middle my-auto ml-7 rounded`}
            >
              <div
                className={`font-semibold ${
                  isHighlight ? "text-blueSecondary" : "text-white"
                }`}
                style={{ marginTop: 8 }}
              >
                {isLoading ? (
                  <Skeleton variant="text" className="w-1/2 mx-auto" />
                ) : (
                  `# ${data.ranking}`
                )}
              </div>
            </div>
            <div
              className={`flex-none my-auto ml-5 text-base md:text-xl tracking-wider ${
                isHighlight ? "text-white" : "text-darkPrimary"
              }`}
            >
              <span>
                {" "}
                {isLoading ? (
                  <Skeleton variant="text" className="w-1/2 mx-auto" />
                ) : (
                  data.name
                )}
              </span>
            </div>
            <div className="hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider">
              <span></span>
            </div>
            <div className="flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full">
              <div className="hidden xl:flex flex-grow mr-10 my-auto align-middle"></div>
              <div className="flex-grow xl:flex-none my-auto">
                <div
                  className={`${
                    isHighlight ? "text-white" : "text-darkPrimary"
                  }`}
                >
                  <span className="">
                    {isLoading ? (
                      <Skeleton variant="text" className="w-1/2 mx-auto" />
                    ) : (
                      `${data.point.toLocaleString()} Points`
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RankingItem);
