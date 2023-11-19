import {type EmailContent} from "../../../domain/entities/email/cms";
import {render} from '@react-email/render';
import * as ReactEmailComponents from '@react-email/components';
import {uuid} from 'uuidv4';
import * as React from "react";
import {type EmailRenderer} from "../../../domain/services/cms/EmailRenderer";

export type EmailJson = {
    type: string;
    props?: { [key: string]: any };
    children?: EmailJson[] | string;
};

export class ReactEmailRenderer implements EmailRenderer {
    async render(emailJson: EmailJson): Promise<EmailContent> {
        const Email = this.convertJsonToJsx(emailJson);

        return {
            html: render(Email, {pretty: true}),
            text: render(Email, {plainText: true}),
        };
    }

    private convertJsonToJsx(emailJson: EmailJson): React.ReactElement {
        const {type, props = {}} = emailJson;
        const Component = ReactEmailComponents[type as keyof typeof ReactEmailComponents] as React.JSXElementConstructor<any>;
        if (!Component) {
            throw new Error(`The component with type ${type} is not available in ReactEmailComponents`);
        }
        if (!props.key) props.key = uuid()
        const children = props.children;
        if (!children) return <Component {...props} />;

        const childrenElements = typeof children === 'string'
            ? children
            : children?.map((child: EmailJson) => this.convertJsonToJsx(child)) || null;

        return <Component {...props}> {childrenElements} </Component>;
    }
}
