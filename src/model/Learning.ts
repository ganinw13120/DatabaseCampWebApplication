/**
 * Store _Lecture_ information for single lecutre.
 * 
 * _content_id_ : Identify content's lecture
 * 
 * _content_name_ : Content name for lecture
 * 
 * _video_link_ : Temporary url for lecture's video
 */
export type Lecture = {
    contend_id : number,
    content_name : string,
    video_link : string
}

/**
 * Store _Roadmap_ data for content which contains _activity_id_.
 * 
 * Used to determine next and previous activity.
 * 
 * _content_id_ : Roadmap's content id
 * 
 * _content_name_ : Roadmap's content name
 * 
 * _items_ : Contain activities data in content
 */
export type RoadMap = {
    content_id : number,
    content_name : string,
    items : RoadMapItem[]
}

/**
 * Store _Activity_ data for each activity in roadmap.
 * 
 * _activity_id_ : Activity ID for identify activity
 * 
 * _is_learned_ : Used to determine if activity is already learned
 * 
 * _order_ : Identify ordering between each activity
 */
export type RoadMapItem = {
    activity_id : number,
    is_learned : boolean,
    order : number
}

/**
 * Store _Activity_ data for activity page.
 * 
 * _activity_ : Activity information
 * 
 * _hint_ : Hint information for activity
 * 
 * _choice_ : Choice for activity, depends on _activty type_
 */
export type Activity = {
    activity : ActivityInfo,
    hint : ActivityHint,
    choice : MatchingChoice | MultipleChoice[] | CompletionChoice
}

/**
 * Store _Activity_ infomation.
 * 
 * _activity_id_ : Identify activity id
 * 
 * _activity_order_ : Identify ordering between each activity
 * 
 * _content_id_ : Identify content id
 * 
 * _point_ : Points will be earned for activity
 * 
 * _question_ : Question for this activity
 * 
 * _story_ : Story requirement for this acitivity
 */
export type ActivityInfo = {
    activity_id : number,
    activity_order : number,
    activity_type_id : number,
    content_id : number,
    point : number,
    question : string,
    story : string
}

/**
 * Store _Hint_ infomation for each activity.
 * 
 * _total_hint_ : Total hint for activity
 * 
 * _used_hints_ : Used hint for acitivty
 * 
 * _hint_roadmap_ : Contains hints for activity
 */
export type ActivityHint = {
    total_hint : number,
    used_hints : Hint[],
    hint_roadmap : HintRoadMap[]
}

/**
 * Store _Hint Roadmap_ infomation contains in each activity.
 * 
 * _level_ : Level for hint
 * 
 * _reduce_point_ : Amount of points will be reduce on using hint
 */
export type HintRoadMap = {
    level : number,
    reduce_point : number
}

/**
 * Store _Hint_ infomation.
 * 
 * _activity_id_ : Activity id for hint
 * 
 * _content_ : Content for hint, as a HTML
 * 
 * _hint_id_ : Hint identifier
 * 
 * _level_ : Level of hint
 * 
 * _point_reduce_ : Amount of points reduce on this hint
 */
export type Hint = {
    activity_id : number,
    content : string,
    hint_id : number,
    level : number,
    point_reduce : number,
}

/**
 * Store _Choice_ infomation on Matching Acitivty.
 * 
 * _items_left_ : Items on half left
 * 
 * _items_right_ : Items on half right
 * 
 */
export type MatchingChoice = {
    items_left : string[],
    items_right : string[]
}

/**
 * Store _Choice_ infomation on Multiple Choice Acitivty.
 * 
 * _content_ : Content for question
 * 
 * _multiple_choice_id_ : Identifier for choice
 * 
 */
export type MultipleChoice = {
    content : string,
    multiple_choice_id : number
}

/**
 * Store _Choice_ infomation on Completion Choice Acitivty.
 * 
 * _contents_ : List of possible choices
 * 
 * _questions_ : List of questions
 * 
 */
export type CompletionChoice = {
    contents : string[],
    questions : CompletionQuestion[]
}

/**
 * Store _Question_ information for Completion Activity.
 * 
 * _first_ : First half of question
 * 
 * _last_ : Last half of question
 * 
 * _id_ : Identifier for question
 */
export type CompletionQuestion = {
    first : string,
    last : string,
    id : number,
}

/**
 * Store _Answer_ information for Completion Activity.
 * 
 * _completion_choice_id_ : Identifier of each choice
 * 
 * _content_ : Answer for this choice
 */
export type CompletionAnswer = {
    completion_choice_id : number,
    content : string | null
}

/**
 * Store _Answer_ information for Activity can be completion, multiple, matching. 
 * 
 * Depends on _acitivty type_ .
 */
export type Answer = CompletionAnswer[] | string[][] | number | null

/**
 * Store _Activity Result_ for activity after checking.
 * 
 * _activity_id_ : Identifier of activity
 * 
 * _is_correct_ : Activity result (Correct, Wrong)
 * 
 * _updated_point_ : User's points after checking activity
 */
export type ActivityResult = {
    activity_id : number,
    is_correct : boolean,
    updated_point : number
}

