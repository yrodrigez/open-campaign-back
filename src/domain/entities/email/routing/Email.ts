export type Email = {
    id?: string,
    html: string,
    text?: string,
    from: string,
    subject: string,
    tags?: [{ name: string, value: string }],
}
