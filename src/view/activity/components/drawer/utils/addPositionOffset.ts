import { Position } from "@model/Drawer"

const addPositionOffset = (target : Position, offset : Position): Position => {
    console.log({...offset})
    return {
        x : target.x + offset.x,
        y : target.y - offset.y
    }
}

export default addPositionOffset