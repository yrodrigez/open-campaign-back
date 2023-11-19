import {ResponseError} from "./ResponseError";


export type BroadLog = {
    id: string,
    to: string | string[],
    channel?: string,
    last_event?: string,
    status?: string,
    html?: string,
    text?: string,
    bcc?: string | string[] | null[],
    cc?: string | string[] | null[],
    reply_to?: string | string[] | null[],
    created_at?: string,
} | ResponseError
