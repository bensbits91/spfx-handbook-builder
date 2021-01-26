import * as React from 'react';
import CheckboxGroup from './fields/CheckboxGroup';
import FieldDropDown from './fields/FieldDropDown';
import FieldText from './fields/FieldText';
import FieldDatePicker from './fields/FieldDatePicker';
import ReactQuillOne from './fields/ReactQuillOne';
// import FieldPeoplePicker from './fields/FieldPeoplePicker';




export interface FormSectionProps {
    section: any;
    handler: any;
}

export interface FormSectionState {

}

class FormSection extends React.Component<FormSectionProps, FormSectionState> {
    constructor(props: FormSectionProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { section } = this.props;
        const fields = section.fields
            ? section.fields.map(f => {
                const { show, TypeAsString, Title, value, checked } = f;
                if (show) {
                    if (TypeAsString == 'MultiChoice' || TypeAsString == 'Boolean' || TypeAsString == 'MultipleChoice')
                        return (
                            <div className={'fieldWrap ' + TypeAsString}>
                                <CheckboxGroup
                                    field={f}
                                    handler={this.props.handler}
                                />
                            </div>
                        );
                    else if (TypeAsString == 'Choice' || TypeAsString == 'ChooseOne')
                        return (
                            <div className={'fieldWrap ' + TypeAsString}>
                                <FieldDropDown
                                    field={f}
                                    handler={this.props.handler}
                                />
                            </div>
                        );
                    else if (TypeAsString == 'Text' || f.TypeAsString == 'Currency')
                        return (
                            <div className={'fieldWrap ' + TypeAsString}>
                                <FieldText
                                    field={f}
                                    handler={this.props.handler}
                                    multiline={f.TypeAsString == 'Note'}    // if we want to support plaintext MLOTs
                                    rows={6}                                 // if we want to support plaintext MLOTs
                                    // value={value}
                                />
                            </div>
                        );
                    else if (f.TypeAsString == 'Note') // rich text
                        return (
                            <div className={'fieldWrap ' + TypeAsString}>
                                <ReactQuillOne
                                    field={f}
                                    handler={this.props.handler}
                                    // multiline={f.TypeAsString == 'Note'}
                                    // rows={6}
                                    // value={value}
                                />
                            </div>
                        );
                    else if (TypeAsString == 'DateTime')
                        return (
                            <div className={'fieldWrap ' + TypeAsString}>
                                <FieldDatePicker
                                    field={f}
                                    handler={this.props.handler}
                                />
                            </div>
                        );
                    // else if (TypeAsString == 'User') {
                    //     return (
                    //         <div className={'fieldWrap ' + TypeAsString}>
                    //             <div>{Title}</div>
                    //             <FieldPeoplePicker />
                    //         </div>
                    //     );
                    // }
                }
            })
            : <></>;

        const section_class = section.columns ? 'sectionWrap cols-' + section.columns : 'sectionWrap';

        return (
            <div className={section_class}>
                {fields}
            </div>
        );
    }
}

export default FormSection;