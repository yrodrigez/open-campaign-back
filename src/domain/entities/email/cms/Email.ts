import {EmailContent} from "./EmailContent";

export type Email = {
    content: EmailContent,
    from: string,
    subject: string,
    tags?: [{ name: string, value: string }],
    attachments?: [{ name: string, content: string, type: string }],
}
