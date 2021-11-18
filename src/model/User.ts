export type Ranking = {
    leader_board : UserRanking[],
    user_ranking : UserRanking
}

export type UserRanking = {
    name : string,
    point : number,
    ranking : number,
    user_id : number
}
export type User = {
    activity_count : number,
    badges : Badge[],
    created_timestamp : string,
    name : string,
    point : number,
    user_id : number,
}

export type AuthUser = User & {
    access_token : string,
    email : string,
    updated_timestamp : string
}

export type Badge = {
    badge_id : number,
    icon_path : string,
    is_collect : boolean,
    name : string
}