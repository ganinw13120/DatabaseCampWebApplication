// Learning.ts
/**
 * This file used to store model using in application, related to learning.
*/

/**
 * Store `Lecture` information for single lecutre.
 *
 * `content_id` : Identify content's lecture
 *
 * `content_name` : Content name for lecture
 *
 * `video_link` : Temporary url for lecture's video
 */
export type Lecture = {
    contend_id : number
    content_name : string
    video_link : string
}

/**
 * Store `Roadmap` data for content which contains `activity_id_.
 *
 * Used to determine next and previous activity.
 *
 * `content_id` : Roadmap's content id
 *
 * `content_name` : Roadmap's content name
 *
 * `items` : Contain activities data in content
 */
export type RoadMap = {
    content_id : number
    content_name : string
    items : RoadMapItem[]
}

/**
 * Store `Activity` data for each activity in roadmap.
 *
 * `activity_id` : Activity ID for identify activity
 *
 * `is_learned` : Used to determine if activity is already learned
 *
 * `order` : Identify ordering between each activity
 */
export type RoadMapItem = {
    activity_id : number
    is_learned : boolean
    order : number
}

/**
 * Store `Activity` data for activity page.
 *
 * `activity` : Activity information
 *
 * `hint` : Hint information for activity
 *
 * `choice` : Choice for activity depends on `activty type_
 */
export type Activity = {
    activity : ActivityInfo
    hint : ActivityHint
    choice :ActivityChoices
}

export type ActivityChoices =  MatchingChoice | MultipleChoice[] | CompletionChoice | CheckboxMultipleChoice[] | GroupChoice | TableChoice | RelationChoice | PeerChoice

export type CheckboxMultipleChoice = {
    content : string
    multiple_choice_id : number
}

export type GroupChoice = {
    groups : string[]
    vocabs : string[]
}

export type TableChoice = {
    tables : TableDetail[][],
    choices : string[]
}

export type TableDetail = string | null

export type RelationChoice = {
    choices : string[]
    problems : RelationProblem[]
}

export type RelationProblem = {
    before : number
    after : number
}

export type PeerChoice = {
    problems : PeerProblem[]
}

export type PeerProblem = {
    question : string
    choices : MultipleChoice[]
}

/**
 * Store `Activity` infomation.
 *
 * `activity_id` : Identify activity id
 *
 * `activity_order` : Identify ordering between each activity
 *
 * `content_id` : Identify content id
 *
 * `point` : Points will be earned for activity
 *
 * `question` : Question for this activity
 *
 * `story` : Story requirement for this acitivity
 */
export type ActivityInfo = {
    activity_id : number
    activity_order : number
    activity_type_id : number
    content_id : number
    point : number
    question : string
    story : string
}

/**
 * Store `Hint` infomation for each activity.
 *
 * `total_hint` : Total hint for activity
 *
 * `used_hints` : Used hint for acitivty
 *
 * `hint_roadmap` : Contains hints for activity
 */
export type ActivityHint = {
    total_hint : number
    used_hints : Hint[]
    hint_roadmap : HintRoadMap[]
}

/**
 * Store `Hint Roadmap` infomation contains in each activity.
 *
 * `level` : Level for hint
 *
 * `reduce_point` : Amount of points will be reduce on using hint
 */
export type HintRoadMap = {
    level : number
    reduce_point : number
}

/**
 * Store `Hint` infomation.
 *
 * `activity_id` : Activity id for hint
 *
 * `content` : Content for hint as a HTML
 *
 * `hint_id` : Hint identifier
 *
 * `level` : Level of hint
 *
 * `point_reduce` : Amount of points reduce on this hint
 */
export type Hint = {
    activity_id : number
    content : string
    hint_id : number
    level : number
    point_reduce : number
}

/**
 * Store `Choice` infomation on Matching Acitivty.
 *
 * `items_left` : Items on half left
 *
 * `items_right` : Items on half right
 *
 */
export type MatchingChoice = {
    items_left : string[]
    items_right : string[]
}

/**
 * Store `Choice` infomation on Multiple Choice Acitivty.
 *
 * `content` : Content for question
 *
 * `multiple_choice_id` : Identifier for choice
 *
 */
export type MultipleChoice = {
    content : string
    multiple_choice_id : number
}

/**
 * Store `Choice` infomation on Completion Choice Acitivty.
 *
 * `contents` : List of possible choices
 *
 * `questions` : List of questions
 *
 */
export type CompletionChoice = {
    contents : string[]
    questions : CompletionQuestion[]
}

/**
 * Store `Question` information for Completion Activity.
 *
 * `first` : First half of question
 *
 * `last` : Last half of question
 *
 * `id` : Identifier for question
 */
export type CompletionQuestion = {
    first : string
    last : string
    id : number
}

/**
 * Store `Answer` information for Completion Activity.
 *
 * `completion_choice_id` : Identifier of each choice
 *
 * `content` : Answer for this choice
 */
export type CompletionAnswer = {
    completion_choice_id : number
    content : string | null
}

/**
 * Store `Answer` information for Activity can be completion multiple matching.
 *
 * Depends on `acitivty type` .
 */
export type Answer = CompletionAnswer[] | MultipleAnswer | MatchingAnswer | CheckboxMultipleAnswer | GroupAnswer | TableAnswer | RelationAnswer | null

