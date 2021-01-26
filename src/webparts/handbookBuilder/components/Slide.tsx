import * as React from 'react';

import CheckboxGroup from './fields/CheckboxGroup';
import FieldDropDown from './fields/FieldDropDown';
import FieldText from './fields/FieldText';
import FieldDatePicker from './fields/FieldDatePicker';

import styles from './Slider.module.scss';


const mcc = 'color:black;background-color:#ddd;';
const mcc2 = 'color:red;background-color:#bbb;';

export interface SlideProps {
    slide_obj: any;
    slide_type: string;
    slide_head: string;
    slide_meat: any;
    // module_name: string;
    handler?: any;
}

export interface SlideState {
    slide_body: any;
    // slide_head?: string;
}

class Slide extends React.Component<SlideProps, SlideState> {
    constructor(props: SlideProps) {
        super(props);
        this.state = {
            slide_body: null
        };
    }

    public componentDidMount() {
        console.log('%c : Slide -> componentDidMount -> this.props', mcc, this.props);
        const { slide_obj, slide_meat, slide_type } = this.props;
        this.setState({ slide_body: slide_type  });

        // let slide_body = null;


        // if (slide_type == 'main') { // main slide type
        //     console.log('%c : Slide -> componentDidMount -> slide_obj.sections', mcc2, slide_obj.sections);
        //     const fields = slide_obj.sections[0].fields;

        //     slide_body = slide_obj.id === 0
        //         ? fields.filter(f => f.InternalName == 'ParentHandbook')[0].value
        //         : fields.filter(f => f.InternalName == 'PageContent')[0].value
        //             ? fields.filter(f => f.InternalName == 'PageContent')[0].value
        //             : <div>no body</div>;
        //     console.log('%c : Slide -> componentDidMount -> slide_body', mcc, slide_body);

        //     // this.setState({
        //     //     slide_body: slide_body
        //     // });

        // }
        // else if (slide_type == 'quiz') { // quiz slide type
        //     console.log('%c : Slide -> componentDidMount -> slide_obj.field_type', mcc2, slide_obj.field_type);
        //     // console.log('%c : Slide -> componentDidMount -> slide_obj.quiz_data', mcc2, slide_obj.quiz_data);

        //     const field_type = slide_obj.field_type;
        //     console.log('%c : Slide -> componentDidMount -> field_type', field_type);

        //     slide_body = field_type == 'Dropdown' ?
        //         <div className={'fieldWrap ' + field_type}>
        //             <FieldDropDown
        //                 field={slide_obj}
        //                 handler={this.props.handler}
        //             />
        //         </div>
        //         : <div className={'fieldWrap ' + field_type}>{field_type}</div>;

        //     console.log('%c : Slide -> componentDidMount -> slide_body', mcc, slide_body);


        //     // const slide_body = slide_obj.type;
        //     // NEED SIMILAR LOGIC TO FORM SECTION TO DETERMINE WHICH TYPE OF FIELD TO RENDER



        //     // this.setState({
        //     //     slide_body: slide_body
        //     // });

        // }
        // else {
        //     console.log('%c : Slide -> componentDidMount -> no slide type', mcc, 'no slide type');
        //     slide_body = 'no slide type';
        //     console.log('%c : Slide -> componentDidMount -> slide_body', mcc, slide_body);
        //     // this.setState({
        //     //     slide_body: 'no slide type'
        //     // });
        // }

        // console.log('%c : Slide -> componentDidMount -> slide_body', mcc, slide_body);
        // if (slide_body) {
        //     this.setState({
        //         slide_body: slide_body
        //     });
        // }


    }

    public componentDidUpdate(prevProps: SlideProps, prevState: SlideState) {
        console.log('%c : Slide -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public render() {

        let the_slide = null;

        if (this.state.slide_body) {
            const { slide_obj, slide_head } = this.props;
            const { slide_body } = this.state;
            console.log('%c : Slide -> render -> slide_head', mcc, slide_head);
            console.log('%c : Slide -> render -> slide_obj', mcc, slide_obj);
            console.log('%c : Slide -> render -> slide_body', mcc, slide_body);

            the_slide = slide_body ?
                <div
                    key={slide_obj.id}
                >
                    <div className={styles.slideTitle}>
                        {slide_head}
                    </div>
                    <div className={styles.slideBody}>
                        {slide_body}
                    </div>
                </div>
                : <></>;
        }
        return (
            <>
                {the_slide && the_slide}
            </>
        );
    }
}

export default Slide;