// ILearningStore.ts
/**
 * This file used to be a interface of learning store.
*/
import { Answer, RoadMap, Activity, Lecture, Hint, HintRoadMap, ActivityAlert } from "@model/Learning";

export default interface ILearningStore {

    /**
     * On user enter learning flow, fetch learning roadmap.
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     *
     * @param contentID content identifier
     *
     * @param onSuccess on fetching success callback function
     *
     * @param onError on fetching error callback function
     */
    FetchRoadmap(contentID: number, onSuccess: (res: RoadMap) => void, onError: () => void): Promise<any>

    /**
     * On user enter activity page, fetching activity information
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     *
     * @param activityID activity indentifier
     *
     * @param onSuccess on fetching success callback function
     *
     * @param onError on fetching error callback function
     */
    FetchActivity(activityID: number, onSuccess: (res: Activity) => void, onError: () => void): Promise<any>

    /**
     * On user enter activity page, fetching activity information
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     *
     * @param activityID activity indentifier
     *
     * @param cb callback function
     */
    SubmitActivity(result: Answer, cb: (res: ActivityAlert) => void): Promise<any>

    /**
     * Cler activity information from store
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     */
    clearActivity(): void

    /**
     * On user calling hint, fetching next hint
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     */
    getHint(): Promise<any>

    /**
     * On user enter lecture page, fetching lecture information
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     *
     * @param contentID lecture's content identifier
     *
     * @param onSuccess on fetching success callback function
     *
     * @param onError on fetching error callback function
     */
    FetchLecture(contentID: number, onSuccess: (res: Lecture) => void, onError: () => void): Promise<any>

    /**
     * Store for storing datas
     *
     * @remarks
     * This method is part of learning store, manipulating learning and learning'data.
     */
    store: Store
}
export type Store = {
    roadMap: RoadMap | null
    activityInfo: Activity | null
    hint: Hint[]
    hintRoadMap: HintRoadMap[]
    isLoading: boolean
}