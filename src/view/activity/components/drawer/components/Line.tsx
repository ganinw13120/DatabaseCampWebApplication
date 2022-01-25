import React, { ReactElement, useEffect, useState } from 'react';
import { Line, LineState, LineType, Point, Position } from '../model/Drawer';
import { v4 as uuidv4 } from 'uuid';
import parseClientRectsToPosition from '../utils/parseClientRectsToPosition';
import generateShortestPath from '../utils/generateShortestPath';
import { useDrawerContext } from '../hooks/useDrawerContext';

type LineComponentProps = {
    data: Line
    setLineState: (state: LineState) => void
}

type LinePath = {
    checkPoints: Position[]
    startAngle: Angle
    stopAngle: Angle
}

enum Angle {
    ToLeft,
    ToRight
}

enum LineColor {
    Black = '#000000',
    Blue = '#007EF3'
}

export type LinePathParameters = {
    startPos: Position
    stopPos: Position
    startPoint?: Point
    stopPoint?: Point
    offset : Position
}

export const pathReservY: number = 10;
export const pathReservX: number = 30;

const pointOffset: number = 15;

export const lineStartTickDistance: number = 13;
export const lineStartTickLength: number = 26;

export const lineStopTickDistance: number = 20;
export const lineStopTickSpread: number = 13;

const LineComponent: React.FC<LineComponentProps> = ({ data, setLineState }) => {

    const [state, setState] = useState<LineState>(data.state);
    const { pos: currentPos, offset } = useDrawerContext();

    const generateHeadOne = (direction : Angle, pos : Position) : ReactElement[] => {
        const element : ReactElement[] = [];
        switch (direction) {
            case Angle.ToLeft :{
                element.push(generateSvgLine(`M ${pos.x - lineStartTickDistance} ${pos.y + (lineStartTickLength / 2)}, ${pos.x - lineStartTickDistance} ${pos.y - (lineStartTickLength / 2)}`))
                break;
            }
            case Angle.ToRight : {
                element.push(generateSvgLine(`M ${pos.x + lineStartTickDistance} ${pos.y + (lineStartTickLength / 2)}, ${pos.x + lineStartTickDistance} ${pos.y - (lineStartTickLength / 2)}`))
                break;
            }
        }
        return element;
    }

    const generateHeadMany = (direction : Angle, pos : Position) : ReactElement[] => {
        const element : ReactElement[] = [];
        switch (direction) {
            case Angle.ToLeft :{
                element.push(generateSvgLine(`M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y + lineStopTickSpread}`))
                element.push(generateSvgLine(`M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y}`))
                element.push(generateSvgLine(`M ${pos.x + lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y - lineStopTickSpread}`))
                break;
            }
            case Angle.ToRight : {
                element.push(generateSvgLine(`M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y + lineStopTickSpread}`))
                element.push(generateSvgLine(`M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y}`))
                element.push(generateSvgLine(`M ${pos.x - lineStopTickDistance} ${pos.y}, ${pos.x} ${pos.y - lineStopTickSpread}`))
                break;
            }
        }
        return element;
    }

    const generateLinePath = (param: LinePathParameters): LinePath => {

        const shortestPath = generateShortestPath(param);
        const stopAngle = shortestPath[shortestPath.length-1].x < shortestPath[shortestPath.length-2].x ? Angle.ToLeft : Angle.ToRight;
        const startAngle = shortestPath[0].x < shortestPath[1].x ? Angle.ToRight : Angle.ToLeft;

        return {
            checkPoints: shortestPath,
            startAngle: startAngle,
            stopAngle: stopAngle,
        }
    }

    useEffect(() => {
        setLineState(state);
    }, [state])

    const generateLineElement = (): ReactElement[] => {

        let element: ReactElement[] = [];

        const startPos = data.startRef?.current ? parseClientRectsToPosition(data.startRef.current!.getClientRects()[0], pointOffset, offset) : data.startPosition!
        const stopPos = data.stopRef?.current ? parseClientRectsToPosition(data.stopRef.current!.getClientRects()[0], pointOffset, offset) : data.stopPosition!

        const linePath = generateLinePath({
            startPos: startPos,
            stopPos: stopPos,
            startPoint: data.startPoint,
            stopPoint: data.stopPoint,
            offset : offset
        });
        const {startAngle, stopAngle} = linePath;
        let i = 0;
        while (i < linePath.checkPoints.length-1) {
            const linePathString = `M ${linePath.checkPoints[i].x} ${linePath.checkPoints[i].y}, ${linePath.checkPoints[i+1].x} ${linePath.checkPoints[i+1].y}`;
            element.push(generateSvgLine(linePathString))
            i++;
        }
        switch (data.startType) {
            case LineType.OnlyOne: {
                element.push(...generateHeadOne(startAngle, startPos));
                break;
            }
        }

        switch (data.stopType) {
            case LineType.More: {
                element.push(...generateHeadMany(stopAngle, stopPos));
                break;
            }
        }

        return element
    }

    const onLineSelect = () => {
        console.log('selecting...')
        setState({
            ...state,
            isFocus : true
        })
    }

    const generateSvgLine = (path: string): ReactElement => {
        const color = data.state.isFocus ? LineColor.Blue : LineColor.Black;
        return <><path onMouseDown={() => { onLineSelect() }} key={uuidv4()} d={path} stroke={color} fill="transparent" strokeWidth="3" /></>
    }

    return <>

        {generateLineElement()}

    </>
}

export default LineComponent
