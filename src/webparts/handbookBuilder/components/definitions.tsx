import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';


export const

    colors = {
        navy: '#1e3b5a',
        mint: '#34bebd',
        green: '#34be78',
        yellow: '#ffc658',
        orange: '#ff7300',
        red: '#be3435',
        pink: '#be347a',
        gray: {
            e: '#eee',
            d: '#ddd',
            c: '#ccc',
            b: '#bbb',
            a: '#aaa',
        },
        black: {
            b9: '#999',
            b8: '#888',
            b7: '#777',
            b5: '#555',
            b4: '#444',
            b3: '#333',
            b2: '#222'
        }
    },

    tabs = [
        {
            title: 'Intro',
            id: 0,
            show: true,
            sections: [
                {
                    title: '',
                    fields: [
                        {
                            InternalName: 'ModuleName',
                            TypeAsString: 'Text',
                            show: true
                        },
                        {
                            InternalName: 'ParentHandbook',
                            TypeAsString: 'Choice',
                            Choices: ['New Hire Onboarding', 'Food Safety', 'Software Basics', 'Corporate Communication Manual', 'Facilities'],
                            show: true
                        },
                    ]
                },
                {
                    title: '',
                    fields: [
                        {
                            InternalName: 'HasQuiz',
                            TypeAsString: 'Boolean',
                            show: true
                        },
                        {
                            InternalName: 'EnableLiveScoring',
                            TypeAsString: 'Boolean',
                            show: false
                        },
                        {
                            InternalName: 'ScoringType',
                            TypeAsString: 'Choice',
                            Choices: ['Simple', 'Complex', 'Custom'],
                            show: false
                        },
                    ]
                },
            ]
        },
        {
            title: 'Quiz',
            id: 90,
            show: false,
            itemIcon: 'SurveyQuestions',
        },
        {
            title: 'Add Page',
            id: 99,
            show: true,
            itemIcon: 'Add',
        },
    ],

    tab_template = {
        title: '',
        id: null,
        show: true,
        itemIcon: 'Page',
        sections: [
            {
                title: '',
                fields: [
                    {
                        InternalName: 'PageHeading',
                        TypeAsString: 'Text',
                        show: true
                    },
                    {
                        InternalName: 'PageContent',
                        TypeAsString: 'Note',
                        show: true
                    },
                    {
                        InternalName: 'Attachments',
                        TypeAsString: 'Attach',
                        show: true
                    },
                ]
            },
        ]
    },


    def_top_menu_items: ICommandBarItemProps[] = [
        {
            key: 'preview',
            text: 'Preview',
            iconProps: { iconName: 'PreviewLink' },
        },
        {
            key: 'edit',
            text: 'Edit',
            iconProps: { iconName: 'PageHeaderEdit' },
        },
        {
            key: 'save',
            text: 'Save',
            iconProps: { iconName: 'SaveAll' },
        },
        {
            key: 'review',
            text: 'Request Review',
            iconProps: { iconName: 'Feedback' },
        },
        {
            key: 'publish',
            text: 'Publish',
            iconProps: { iconName: 'WebPublish' },
            disabled: true,
        },
        {
            key: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
            onClick: () => console.log('Share')
        },
        {
            key: 'export',
            text: 'Export',
            iconProps: { iconName: 'Download' },
            onClick: () => console.log('Download')
        },
        {
            key: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
        },
    ],

    def_top_menu_overflowItems: ICommandBarItemProps[] = [
        { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
        { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
        { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } }
    ],

    def_top_menu_farItems: ICommandBarItemProps[] = [
        {
            key: 'size',
            button_id: 'size',
            text: 'Toggle compact mode',
            ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
            iconOnly: true,
            iconProps: { iconName: 'SizeLegacy' },
        },
        {
            key: 'mode',
            button_id: 'mode',
            text: 'Toggle dark mode',
            ariaLabel: 'Toggle dark mode',
            iconOnly: true,
            iconProps: { iconName: 'ClearNight' },
        },
        {
            key: 'layout',
            button_id: 'layout',
            text: 'Change layout',
            ariaLabel: 'Change layout',
            iconOnly: true,
            iconProps: { iconName: 'Tiles' },
        },
        {
            key: 'info',
            button_id: 'info',
            text: 'Info',
            ariaLabel: 'Info',
            iconOnly: true,
            iconProps: { iconName: 'Info' },
        }
    ],

    def_form_buttons_items: ICommandBarItemProps[] = [
        {
            key: 'prev',
            button_id: 'prev',
            text: 'Previous Form',
            iconProps: { iconName: 'Back' },
        },
    ],

    def_form_buttons_farItems: ICommandBarItemProps[] = [
        {
            key: 'next',
            button_id: 'next',
            text: 'Next Form',
            iconProps: { iconName: 'Forward' },// move icon to right
        },
    ]


    ;


