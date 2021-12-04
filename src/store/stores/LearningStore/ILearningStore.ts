import { Answer, RoadMap, Activity, Lecture, Hint, HintRoadMap } from "@model/Learning";

export default interface ILearningStore {
    FetchRoadmap(contentID: number, cb: (res : RoadMap | null) => void): Promise<any>
    FetchActivity(activityID: number, cb: any): Promise<any>
    SubmitActivity(result: Answer, cb: any): Promise<any>
    clearActivity(): void
    getHint(): Promise<any>
    FetchLecture(contentID: number, cb: any): Promise<any>
    store: Store
}
export type Store = {
    roadMap: RoadMap | null
    activityInfo: Activity | null
    lectureInfo: Lecture | null
    hint: Hint[]
    hintRoadMap: HintRoadMap[]
    isLoading: boolean
}