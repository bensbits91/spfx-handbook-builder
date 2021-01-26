import * as React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';
import './slider.css';

import SliderCheckboxGroup from './fields/SliderCheckboxGroup';
// import FieldDropDown from './fields/FieldDropDown';
import FieldChoiceButtons from './fields/FieldChoiceButtons';
import AttachmentManager from './AttachmentManager';

// import Buttons from './Buttons';
import SlideFooter from './SlideFooter';

import { colors } from './definitions';

import styles from './Slider.module.scss';

const mcc = 'color:magenta;';
const mcc2 = 'color:magenta;background-color:black;';

const editIcon: IIconProps = { iconName: 'Edit' };


export interface SliderProps {
    slides: any;
    handler: any;
}

export interface SliderState {
    // compact: boolean;
    // dark: boolean;
    // fields: any;
    // completed_fields: any;
    // slides_visible: any;
    slides_ready: any;
}

class Slider extends React.Component<SliderProps, SliderState> {
    constructor(props: SliderProps) {
        super(props);
        this.state = {
            slides_ready: null
            // sections: null,
            // dark: false,
            // compact: false,
            // fields: null,
            // completed_fields: null,
            // slides_visible: init_fields
        };
    }

    public componentDidMount() {
        console.log('%c : Slider -> componentDidMount -> this.props', mcc, this.props);
        const { slides } = this.props;
        // console.log('%c : Slider -> render -> slides', mcc, slides);
        const quiz_slide = slides.filter(sli => sli.id === 90)[0];
        console.log('%c : Slider -> componentDidMount -> quiz_slide', mcc2, quiz_slide);
        const quiz_questions = quiz_slide && quiz_slide.quiz_data ? quiz_slide.quiz_data : null;
        console.log('%c : Slider -> componentDidMount -> quiz_questions', mcc2, quiz_questions);

        const quiz_slide_data = this.addQuizSlides(quiz_questions).then(qq => {
            console.log('%c : Slider -> componentDidMount -> qq', mcc, qq);

            const slides_ready = qq ? slides.concat(qq) : slides;
            console.log('%c : Slider -> componentDidMount -> slides_ready', mcc, slides_ready);

            this.setState({ slides_ready: slides_ready });
        })
        console.log('%c : Slider -> componentDidMount -> quiz_slide_data', mcc, quiz_slide_data);

    }

    public componentDidUpdate(prevProps: SliderProps, prevState: SliderState) {
        console.log('%c : Slider -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public addQuizSlides = (quiz_questions) => new Promise(resolve => {
        console.log('%c : Slider -> addQuizSlides -> quiz_questions', mcc, quiz_questions);

        const end_slide = {
            id: 999,
            title: 'End of Quiz',
            description: 'Thanks for completing this module!',
            field_type: null,
            points: null,
            choices: null,
            answer: null
        };

        const qq = quiz_questions ? quiz_questions.map(q => {
            console.log('%c : Slider -> componentDidMount -> q', 'color:red', q);
            const q_obj = {
                id: q.id + 900,
                title: q.title,
                description: q.description,
                field_type: q.type,
                points: q.points,
                choices: q.choices,
                answer: q.answer
            }
            console.log('%c : Slider -> componentDidMount -> q_obj', mcc, q_obj);
            return q_obj;
        }).concat(end_slide)
            : null;
        resolve(qq);
    })

