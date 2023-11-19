import {EmailContent} from "../../entities/email/cms";

export interface EmailRenderer {
    render: (data: any) => Promise<EmailContent>;
}