/**
 * Store _Examination_ data for examination overview pages.
 * 
 * _pre_exam_ : Exam information for Pre-Exam
 * 
 * _mini_exam_ : Exam_information for Mini-Exam
 * 
 * _final_exam_ : Exam_information for Final-Exam
 */
export type ExaminationOverview = {
    pre_exam : ExamOverviewInfo,
    mini_exam : ExamOverviewInfo[],
    final_exam : ExamOverviewInfo
}

/**
 * Store _Examination_ data for each examination on overview pages.
 * 
 * _exam_id_ : Exam's identifier
 * 
 * _exam_type_ : Type of exam
 * 
 * _results_ : Previous result for examination (if has)
 * 
 * _content_group_id_ : Content for examination group (null if type is pre, final examination)
 * 
 * _content_group_name_ : Content name for examination group (null if type is pre, final examination)
 * 
 * _can_do_ : Can user acccess this examination
 */
export type ExamOverviewInfo = {
    exam_id : number,
    exam_type : ExamType,
    results : ExamResult[] | null,
    content_group_id ?: number,
    content_group_name ?: string,
    can_do  :boolean,
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
 * Store _Examination_ data for examination on examination page.
 * 
 * _exam_ : Examination information
 * 
 * _acitivities_ : Examination's acitivity on this exam
 */
export type Exam = {
    exam : ExamInfo ,
    activities : ExamActivity[]
}

/**
 * Store _Activity_ data for examination on examination page.
 * 
 * _acitivity_ : Activity infomation
 * 
 * _choice_ : Choice for activity, depends on _activty type_
 */
export type ExamActivity = {
    activity : ActivityInfo,
    choice : MatchingChoice | MultipleChoice[] | CompletionChoice
}

/**
 * Store _Examination_ data for examination on examination page.
 * 
 * _exam_id_ : Identifier for exam
 * 
 * _exam_type_ : Examination type
 * 
 * _instruction_ : Instruction before enters examination
 * 
 * _created_timestamp_ : Timestamp for examination
 * 
 * _content_group_id_ : Content group identifier for examination
 * 
 * _content_group_name_ : Content group name for examination
 * 
 * _badge_id_ : Badge for this examination
 */
export type ExamInfo = {
    exam_id : number,
    exam_type : ExamType,
    instruction : string,
    created_timestamp : string,
    content_group_id : number,
    content_group_name : string,
    badge_id : number
}

/**
 * Store _Examination_ answer.
 * 
 * _exam_id_ : Examination identifier
 * 
 * _activitiest_ : List of answer for every acitivties
 */
export type ExamAnswer = {
    exam_id : number,
    activities : ExamAnswerActivity[]
}

/**
 * Store _Examination_ answer for each activity.
 * 
 * _activity_id_ : Answer for acitivty.
 * 
 * _answer_ : Answer for activity
 */
export type ExamAnswerActivity = {
    activity_id : number,
    answer : Answer
}

/**
 * Store _Examination_ result which will be shown on activity.
 * 
 * _feedback_ : Feedback for submitting activity.
 * 
 * _isSuccess_ : Result of acitvity
 */
export type ActivityAlert = {
    feedback : string,
    isSuccess : boolean
}

/**
 * Store _Examination_ result which will be shown on examination result page.
 * 
 * _exam_id_ : Examination identifier for result
 * 
 * _content_group_name_ : Content group name for examination
 * 
 * _exam_type_ : Type of examination
 * 
 * _exam_result_id_ : Examination result identifier
 * 
 * _created_timestamp_ : Timestamp for examination result
 * 
 * _score_ : Total score recieve for examination
 * 
 * _is_passed_ : Is result pass criteria
 */
export type ExamResult = {
    exam_id : number,
    content_group_name : string,
    exam_type : ExamType,
    exam_result_id : number,
    created_timestamp : string,
    score : number,
    is_passed : boolean
}


/**
 * Store _ContentGroup_ information shown on overview page.
 * 
 * _contents_ : List of contents in group
 * 
 * _group_id_ : Group identifier
 * 
 * _group_name_ : Content group name
 * 
 * _is_lasted_ : Flag if content is learned lately
 * 
 * _is_recommend_ : Flag if content is recommed to user
 * 
 * _progress_ : Progression on content to user
 */
export type ContentGroup = {
    contents : Content[],
    group_id : number,
    group_name : string,
    is_lasted : boolean,
    is_recommend : boolean,
    progress : number,
}

/**
 * Store _Content_ information shown on overview page.
 * 
 * _content_id_ : Content identifier
 * 
 * _content_name_ : Content name
 * 
 * _is_lasted_ : Flag if content if lately learned
 * 
 * _progress_ : Progression on content to user
 * 
 * _group_name_ : Content group name
 * 
 * _group_id_ : Content group identifier
 */
export type Content = {
    content_id : number,
    content_name : string,
    is_lasted ?: boolean,
    progress : number,
    group_name ?: string,
    group_id ?: number,
}


/**
 * Store _Overview_ information shown on overview page.
 * 
 * _lasted_group_ : Lastest content group learned
 * 
 * _content_group_overview_ : All content groups list on overview page
 */
export type Overview = {
    lasted_group : Content,
    content_group_overview : ContentGroup[]
}