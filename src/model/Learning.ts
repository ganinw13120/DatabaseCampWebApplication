export type Lecture = {
    contend_id : number,
    content_name : string,
    video_link : string
}
export type RoadMap = {
    content_id : number,
    content_name : string,
    items : RoadMapItem[]
}
export type RoadMapItem = {
    activity_id : number,
    is_learned : boolean,
    order : number
}

export type Activity = {
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
    total_hint : number,
    used_hints : Hint[],
    hint_roadmap : HintRoadMap[]
}

export type HintRoadMap = {
    level : number,
    reduce_point : number
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

export type Answer = CompletionAnswer[] | string[][] | number | null

export type ActivityResult = {
    activity_id : number,
    is_correct : boolean,
    updated_point : number
}

/**
 * Response for examination overview page.
 */
export type ExaminationOverview = {
    pre_exam : ExamOverviewInfo,
    mini_exam : ExamOverviewInfo[],
    final_exam : ExamOverviewInfo
}

export type ExamOverviewInfo = {
    exam_id : number,
    exam_type : string,
    results : ExamResult[] | null,
    content_group_id ?: number,
    content_group_name ?: string,
    can_do  :boolean,
}

export type Exam = {
    exam : ExamInfo ,
    activities : ExamActivity[]
}

export type ExamActivity = {
    activity : ActivityInfo,
    choice : MatchingChoice | MultipleChoice[] | CompletionChoice
}

export type ExamInfo = {
    exam_id : number,
    exam_type : string,
    instruction : string,
    created_timestamp : string,
    content_group_id : number,
    content_group_name : string,
    badge_id : number
}

export type ExamAnswer = {
    exam_id : number,
    activities : ExamAnswerActivity[]
}

export type ExamAnswerActivity = {
    activity_id : number,
    answer : Answer
}

export type ActivityAlert = {
    feedback : string,
    isSuccess : boolean
}

export type ExamResult = {
    exam_id : number,
    content_group_name : string,
    exam_type : string,
    exam_result_id : number,
    created_timestamp : string,
    score : number,
    is_passed : boolean
}