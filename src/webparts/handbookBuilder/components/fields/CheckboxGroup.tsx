import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';

// import styles from './CheckboxGroup.module.scss';




export interface CheckboxGroupsProps {
    field: any;
    handler: any;
    label?: boolean;
}

export interface CheckboxGroupsState {

}

class CheckboxGroups extends React.Component<CheckboxGroupsProps, CheckboxGroupsState> {
    constructor(props: CheckboxGroupsProps) {
        super(props);
        this.state = {};
        // this.props.handler.bind(this);
    }

    public render() {
        const { field } = this.props;

        const field_label = field.TypeAsString == 'MultiChoice' || field.TypeAsString == 'Checkboxes' || field.TypeAsString == 'True/False' ? field.Title : '';
        const label = this.props.label === true || this.props.label === undefined || this.props.label === null ? field_label : false;


        const field_choices = field.TypeAsString == 'MultiChoice' || field.TypeAsString == 'Checkboxes' || field.TypeAsString == 'True/False' ? field.Choices : [field.Title];

        const choices = field_choices.map(c => {
            return <Checkbox
                key={makeKey(c)}
                label={c}
                checked={field.checked} // MIGHT ONLY BE HANDLING BOOLEAN FIELDS RIGHT NOW
                onChange={(event, checked) => this.props.handler(/* event,  */field.InternalName, c, checked)}
                // className={styles.buttonCustomSlider}
            />;
        });

        return (
            <div /* className={styles.ChoiceButtons} */>
                {/* <div className={styles.buttonWrap}> */}
                    {label}
                    {choices}
                {/* </div> */}
            </div>
        );
    }
}

function makeKey(string) {
    return string.replace(/ /g, '');
}


export default CheckboxGroups;