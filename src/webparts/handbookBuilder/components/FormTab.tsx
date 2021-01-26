import * as React from 'react';
import FormSection from './FormSection';
import AttachmentManager from './AttachmentManager';
import Quiz from './Quiz';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import styles from './FormTab.module.scss';

const mcc = 'color:lime';


export interface FormTabProps {
    tab: any;
    handler: any;
    handler_attachments: any;
    handler_quiz: any;
    context: any;
    // quiz_data: any;
}

export interface FormTabState {

}

class FormTab extends React.Component<FormTabProps, FormTabState> {
    constructor(props: FormTabProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FormTab -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {
        const { tab/* , quiz_data */ } = this.props;
        // console.log('%c : FormTab -> render -> tab', mcc, tab);

        const page_head = <div className={styles.tabHeader}>{tab.title}</div>;

        const sections = tab.sections ? tab.sections.map(s => {
            return (
                <FormSection
                    key={s.id}
                    section={s}
                    handler={this.props.handler}
                />
            );
        }) : <></>;

        const side_zone =             // tab.id === 0 ? <div>i'll be a pane in the first tab</div> :
            tab.id !== 0 && tab.id < 90 ?
                <div className='temp-side-zone'>
                    <div>
                        <AttachmentManager
                            context={this.props.context}
                            handler={this.props.handler_attachments}
                            tab={tab}
                        />
                    </div>
                </div>
                : <></>;

        const page_slide = tab.id !== 90 ? <>
            <Stack horizontal>
                {sections}
                {side_zone}
            </Stack>
        </> : <></>;

        const quiz_slide = tab.id === 90 ? <>
            <Quiz
                // key={quiz_data ? quiz_data.length : 0}
                handler_quiz={this.props.handler_quiz}
                quiz_data={tab.quiz_data}
            />
        </> : <></>;

        return (
            <div>
                {page_head}
                {page_slide}
                {quiz_slide}
            </div>
        );
    }
}

export default FormTab;