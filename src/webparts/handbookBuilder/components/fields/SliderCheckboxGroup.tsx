import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { colors } from '../definitions';
import hexToRgba from 'hex-to-rgba';

import styles from './SliderCheckboxGroup.module.scss';


const mcc = 'color:lime;background-color:black;';

export interface SliderCheckboxGroupProps {
    field: any;
    handler: any;
    label?: boolean;
}

export interface SliderCheckboxGroupState {
    // isChecked: boolean;
    checked_boxes: any;
}

class SliderCheckboxGroup extends React.Component<SliderCheckboxGroupProps, SliderCheckboxGroupState> {
    constructor(props: SliderCheckboxGroupProps) {
        super(props);
        this.state = { checked_boxes: null };
        // this.props.handler.bind(this);
    }

    public componentDidMount() {
        console.log('%c : SliderCheckboxGroup -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: SliderCheckboxGroupProps, prevState: SliderCheckboxGroupState) {
        console.log('%c : SliderCheckboxGroup -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onChange_checkbox(field, choice, checked) {
        // console.log('%c : SliderCheckboxGroup -> onChange_checkbox -> field', mcc, field);
        console.log('%c : SliderCheckboxGroup -> onChange_checkbox -> choice', mcc, choice);
        console.log('%c : SliderCheckboxGroup -> onChange_checkbox -> checked', mcc, checked);
        this.props.handler(/* event,  */field.InternalName, choice, checked);

        const checked_already = JSON.parse(JSON.stringify(this.state.checked_boxes));
        console.log('%c : SliderCheckboxGroup -> onChange_checkbox -> checked_already', mcc, checked_already);
        const isInState = checked_already ? checked_already.indexOf(choice) > -1 : false;
        console.log('%c : SliderCheckboxGroup -> onChange_checkbox -> isInState', mcc, isInState);

        const new_checks =
            checked && !isInState
                ? checked_already ? checked_already.concat(choice) : [choice]
                : isInState && checked_already ? checked_already.filter(c => c != choice)
                    : null;

        this.setState({ checked_boxes: new_checks });

    }

    public render() {
        const { field } = this.props;

        const field_label = field.TypeAsString == 'MultiChoice' || field.TypeAsString == 'Checkboxes' || field.TypeAsString == 'True/False' ? field.Title : '';
        const label = this.props.label === true || this.props.label === undefined || this.props.label === null ? field_label : false;


        const field_choices = field.TypeAsString == 'MultiChoice' || field.TypeAsString == 'Checkboxes' || field.TypeAsString == 'True/False' || field.TypeAsString == 'MultipleChoice' ? field.Choices : [field.Title];

        const choices = field_choices.map(c => {
            const itsMe = this.state.checked_boxes ? this.state.checked_boxes.indexOf(c) > -1 : false;
            console.log('%c : SliderCheckboxGroup -> render -> itsMe', mcc, itsMe);

            const styles_checkbox = {
                label: {
                    backgroundColor: hexToRgba(itsMe ? colors.yellow : colors.mint, itsMe ? .9 : .7),
                    padding: 40,
                    width: 250,
                    selectors:
                    {
                        '&:hover': {
                            backgroundColor: hexToRgba(colors.yellow, itsMe ? 1 : .7),
                        },
                        '& *': {
                            color: colors.navy,
                        }
                    }
                }
            };

            return <Checkbox
                key={makeKey(c)}
                label={c}
                // checked={field.checked} // MIGHT ONLY BE HANDLING BOOLEAN FIELDS RIGHT NOW
                onChange={(event, checked) => this.onChange_checkbox(/* event,  */field.InternalName, c, checked)}
                // className={styles.buttonCustomSlider}
                styles={/* field.checked ? styles_checkbox_selected :  */styles_checkbox}
            />;
        });

        return (
            <div className={styles.CheckboxButtons}>
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


export default SliderCheckboxGroup;