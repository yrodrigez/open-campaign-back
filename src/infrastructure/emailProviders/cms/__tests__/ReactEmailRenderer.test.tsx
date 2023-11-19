// src/infrastructure/emailRendering/__tests__/ReactEmailRenderer.test.tsx

import { ReactEmailRenderer } from '../ReactEmailRenderer';

describe('ReactEmailRenderer', () => {
    let renderer: ReactEmailRenderer;

    beforeEach(() => {
        renderer = new ReactEmailRenderer();
    });

    it('should render simple text component correctly', async () => {
        const emailJson = {
            type: 'Html',
            props: {
                children: [
                    {
                        type: 'Head',
                        props: {}
                    },
                    {
                        type: 'Preview',
                        props: {
                            children: 'Your preview text here'
                        }
                    },
                    {
                        type: 'Tailwind',
                        props: {
                            children: [
                                {
                                    type: 'Body',
                                    props: {
                                        className: 'bg-white my-auto mx-auto font-sans',
                                        children: [
                                            {
                                                type: 'Container',
                                                props: {
                                                    className: 'bg-white border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px]',
                                                    children: [
                                                        {
                                                            type: 'Section',
                                                            props: {
                                                                className: 'mt-[32px]',
                                                                children: [
                                                                    {
                                                                        type: 'Img',
                                                                        props: {
                                                                            src: 'path_to_login_link_image',
                                                                            width: '60',
                                                                            height: '60',
                                                                            alt: 'Duckr',
                                                                            className: 'my-0 mx-auto'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            type: 'Text',
                                                            props: {
                                                                className: 'text-[#666666] text-[12px] leading-[24px]',
                                                                children: "If you have any concerns regarding your account's safety, please reply to this email to get in touch with us."
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        };


        const result = await renderer.render(emailJson);
        expect(result.html).toContain('If you have any concerns regarding your account&#x27;s safety, please reply to this email to get in touch with us.');
    });

    it('should throw an error for an unknown component type', async () => {
        const emailJson = {
            type: 'UnknownComponent',
            props: {}
        };

        await expect(renderer.render(emailJson)).rejects.toThrow('The component with type UnknownComponent is not available in ReactEmailComponents');
    });
})
