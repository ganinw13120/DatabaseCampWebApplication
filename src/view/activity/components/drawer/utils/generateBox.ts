import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Box, BoxEntity } from "../model/Drawer"

const generateBox = (title: string, entities: Array<string>): Box => {
    const ref = React.createRef<HTMLDivElement>();
    const refTitle = React.createRef<HTMLDivElement>();
    let entityList: Array<BoxEntity> = [];
    entities.forEach(e => {
        const refEntity = React.createRef<HTMLDivElement>();
        entityList.push({
            text: e,
            ref: refEntity
        })
    })
    const box: Box = {
        ref: ref,
        uuid: uuidv4(),
        state: {
            isDragging: false,
            isHover: false,
            isSelect: false,
            title: {
                text: title,
                ref: refTitle
            },
            entities: entityList,
            pos: {
                x: 0,
                y: 0
            }
        },
    }
    return box;
}

export default generateBox