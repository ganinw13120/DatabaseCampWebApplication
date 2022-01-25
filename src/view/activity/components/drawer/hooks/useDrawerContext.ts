import { createContext, useContext } from "react"
import { Position } from "../model/Drawer"
export type DrawerContextContent = {
    pos : Position
    offset : Position
}
export const DrawerContext = createContext<DrawerContextContent>({
    pos : {
        x : 0,
        y : 0
    },
    offset : {
        x : 0,
        y : 0
    }
})
export const useDrawerContext = () => useContext(DrawerContext)