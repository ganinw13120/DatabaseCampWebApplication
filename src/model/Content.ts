export type ContentGroup = {
    contents : Content[],
    group_id : number,
    group_name : string,
    is_lasted : boolean,
    is_recommend : boolean,
    progress : number,
}
export type Content = {
    content_id : number,
    content_name : string,
    is_lasted ?: boolean,
    progress : number,
    group_name ?: string,
    group_id ?: number,
}