export type MultipleAnswer = number
export type MatchingAnswer = string[][]
export type CheckboxMultipleAnswer = number[]
export type GroupAnswer = string[][]
export type TableAnswer = string[][]
export type RelationAnswer = string[][]

/**
 * Store `Activity Result` for activity after checking.
 *
 * `activity_id` : Identifier of activity
 *
 * `is_correct` : Activity result (Correct Wrong)
 *
 * `updated_point` : User's points after checking activity
 */
export type ActivityResult = {
    activity_id : number
    is_correct : boolean
    updated_point : number
}

/**
 * Store `Examination` data for examination overview pages.
 *
 * `pre_exam` : Exam information for Pre-Exam
 *
 * `mini_exam` : Exam_information for Mini-Exam
 *
 * `final_exam` : Exam_information for Final-Exam
 */
export type ExaminationOverview = {
    pre_exam : ExamOverviewInfo
    mini_exam : ExamOverviewInfo[]
    final_exam : ExamOverviewInfo
}

/**
 * Store `Examination` data for each examination on overview pages.
 *
 * `exam_id` : Exam's identifier
 *
 * `exam_type` : Type of exam
 *
 * `results` : Previous result for examination (if has)
 *
 * `content_group_id` : Content for examination group (null if type is pre final examination)
 *
 * `content_group_name` : Content name for examination group (null if type is pre final examination)
 *
 * `can_do` : Can user acccess this examination
 */
export type ExamOverviewInfo = {
    exam_id : number
    exam_type : ExamType
    results : ExamResult[] | null
    content_group_id ?: number
    content_group_name ?: string
    can_do  :boolean
}

/**
 * Enumeration for examination type
 */
export enum ExamType {
    PRE = "PRE",
    POST = "POST",
    MINI = "MINI"
}

/**
 * Store `Examination` data for examination on examination page.
 *
 * `exam` : Examination information
 *
 * `acitivities` : Examination's acitivity on this exam
 */
export type Exam = {
    exam : ExamInfo
    activities : ExamActivity[]
}

/**
 * Store `Activity` data for examination on examination page.
 *
 * `acitivity` : Activity infomation
 *
 * `choice` : Choice for activity depends on `activty type_
 */
export type ExamActivity = {
    activity : ActivityInfo
    choice : ActivityChoices
}

/**
 * Store `Examination` data for examination on examination page.
 *
 * `exam_id` : Identifier for exam
 *
 * `exam_type` : Examination type
 *
 * `instruction` : Instruction before enters examination
 *
 * `created_timestamp` : Timestamp for examination
 *
 * `content_group_id` : Content group identifier for examination
 *
 * `content_group_name` : Content group name for examination
 *
 * `badge_id` : Badge for this examination
 */
export type ExamInfo = {
    exam_id : number
    exam_type : ExamType
    instruction : string
    created_timestamp : string
    content_group_id : number
    content_group_name : string
    badge_id : number
}

/**
 * Store `Examination` answer.
 *
 * `exam_id` : Examination identifier
 *
 * `activitiest` : List of answer for every acitivties
 */
export type ExamAnswer = {
    exam_id : number
    activities : ExamAnswerActivity[]
}

/**
 * Store `Examination` answer for each activity.
 *
 * `activity_id` : Answer for acitivty.
 *
 * `answer` : Answer for activity
 */
export type ExamAnswerActivity = {
    activity_id : number
    answer : Answer
}

/**
 * Store `Examination` result which will be shown on activity.
 *
 * `feedback` : Feedback for submitting activity.
 *
 * `isSuccess` : Result of acitvity
 */
export type ActivityAlert = {
    feedback : string
    isSuccess : boolean
}

/**
 * Store `Examination` result which will be shown on examination result page.
 *
 * `exam_id` : Examination identifier for result
 *
 * `content_group_name` : Content group name for examination
 *
 * `exam_type` : Type of examination
 *
 * `exam_result_id` : Examination result identifier
 *
 * `created_timestamp` : Timestamp for examination result
 *
 * `score` : Total score recieve for examination
 *
 * `is_passed` : Is result pass criteria
 */
export type ExamResult = {
    exam_id : number
    content_group_name : string
    exam_type : ExamType
    exam_result_id : number
    created_timestamp : string
    score : number
    is_passed : boolean
}


/**
 * Store `ContentGroup` information shown on overview page.
 *
 * `contents` : List of contents in group
 *
 * `group_id` : Group identifier
 *
 * `group_name` : Content group name
 *
 * `is_lasted` : Flag if content is learned lately
 *
 * `is_recommend` : Flag if content is recommed to user
 *
 * `progress` : Progression on content to user
 */
export type ContentGroup = {
    contents : Content[]
    group_id : number
    group_name : string
    is_lasted : boolean
    is_recommend : boolean
    progress : number
}

/**
 * Store `Content` information shown on overview page.
 *
 * `content_id` : Content identifier
 *
 * `content_name` : Content name
 *
 * `is_lasted` : Flag if content if lately learned
 *
 * `progress` : Progression on content to user
 *
 * `group_name` : Content group name
 *
 * `group_id` : Content group identifier
 */
export type Content = {
    content_id : number
    content_name : string
    is_lasted ?: boolean
    progress : number
    group_name ?: string
    group_id ?: number
}


/**
 * Store `Overview` information shown on overview page.
 *
 * `lasted_group` : Lastest content group learned
 *
 * `content_group_overview` : All content groups list on overview page
 */
export type Overview = {
    lasted_group : Content
    content_group_overview : ContentGroup[]
}