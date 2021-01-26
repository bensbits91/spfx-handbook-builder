import * as React from 'react';
import { DatePicker, IDatePickerStyles } from 'office-ui-fabric-react/lib/DatePicker';
// import { colors } from './definitions';



const mcc = 'color:magenta;';

export interface FieldDatePickerProps {
    field: any;
    handler: any;
    // dark: boolean;
    // theme: any;
}

export interface FieldDatePickerState {

}

class FieldDatePicker extends React.Component<FieldDatePickerProps, FieldDatePickerState> {
    constructor(props: FieldDatePickerProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FieldDatePicker -> componentDidMount -> this.props', mcc, this.props);
    }

    public _onChange(f, d) {
        console.log('%c : FieldDatePicker -> _onChange -> f', mcc, f);
        console.log('%c : FieldDatePicker -> _onChange -> d', mcc, d);
        this.props.handler(f, d);
    }

    public render() {
        const { field/* , dark, theme */ } = this.props;


        // const datepickerStyles: Partial<IDatePickerStyles> = dark ? {
        //     textField: { backgroundColor: colors.gray.a },
        // } : {};

        return (
            <div>
                <DatePicker
                    label={field.Title}
                    placeholder='Please select a date'
                    highlightCurrentMonth
                    highlightSelectedMonth
                    onSelectDate={d => { this._onChange(field, d); }}
                    // showCloseButton
                    // showMonthPickerAsOverlay
                    // onRenderLabel={this._onRenderLabel}
                    showGoToToday={false}
                    // styles={{ root: {color: 'red'}}}
                    // styles={datepickerStyles}                     <--------------------- can't get styles to work !!!!!!!!!!!!!!!!!!!!!!!!!!
                />
            </div>
        );
    }
}

export default FieldDatePicker;