/**
 * Store _Ranking_ information shown on point ranking page.
 * 
 * _leader_board_ : User Ranking infomation for users
 * 
 * _user_ranking_ : User Ranking information for requested user
 */
export type Ranking = {
    leader_board : UserRanking[],
    user_ranking : UserRanking
}

/**
 * Store _Ranking_ information for each user.
 * 
 * _name_ : User's name
 * 
 * _point_ : User's points
 * 
 * _ranking_ : User's ranking
 * 
 * _user_id : User's identifier
 */
export type UserRanking = {
    name : string,
    point : number,
    ranking : number,
    user_id : number
}

/**
 * Store _User_ information for each user.
 * 
 * _activity_count_ : Amount of activity done by user
 * 
 * _badges_ : Badges information for user
 * 
 * _created_timestamp_ : Timestamp of creating user
 * 
 * _name_ : User's name
 * 
 * _point_ : User's point
 * 
 * _user_id_ : User's identifier
 */
export type User = {
    activity_count : number,
    badges : Badge[],
    created_timestamp : string,
    name : string,
    point : number,
    user_id : number,
}

/**
 * Store _User_ information for authenticated user.
 * 
 * _access_token_ : User's access token for current session
 * 
 * _email_ : User's email
 * 
 * _updated_timestamp_ : User's updated timestamp information
 */
export type AuthUser = User & {
    access_token : string,
    email : string,
    updated_timestamp : string
}

/**
 * Store _Badge_ information.
 * 
 * _badge_id_ : Badge identifier
 * 
 * _icon_path_ : Badge's icon url
 * 
 * _is_collect_ : User's status on badge
 * 
 * _badge_name_ : Badege's name
 */
export type Badge = {
    badge_id : number,
    icon_path : string,
    is_collect : boolean,
    name : string
}