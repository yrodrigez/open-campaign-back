import {Email} from "./Email";

export type SendEmailData = {
    to: string | string[];
    email: Email;
}
