// User.ts
/**
 * This file used to store model using in application, related to users.
*/

/**
 * Store `Ranking` information shown on point ranking page.
 *
 * `leader_board` : User Ranking infomation for users
 *
 * `user_ranking` : User Ranking information for requested user
 */
export type Ranking = {
    leader_board: UserRanking[]
    user_ranking: UserRanking
}

/**
 * Store `Ranking` information for each user.
 *
 * `name` : User's name
 *
 * `point` : User's points
 *
 * `ranking` : User's ranking
 *
 * `user_id : User's identifier
 */
export type UserRanking = {
    name: string
    point: number
    ranking: number
    user_id: number
}

/**
 * Store `User` information for each user.
 *
 * `activity_count` : Amount of activity done by user
 *
 * `badges` : Badges information for user
 *
 * `created_timestamp` : Timestamp of creating user
 *
 * `name` : User's name
 *
 * `point` : User's point
 *
 * `user_id` : User's identifier
 */
export type User = {
    activity_count: number
    badges: Badge[]
    created_timestamp: string
    name: string
    point: number
    user_id: number
    spider : Spider[]
}

export type Spider = {
    content_group_id : number
    content_group_name : string
    stat : number
}

/**
 * Store `User` information for authenticated user.
 *
 * `access_token` : User's access token for current session
 *
 * `email` : User's email
 *
 * `updated_timestamp` : User's updated timestamp information
 */
export type AuthUser = User & {
    access_token: string
    email: string
    updated_timestamp: string
}

/**
 * Store `Badge` information.
 *
 * `badge_id` : Badge identifier
 *
 * `icon_path` : Badge's icon url
 *
 * `is_collect` : User's status on badge
 *
 * `badge_name` : Badege's name
 */
export type Badge = {
    ID: number
    ImagePath: string
    IsCollected: boolean
    Name: string
}