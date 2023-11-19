import {SendEmailResponse} from "../../../application/email/SendEmailResponse";
import {BroadLog, SendEmailData} from "../../entities/email/routing";

export interface EmailRoutingProvider {
    sendEmail(data: SendEmailData): Promise<SendEmailResponse[]>;
    getEmailLogs(ids: string[]): Promise<BroadLog[]>;
}
