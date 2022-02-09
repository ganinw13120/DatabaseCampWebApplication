import { LinePathParameters, pathReservY, pathReservX, lineStartTickDistance } from "../components/Line";
import { PointPosition, Position } from "@model/Drawer";
import parseClientRectsToPosition from "./parseClientRectsToPosition";

const debugCase = false;

const generateShortestPath = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;
    const path: Array<Array<Position>> = [];
    if (startInfo.box && stopInfo.box) {
        let startPos : Position;
        let stopPos : Position; 
        try {
            startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
            stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
        } catch (e) {
            console.log(e)
            startPos = {x : 0, y : 0};
            stopPos = {x : 0, y : 0};
        } 
        if (
            (startPos.x + lineStartTickDistance <= stopPos.x - lineStartTickDistance && startInfo.box.pointPosition === PointPosition.Right && stopInfo.box.pointPosition === PointPosition.Left) ||
            (startPos.x - lineStartTickDistance >= stopPos.x + lineStartTickDistance && startInfo.box.pointPosition === PointPosition.Left && stopInfo.box.pointPosition === PointPosition.Right)
        ) {
            path.push(getSimplePath(param));
            if (debugCase) console.log('Case 1');
        } else {
            if (startInfo.box.pointPosition === stopInfo.box.pointPosition) {
                if (startInfo.box.pointPosition === PointPosition.Right) {
                    if (debugCase) console.log('Case 2');
                    if (startPos.x > stopPos.x) {
                        path.push(
                            getRoundTopRight({
                                startInfo : stopInfo,
                                stopInfo : startInfo,
                                offset : offset,
                                getPointFromInfo,
                                pointOffset
                            }),
                            getRoundBottomRight({
                                startInfo : stopInfo,
                                stopInfo : startInfo,
                                offset : offset,
                                getPointFromInfo,
                                pointOffset
                            }),
                        )
                    }
                    else {
                        if (debugCase) console.log('Case 3');
                        path.push(
                            getRoundTopRight(param),
                            getRoundBottomRight(param)
                        )
                    }
                } else {
                    if (startPos.x > stopPos.x) {
                        if (debugCase) console.log('Case 4');
                        path.push(
                            getRoundBottomLeft(param),
                        )
                    }
                    else {
                        if (debugCase) console.log('Case 5');
                        path.push(
                            getRoundBottomLeft(param)
                        )
                    }
                }
            }
            else if (startInfo.box.pointPosition !== stopInfo.box.pointPosition) {
                if (startInfo.box.pointPosition === PointPosition.Left) {
                    if (debugCase) console.log('Case 6');
                    path.push(
                        getRountUp(param),
                    )
                } else {
                    if (debugCase) console.log('Case 7');
                    path.push(
                        getRountUp({
                            startInfo : stopInfo,
                            stopInfo : startInfo,
                            offset : offset,
                            getPointFromInfo,
                            pointOffset
                        }).reverse(),
                    )
                }
            }
        }
    } else {
        if (debugCase) console.log('Case 8');
        path.push(getSimplePath(param));
    }

    if (path.length === 0) {
        if (debugCase) console.log('Case 0');
        path.push(getSimplePath(param)) /// Prevent Error (Test purpose)
    }

    // if ((startPos.x < stopPos.x && startPoint?.position))

    let min: Position[] = [];
    let minDistance: number = Infinity;
    path.forEach(e => {
        const distance = calDistance(e);
        if (distance < minDistance) {
            minDistance = distance;
            min = e;
        }
    })
    return min;
}

const getSimplePath = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;
    
    
    let startPos : Position;
    let stopPos : Position; 

    try {
        startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
        stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
    } catch (e) {
        console.log(e)
        startPos = {x : 0, y : 0};
        stopPos = {x : 0, y : 0};
    }
    
    const middlePositionStart: Position = {
        x: (startPos.x + stopPos.x) / 2,
        y: startPos.y,
    }
    const middlePositionStop: Position = {
        x: (startPos.x + stopPos.x) / 2,
        y: stopPos.y,
    }
    return [
        startPos,
        middlePositionStart,
        middlePositionStop,
        stopPos
    ]
}

const calDistance = (pos: Position[]): number => {
    let totalDistance: number = 0;
    let i: number = 0;
    while (i < pos.length - 2) {
        const cur = pos[i];
        const next = pos[i + 1];
        const distance = Math.sqrt(Math.pow(cur.x - next.x, 2) + Math.pow(cur.y - next.y, 2));
        totalDistance += distance;
        i++;
    }
    return totalDistance;
}

const getRoundBottomLeft = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;
    const stopBox = stopInfo.box!.box;
    let checkPoints: Position[] = [];
    const boxPos = parseClientRectsToPosition(stopBox!.ref.current!.getClientRects()[0], 0, offset);
    const boxRect = stopBox!.ref.current!.getClientRects()[0];
    
    let startPos : Position;
    let stopPos : Position; 

    try {
        startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
        stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
    } catch (e) {
        console.log(e)
        startPos = {x : 0, y : 0};
        stopPos = {x : 0, y : 0};
    }

    /// 1.
    checkPoints.push({ x: startPos.x, y: startPos.y });
    if (startPos.x + lineStartTickDistance >= boxPos!.x - pathReservX) {
        /// 2.
        checkPoints.push({ x: startPos.x - pathReservX, y: startPos.y });
        /// 3.
        checkPoints.push({ x: stopPos.x - pathReservX, y: startPos.y });
    }
    else {
        /// 2.
        checkPoints.push({ x: startPos.x - pathReservX, y: startPos.y });
        /// 3.
        checkPoints.push({ x: startPos.x - pathReservX, y: (boxPos!.y + boxRect!.height) + pathReservY });
        /// 4.
        checkPoints.push({ x: stopPos.x - pathReservX, y: (boxPos!.y + boxRect!.height) + pathReservY });
    }
    /// 5.
    checkPoints.push({ x: stopPos.x - pathReservX, y: stopPos.y });
    /// 6.
    checkPoints.push({ x: stopPos.x, y: stopPos.y });
    return checkPoints;
}

