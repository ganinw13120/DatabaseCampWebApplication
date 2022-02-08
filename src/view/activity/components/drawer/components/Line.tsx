import React, { Component, ReactElement} from "react";
import { Line, LineInfo, LineInfoBox, LineType, Point, Position } from "@model/Drawer";
import { v4 as uuidv4 } from "uuid";
import generateShortestPath from "../utils/generateShortestPath";
import { inject, observer } from "mobx-react";
import { DrawerStore } from "@root/store/stores/DrawerStore/DrawerStore";

type LinePath = {
  checkPoints: Position[];
  startAngle: Angle;
  stopAngle: Angle;
};

enum Angle {
  ToLeft,
  ToRight,
}

enum LineColor {
  Black = "#000000",
  Blue = "#007EF3",
}

export type LinePathParameters = {
  startInfo : LineInfo;
  stopInfo : LineInfo;
  offset: Position;
  pointOffset : number
  getPointFromInfo (info : LineInfoBox) : Point;
};

export const pathReservY: number = 10;
export const pathReservX: number = 30;

const pointOffset: number = 15;

export const lineStartTickDistance: number = 13;
export const lineStartTickLength: number = 26;

export const lineStopTickDistance: number = 20;
export const lineStopTickSpread: number = 13;

type LineProps = {
  data: Line;
  drawerStore?: DrawerStore;
};

@inject("drawerStore")
@observer
export default class LineComponent extends Component<LineProps, {}> {
  private generateLineElement(): ReactElement[] {
    const { data } = this.props;
    const offset = this.props.drawerStore!.getSvgOffset();
    const { getPointFromInfo, deleteLine } = this.props.drawerStore!;
    let element: ReactElement[] = [];

    const startPos = data.startPosition;
    const stopPos = data.stopPosition;

    if (data.startInfo.box && !getPointFromInfo(data.startInfo.box)) {
      deleteLine(data.uuid);
      return [];
    }
    if (data.stopInfo.box && !getPointFromInfo(data.stopInfo.box)) {
      deleteLine(data.uuid);
      return [];
    }

    const _getPointFromInfo = (info : LineInfoBox) : Point => {
      const res = getPointFromInfo(info);
      return res!;
    }

    const linePath = this.generateLinePath({
      startInfo: data.startInfo,
      stopInfo: data.stopInfo,
      offset: offset,
      pointOffset,
      getPointFromInfo : _getPointFromInfo
    });

    const { startAngle, stopAngle } = linePath;
    let i = 0;
    while (i < linePath.checkPoints.length - 1) {
      const linePathString = `M ${linePath.checkPoints[i].x} ${linePath.checkPoints[i].y
        }, ${linePath.checkPoints[i + 1].x} ${linePath.checkPoints[i + 1].y}`;
      element.push(this.generateSvgLine(linePathString));
      i++;
    }
    switch (data.startType) {
      case LineType.OnlyOne: {
        element.push(...this.generateHeadOne(startAngle, startPos));
        break;
      }
    }

    switch (data.stopType) {
      case LineType.More: {
        element.push(...this.generateHeadMany(stopAngle, stopPos));
        break;
      }
    }

    return element;
  }

  private generateLinePath(param: LinePathParameters): LinePath {
    const shortestPath = generateShortestPath(param);
    const stopAngle =
      shortestPath[shortestPath.length - 1].x <
        shortestPath[shortestPath.length - 2].x
        ? Angle.ToLeft
        : Angle.ToRight;
    const startAngle =
      shortestPath[0].x < shortestPath[1].x ? Angle.ToRight : Angle.ToLeft;

    return {
      checkPoints: shortestPath,
      startAngle: startAngle,
      stopAngle: stopAngle,
    };
  }


  private generateHeadOne(direction: Angle, pos: Position): ReactElement[] {
    const element: ReactElement[] = [];
    switch (direction) {
      case Angle.ToLeft: {
        element.push(
          this.generateSvgLine(
            `M ${pos.x - lineStartTickDistance} ${pos.y + lineStartTickLength / 2
            }, ${pos.x - lineStartTickDistance} ${pos.y - lineStartTickLength / 2
            }`
          )
        );
        break;
      }
      case Angle.ToRight: {
        element.push(
          this.generateSvgLine(
            `M ${pos.x + lineStartTickDistance} ${pos.y + lineStartTickLength / 2
            }, ${pos.x + lineStartTickDistance} ${pos.y - lineStartTickLength / 2
            }`
          )
        );
        break;
      }
    }
    return element;
  };

  private generateHeadMany(
    direction: Angle,
    pos: Position
  ): ReactElement[] {
    const element: ReactElement[] = [];
    switch (direction) {
      case Angle.ToLeft: {
        element.push(
          this.generateSvgLine(
            `M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y + lineStopTickSpread
            }`
          )
        );
        element.push(
          this.generateSvgLine(
            `M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y}`
          )
        );
        element.push(
          this.generateSvgLine(
            `M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y - lineStopTickSpread
            }`
          )
        );
        break;
      }
      case Angle.ToRight: {
        element.push(
          this.generateSvgLine(
            `M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y + lineStopTickSpread
            }`
          )
        );
        element.push(
          this.generateSvgLine(
            `M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y}`
          )
        );
        element.push(
          this.generateSvgLine(
            `M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y - lineStopTickSpread
            }`
          )
        );
        break;
      }
    }
    return element;
  };

  private generateSvgLine(path: string): ReactElement {
    const { data } = this.props;
    const color = data.isSelect ? LineColor.Blue : LineColor.Black;
    const {onSelectLine} = this.props.drawerStore!;
    return (
      <>
        <path
          onMouseDown={() => {
            onSelectLine(data);
            // onLineSelect();
          }}
          key={uuidv4()}
          d={path}
          stroke={color}
          fill="transparent"
          strokeWidth="3"
        />
      </>
    );
  }

  render(): JSX.Element {
    return (
      <>
        {this.generateLineElement()}
      </>
    )
  }
}