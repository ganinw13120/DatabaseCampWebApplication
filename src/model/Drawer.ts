import React from "react"

export type Position = {
    x : number
    y : number
}

export type Line = {
    uuid : string
    startType : LineType
    stopType : LineType
    startInfo : LineInfo
    stopInfo : LineInfo
    isSelect : boolean
    startPosition : Position
    stopPosition : Position
}

export type LineInfo = {
    box ?: LineInfoBox
    position ?: Position
}

export type LineInfoBox = {
    box : Box,
    level : number,
    pointPosition : PointPosition,
}

export type Box = {
    uuid : string
    entities : BoxDetail[]
    points : Point[]
    ref : React.RefObject<HTMLDivElement>
    pos : Position
    isSelect : boolean
    isHover : boolean
    isDragging : boolean
}

export type BoxDetail = {
    uuid : string
    text : string
    ref : React.RefObject<HTMLDivElement>
    isFocus : boolean
    keyType : KeyType
}

export type Point = {
    uuid : string
    position : PointPosition
    level : number
    isHover : boolean
    ref : React.RefObject<SVGSVGElement>
    parentRef : React.RefObject<HTMLDivElement>
}

export type Entity = Line | Box | Point


export enum PointPosition {
    Left = 'Left',
    Right = 'Right',
}

export enum LineType {
    OnlyOne,
    More,
    AnyNumber,
    Optional
}

export enum ActionType {
    None = 'None',
    Drag = 'Drag',
    Focus = 'Focus',
    Draw = 'Draw',
    DrawReady = 'DrawReady',
}
export enum KeyType {
    Primary = 'primary',
    Foreign = 'foreign',
    None = 'None'
}