const getRoundTopRight = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;
    let checkPoints: Position[] = [];
    
    let startPos : Position;
    let stopPos : Position; 

    try {
        startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
        stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
    } catch (e) {
        console.log(e)
        startPos = {x : 0, y : 0};
        stopPos = {x : 0, y : 0};
    }

    const stopBox = stopInfo.box!.box;
    const boxPos = parseClientRectsToPosition(stopBox!.ref.current!.getClientRects()[0], 0, offset);
    /// 1.
    checkPoints.push({ x: startPos.x, y: startPos.y });
    if (startPos.x + lineStartTickDistance >= boxPos!.x - pathReservX) {
        /// 2.
        checkPoints.push({ x: stopPos.x + pathReservX, y: startPos.y });
    }
    else {
        /// 2.
        checkPoints.push({ x: boxPos!.x - pathReservX, y: startPos.y });
        /// 3.
        checkPoints.push({ x: boxPos!.x - pathReservX, y: boxPos!.y - pathReservY });
        /// 4.
        checkPoints.push({ x: stopPos.x + pathReservX, y: boxPos!.y - pathReservY });
    }
    /// 5.
    checkPoints.push({ x: stopPos.x + pathReservX, y: stopPos.y });
    /// 6.
    checkPoints.push({ x: stopPos.x, y: stopPos.y });
    return checkPoints;
}

const getRoundBottomRight = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;

    let startPos : Position;
    let stopPos : Position; 

    try {
        startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
        stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
    } catch (e) {
        console.log(e)
        startPos = {x : 0, y : 0};
        stopPos = {x : 0, y : 0};
    }

    const stopBox = stopInfo.box!.box;
    let checkPoints: Position[] = [];
    const boxPos = parseClientRectsToPosition(stopBox!.ref.current!.getClientRects()[0], 0, offset);
    const boxRect = stopBox?.ref.current?.getClientRects()[0];
    /// 1.
    checkPoints.push({ x: startPos.x, y: startPos.y });
    if (startPos.x + lineStartTickDistance >= boxPos!.x - pathReservX) {
        /// 2.
        checkPoints.push({ x: stopPos.x + pathReservX, y: startPos.y });
    }
    else {
        /// 2.
        checkPoints.push({ x: boxPos!.x - pathReservX, y: startPos.y });
        /// 3.
        checkPoints.push({ x: boxPos!.x - pathReservX, y: (boxPos!.y + boxRect!.height) + pathReservY });
        /// 4.
        checkPoints.push({ x: stopPos.x + pathReservX, y: (boxPos!.y + boxRect!.height) + pathReservY });
    }
    /// 5.
    checkPoints.push({ x: stopPos.x + pathReservX, y: stopPos.y });
    /// 6.
    checkPoints.push({ x: stopPos.x, y: stopPos.y });
    return checkPoints;
}

/// Oposite Position Case
const getRountUp = (param: LinePathParameters): Position[] => {
    const {
        startInfo,
        stopInfo,
        offset,
        getPointFromInfo,
        pointOffset
    } = param;

    let startPos : Position;
    let stopPos : Position; 

    try {
        startPos = startInfo.box ? parseClientRectsToPosition(getPointFromInfo(startInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : startInfo.position!;
        stopPos = stopInfo.box ? parseClientRectsToPosition(getPointFromInfo(stopInfo.box).ref.current!.getClientRects()[0], pointOffset, offset) : stopInfo.position!;
    } catch (e) {
        console.log(e)
        startPos = {x : 0, y : 0};
        stopPos = {x : 0, y : 0};
    }

    const startBox = startInfo.box!.box;
    const boxPos = parseClientRectsToPosition(startBox!.ref.current!.getClientRects()[0], 0, offset);
    const startBoxRect = startBox?.ref.current?.getClientRects()[0];
    let checkPoints: Position[] = [];

    /// 1.
    checkPoints.push({ x: startPos.x, y: startPos.y });

    /// 2.
    checkPoints.push({ x: startPos.x - pathReservX, y: startPos.y });

    if (startPos.y < stopPos.y) {
        /// 3.
        checkPoints.push({ x: startPos.x - pathReservX, y: boxPos!.y + startBoxRect!.height + pathReservY })

        /// 4.
        checkPoints.push({ x: stopPos.x + pathReservX, y: boxPos!.y + startBoxRect!.height + pathReservY })
    }
    else {
        /// 3.
        checkPoints.push({ x: startPos.x - pathReservX, y: boxPos!.y - pathReservY })

        /// 4.
        checkPoints.push({ x: stopPos.x + pathReservX, y: boxPos!.y - pathReservY })
    }

    /// 5.
    checkPoints.push({ x: stopPos.x + pathReservX, y: stopPos.y })

    /// 6.
    checkPoints.push({ x: stopPos.x, y: stopPos.y })

    return checkPoints;
}

export default generateShortestPath;