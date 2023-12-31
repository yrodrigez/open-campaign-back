import {SendEmailData} from "../../domain/entities/email/routing/SendEmailData";
import {SendEmailResponse} from "../../application/email/SendEmailResponse";
import {BroadLog} from "../../application/email/BroadLog";


export interface EmailProvider {
    sendEmail: (data: SendEmailData) => Promise<SendEmailResponse[]>;
    getEmailsLogs: (ids: string[]) => Promise<BroadLog[]>;
}
