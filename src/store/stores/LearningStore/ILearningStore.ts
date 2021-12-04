import { Answer, RoadMap, Activity, Lecture, Hint, HintRoadMap, ActivityAlert } from "@model/Learning";

export default interface ILearningStore {
    FetchRoadmap(contentID: number, onSuccess : (res : RoadMap) => void, onError : () => void): Promise<any>
    FetchActivity(activityID: number, onSuccess : (res : Activity) => void , onError : () => void): Promise<any>
    SubmitActivity(result: Answer, cb : (res : ActivityAlert) => void): Promise<any>
    clearActivity(): void
    getHint(): Promise<any>
    FetchLecture(contentID: number, onSuccess : (res : Lecture) => void, onError : () => void): Promise<any>
    store: Store
}
export type Store = {
    roadMap: RoadMap | null
    activityInfo: Activity | null
    hint: Hint[]
    hintRoadMap: HintRoadMap[]
    isLoading: boolean
}