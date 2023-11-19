import {Resend} from 'resend';
import {EmailRoutingProvider} from "../../../domain/services/routing/EmailRoutingProvider";
import {SendEmailData, SendEmailResponse, BroadLog} from "../../../domain/entities/email/routing";


const RESEND_ERROR_CODES_BY_KEY = {
    missing_required_field: 422,
    invalid_access: 422,
    invalid_parameter: 422,
    invalid_region: 422,
    rate_limit_exceeded: 429,
    missing_api_key: 401,
    invalid_api_Key: 403,
    invalid_from_address: 403,
    validation_error: 403,
    not_found: 404,
    method_not_allowed: 405,
    application_error: 500,
    internal_server_error: 500,
};

function createError(error: {
    message?: string,
    name?: string
}, to?: string, id?: string): SendEmailResponse {
    const errorName: PropertyKey = error.name ?? 'unknown_error';
    let errorCode = 500;
    if (errorName in RESEND_ERROR_CODES_BY_KEY) {
        errorCode = RESEND_ERROR_CODES_BY_KEY[errorName as keyof typeof RESEND_ERROR_CODES_BY_KEY];
    }

    if (to)
        return {
            error: true,
            message: error.message || 'unknown error',
            name: errorName,
            to,
            code: errorCode
        }

    return {
        error: true,
        message: error.message || 'unknown error',
        name: errorName,
        id,
        code: errorCode
    }
}

function createEmailResponse({id, to}: {
    id: string,
    to: string
}): SendEmailResponse {
    return {id, to}
}

async function executeWithDelay<T>(callbacks: Array<() => Promise<T>>, delay: number): Promise<T[]> {
    const results: T[] = [];

    for (const callback of callbacks) {
        const startTime = Date.now();
        const result = await callback();
        results.push(result);
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < delay) {
            await new Promise<void>(resolve => setTimeout(resolve, delay - elapsedTime));
        }
    }

    return results;
}

export class ResendEmailProvider implements EmailRoutingProvider {
    private resendClient: Resend;

    constructor(apiKey: string) {
        this.resendClient = new Resend(apiKey);
    }

    async sendEmail({to, email}: SendEmailData): Promise<SendEmailResponse[]> {
        const tos = Array.isArray(to) ? to : [to]
        const executors = tos.map((to) => {
            return async () => {
                try {
                    const {data, error} = await this.resendClient.emails.send({
                        from: email.from,
                        to,
                        subject: email.subject,
                        html: email.html,
                    });
                    if (error) {
                        return createError(error, to)
                    }

                    return createEmailResponse({
                        id: data?.id ?? 'unknown_id',
                        to
                    });
                } catch (error) {
                    return createError({
                        // @ts-ignore
                        message: error?.response?.data?.message ?? error?.message ?? error?.toString(),
                        // @ts-ignore
                        name: error?.response?.data?.name ?? error?.name ?? 'unknown_error'
                    }, to)
                }
            }
        })

        return await executeWithDelay<SendEmailResponse>(executors, 1300)
    }

    async getEmailLogs(ids: string[]): Promise<BroadLog[]> {
        ids = Array.isArray(ids) ? ids : [ids]
        const executors = ids.map((id) => {
            return async () => {
                try {
                    const {data, error} = await this.resendClient.emails.get(id);
                    if (error) {
                        return createError(error, undefined, id)
                    }

                    return {
                        id: data?.id ?? 'unknown_id',
                        to: data?.to ?? 'unknown_to',
                        channel: 'email',
                        last_event: data?.last_event ?? 'unknown_last_event',
                        status: data?.last_event ?? 'unknown_status',
                        html: data?.html ?? 'unknown_html',
                        text: data?.text ?? 'unknown_text',
                        bcc: data?.bcc ?? 'unknown_bcc',
                        cc: data?.cc ?? 'unknown_cc',
                        created_at: data?.created_at ?? 'unknown_created_at',
                    };
                } catch (error) {
                    return createError({
                        // @ts-ignore
                        message: error?.response?.data?.message ?? error?.message ?? error?.toString(),
                        // @ts-ignore
                        name: error?.response?.data?.name ?? error?.name ?? 'unknown_error'
                    }, undefined, id)
                }
            }
        })

        return executeWithDelay(executors, 0) // no delay required
    }
}
