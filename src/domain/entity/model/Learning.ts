export interface Lecture {
    contend_id : number,
    content_name : string,
    video_link : string
}
export interface RoadMap {
    content_id : number,
    content_name : string,
    items : RoadMapItem[]
}
export type RoadMapItem = {
    activity_id : number,
    is_learned : boolean,
    order : number
}

export interface Activity {
    activity : ActivityInfo,
    hint : ActivityHint,
    choice : MatchingChoice | MultipleChoice[] | CompletionChoice
}
export type ActivityInfo = {
    activity_id : number,
    activity_order : number,
    activity_type_id : number,
    content_id : number,
    point : number,
    question : string,
    story : string
}
export type ActivityHint = {
    next_hint_point : number | null,
    total_hint : number,
    used_hints : Hint[]
}
export type Hint = {
    activity_id : number,
    content : string,
    hint_id : number,
    level : number,
    point_reduce : number,
}
export type MatchingChoice = {
    items_left : string[],
    items_right : string[]
}
export type MultipleChoice = {
    content : string,
    multiple_choice_id : number
}
export type CompletionChoice = {
    contents : string[],
    questions : CompletionQuestion[]
}
export type CompletionQuestion = {
    first : string,
    last : string,
    id : number,
}

export type CompletionAnswer = {
    completion_choice_id : number,
    content : string | null
}

export type Answer = CompletionAnswer[] | string[][] | number