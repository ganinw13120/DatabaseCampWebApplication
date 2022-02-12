import { Position } from "@model/Drawer"

const parseClientRectsToPosition = (val: DOMRect, addOn : number, offsetPosition ?: Position): Position => {
    return {
        x: val.x + addOn - (offsetPosition ? offsetPosition.x : 0),
        y: val.y + addOn - (offsetPosition ? offsetPosition.y : 0)
    }
}

export default parseClientRectsToPosition;