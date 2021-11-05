import { Skeleton } from "@mui/material";
import React from "react";

type Ranking = {
  user_id: number;
  name: string;
  point: number;
  ranking: number;
};

type Props = {
  data: Ranking;
  isLoading: boolean;
  isHighlight: boolean;
};

export default class RankingItem extends React.Component<Props> {
  public render(): JSX.Element {
    const data = this.props.data;
    const isLoading = this.props.isLoading;
    const isHighlight = this.props.isHighlight;
    return (
      <>
        <div className=" w-full h-auto text-center align-middle">
          <div
            className={`${
              isHighlight ? "bg-primary" : "contentlist"
            } w-full h-20 mx-auto flex align-middle`}
            style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            <div
              className={`flex-none ${
                isHighlight ? "bg-white" : "bg-primary"
              } h-3/6 w-36 align-middle my-auto ml-7 rounded`}
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
              className={`flex-none my-auto ml-5 text-xl tracking-wider ${
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
                      `${data.point} Points`
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
