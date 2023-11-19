import {BroadLog, SendEmailData, SendEmailResponse} from "../../entities/email/routing";

export interface EmailRoutingProvider {
    sendEmail(data: SendEmailData): Promise<SendEmailResponse[]>;
    getEmailLogs(ids: string[]): Promise<BroadLog[]>;
}