    public render() {
        const { slides_ready } = this.state;
        console.log('%c : Slider -> render -> slides_ready', mcc2, slides_ready);

        const styles_editButton = {
            label: {
                color: colors.mint
            },
            labelHovered: {
                color: colors.gray.c
            },
            icon: {
                color: colors.mint
            },
            iconHovered: {
                color: colors.gray.c
            },
            iconPressed: {
                color: colors.gray.c
            }
        }


        const module_name = slides_ready ? slides_ready[0].sections[0].fields[0].value : '';

        const the_slides = slides_ready ? slides_ready.map(s => {
            console.log('%c : Slider -> render -> s', 'color:red;', s);
            const slide_head =
                s.id === 0 ? 'Welcome to the ' + module_name + ' module'
                    : s.id === 90 ? 'Quiz for the ' + module_name + ' module'
                        : s.title;

            const slide_description = s.description ? <div className={styles.slideDescription}>{s.description}</div> : <></>;

            const fields = s.sections ? s.sections[0].fields : null;

            const slide_body =
                fields
                    ? s.id === 0 ? fields.filter(f => f.InternalName == 'ParentHandbook')[0].value
                        : fields.filter(f => f.InternalName == 'PageContent')[0].value
                            ? <span dangerouslySetInnerHTML={{
                                __html: fields.filter(f => f.InternalName == 'PageContent')[0].value
                            }} />
                            : <></>
                    : s.field_type == 'Dropdown' || s.field_type == 'True/False' || s.field_type == 'ChooseOne' ?
                        <div className={'fieldWrap ' + s.field_type}>
                            <FieldChoiceButtons
                                field={{
                                    TypeAsString: s.field_type,
                                    InternalName: (s.title).replace(/ /g, ''),
                                    Title: s.title,
                                    Choices: s.field_type == 'Dropdown' || s.field_type == 'ChooseOne' ? s.choices.split(',') : ['True', 'False'],
                                    value: null
                                }}
                            />

                        </div>
                        : s.field_type == 'Checkboxes' || s.field_type == 'MultipleChoice' ?

                            <div className={'fieldWrap ' + s.field_type}>
                                <SliderCheckboxGroup
                                    field={{
                                        TypeAsString: s.field_type,
                                        InternalName: (s.title).replace(/ /g, ''),
                                        Title: s.title,
                                        Choices: /* s.field_type == 'Checkboxes' ?  */s.choices.split(',')/*  : ['True', 'False'] */,
                                        checked: false
                                    }}
                                    handler={() => console.log('qwer')}
                                    label={false}
                                />
                            </div>
                            : s.field_type == 'Text' ? 'quiz slide body - Text' // do i still want this to be a type of question? if so, need to render text field
                                // : s.field_type == 'True/False' ? 'quiz slide body - True/False'
                                : '';


            // const slide_attachments = s.attachments 

            const side_zone =
                s.attachments ?
                    <div className='temp-side-zone'>
                        <div>
                            <AttachmentManager
                                // context={this.props.context}
                                // handler={this.props.handler_attachments}
                                tab={s}
                                readonly={true}
                                dark={true}
                                compact={true}
                            />
                        </div>
                    </div>
                    : <></>;




            const slide_footer = s.id === 999 ?
                <SlideFooter />
                : <></>;


            return (
                <>
                    <div key={s.id}>
                        <div className={styles.slideTitle}>{slide_head}</div>
                        {slide_description}
                        <Stack horizontal className={styles.slideBodyWrap}>
                            <div className={styles.slideBody}>{slide_body}</div>
                            {side_zone}
                        </Stack>
                        {slide_footer}
                    </div>

                </>
            );
        })
            : <></>;
        console.log('%c : Slider -> render -> the_slides', mcc2, the_slides);


        const el_slider = the_slides ?
            <div className='sliderWrap'>
                <AwesomeSlider
                    animation='cubeAnimation'
                    className='awesome-slider'
                    fillParent
                    infinite={false}
                >
                    {the_slides}
                </AwesomeSlider>
                <div className={styles.sliderEditButtonWrap}>
                    <ActionButton
                        iconProps={editIcon}
                        text='Edit module'
                        styles={styles_editButton}
                        onClick={() => this.props.handler('edit')}
                    />
                </div>
            </div>
            : <></>;

        return (
            <>{el_slider}</>
        );
    }
}

// function changeDot(num, color) {
//     const theDot: HTMLElement = document.querySelector('.awssld__bullets button[data-index="' + num + '"]');
//     if (theDot) theDot.style['background-color'] = color;
// }

export default Slider;