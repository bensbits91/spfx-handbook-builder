import * as React from 'react';
import { ActionButton, IIconProps, Stack } from 'office-ui-fabric-react';

import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';

import { colors } from './definitions';
import styles from './Quiz.module.scss';


const mcc = 'color:purple;background-color:yellow;'

const addIcon: IIconProps = { iconName: 'Add' };
const removeIcon: IIconProps = { iconName: 'Cancel' };

// const styles_addButton = {
//     label: {
//         color: colors.mint
//     },
//     labelHovered: {
//         color: colors.gray.c
//     },
//     icon: {
//         color: colors.mint
//     },
//     iconHovered: {
//         color: colors.gray.c
//     },
//     iconPressed: {
//         color: colors.gray.c
//     }
// }



export interface QuizProps {
    handler_quiz: any;
    quiz_data: any;
}

export interface QuizState {
    // questions: any;
}

class Quiz extends React.Component<QuizProps, QuizState> {
    constructor(props: QuizProps) {
        super(props);
        this.state = {
            // questions: this.props.quiz_data
            // questions: []
        };
        this.onClick_addQuestion = this.onClick_addQuestion.bind(this);
        this.handler_fields = this.handler_fields.bind(this);
    }

    public componentDidMount() {
        // console.log('%c : Quiz -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: QuizProps, prevState: QuizState) {
        // console.log('%c : Quiz -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onClick_addQuestion() {
        const question_id = this.props.quiz_data ? this.props.quiz_data.length + 1 : 1;

        const new_question_obj = {
            id: question_id,
            title: 'Question ' + question_id,
            type: '',
            answer: '',
            points: 1
        }

        const new_questions = this.props.quiz_data
            ? /* JSON.parse(JSON.stringify( */this.props.quiz_data/* )) */.concat(new_question_obj)
            : [new_question_obj];
        this.props.handler_quiz(new_questions);
    }

    public onClick_removeQuestion(question_id) {
        // console.log('%c : Quiz -> onClick_removeQuestion -> question_id', mcc, question_id);
        // const this_question = this.props.quiz_data.filter(q => q.id = question_id)[0];
        // // console.log('%c : Quiz -> onClick_removeQuestion -> this_question', mcc, this_question);
        const new_questions = this.props.quiz_data.filter(q => q.id !== question_id);
        this.props.handler_quiz(new_questions);

    }

    public handler_fields(field, value) {
        console.log('%c : Quiz -> handler_fields -> field', mcc, field);
        console.log('%c : Quiz -> handler_fields -> value', mcc, value);
        const this_id = parseInt(field.split('-')[1]);
        const this_field = field.split('-')[2];
        console.log('%c : Quiz -> handler_fields -> this_id', mcc, this_id);
        console.log('%c : Quiz -> handler_fields -> this_field', mcc, this_field);

        const questions_copy = JSON.parse(JSON.stringify(this.props.quiz_data));
        console.log('%c : Quiz -> handler_fields -> questions_copy', mcc, questions_copy);

        const this_question = questions_copy.filter(q => q.id === this_id)[0];
        console.log('%c : Quiz -> handler_fields -> this_question', mcc, this_question);

        this_question[this_field] = value;

        this.props.handler_quiz(questions_copy);

    }

    public render() {

        const { quiz_data } = this.props;
        // console.log('%c : Quiz -> render -> quiz_data', mcc, quiz_data);

        const el_questions = quiz_data ? quiz_data.map(q => {

            const interName = 'question-' + q.id;
            return (
                <div key={q.id} className={styles.questionWrap}>

                    <Stack horizontal>

                        <div className={styles.questionHead}>
                            {q.title}
                        </div>


                        <div className={styles.quizRemoveButtonWrap}>
                            <ActionButton
                                iconProps={removeIcon}
                                text='Remove question'
                                // styles={styles_addButton}
                                onClick={() => this.onClick_removeQuestion(q.id)}
                            />
                        </div>

                    </Stack>


                    <div className='temp-questionTitleWrap'>
                        <FieldText
                            field={{
                                InternalName: interName + '-title',
                                Title: 'Question title',
                                value: q.title
                            }}
                            handler={this.handler_fields}
                        />
                    </div>
                    <div className='temp-questionDescritionWrap'>
                        <FieldText
                            field={{
                                InternalName: interName + '-description',
                                Title: 'Question description (optional)',
                                value: null
                            }}
                            handler={this.handler_fields}
                        />
                    </div>
                    <div className='temp-questionTypeWrap'>
                        <FieldDropDown
                            field={{
                                InternalName: interName + '-type',
                                Title: 'Answer type',
                                Choices: ['Choose One', 'Multiple Choice', 'True/False'],
                                // Choices: ['Text', 'Dropdown', 'Checkboxes', 'True/False'],
                                value: q.type
                            }}
                            handler={this.handler_fields}
                        />
                    </div>
                    {/* {(q.type == 'Dropdown' || q.type == 'Checkboxes') ? */}
                    {(q.type == 'ChooseOne' || q.type == 'MultipleChoice') ?
                        <div className='temp-questionChoicesWrap'>
                            <FieldText
                                field={{
                                    InternalName: interName + '-choices',
                                    Title: 'Answer choices',
                                    value: q.choices
                                }}
                                handler={this.handler_fields}
                                placeholder='Enter choices separated by commas, (e.g. "Apples, Oranges, Limes")'
                            />
                        </div>
                        : <></>
                    }
                    <div className='temp-questionAnswerWrap'>
                        <FieldText
                            field={{
                                InternalName: interName + '-answer',
                                Title: 'Correct answer',
                                value: q.answer
                            }}
                            handler={this.handler_fields}
                        />
                    </div>
                    <div className='temp-questionPointsWrap'>
                        <FieldText
                            field={{
                                InternalName: interName + '-points',
                                Title: 'Points',
                                value: q.points
                            }}
                            handler={this.handler_fields}
                        />
                    </div>
                </div>
            );
        })
            : <></>;

        return (
            <div className={styles.quizWrap}>
                {quiz_data && <div className='temp-questionsWrap'>
                    {el_questions}
                </div>}
                <div className={styles.quizButtonWrap}>
                    <ActionButton
                        iconProps={addIcon}
                        text='Add a question'
                        // styles={styles_addButton}
                        onClick={() => this.onClick_addQuestion()}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;