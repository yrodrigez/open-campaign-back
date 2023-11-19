import {EmailRenderer} from "../../../domain/services/cms/EmailRenderer";
import {EmailContent} from "../../../domain/entities/email/cms";

export class RenderReactEmail {
    private readonly emailRenderer: EmailRenderer;
    constructor(emailRenderer: EmailRenderer) {
        this.emailRenderer = emailRenderer;
    }

    async execute(emailJson: any): Promise<EmailContent> {
        return await this.emailRenderer.render(emailJson);
    }
}
