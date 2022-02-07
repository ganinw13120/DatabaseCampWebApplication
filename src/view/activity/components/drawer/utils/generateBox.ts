import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Box, BoxDetail } from "@model/Drawer"

const generateBox = (entities: Array<string>): Box => {
    const ref = React.createRef<HTMLDivElement>();
    let entityList: Array<BoxDetail> = [];
    entities.forEach(e => {
        const refEntity = React.createRef<HTMLDivElement>();
        entityList.push({
            text: e,
            ref: refEntity,
            uuid : uuidv4()
        })
    })
    const box: Box = {
        ref: ref,
        uuid: uuidv4(),
        points : [],
        entities : entityList,
        pos : {
            x : 0,
            y : 0
        },
        isSelect : false,
        isHover : false,
        isDragging : false,
    }
    return box;
}

export default generateBox