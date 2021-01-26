import * as React from 'react';
// import { Web } from "@pnp/sp/presets/all";
import { tabs, tab_template } from './definitions';
import TopMenu from './TopMenu';
import FormTab from './FormTab';
import FormButtons from './FormButtons';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

// import './temp.css';


const mcc = 'color:yellow;';
const mcc2 = 'color:yellow;background-color:black;';


export interface EditPivotProps {
    // web: string;
    // list: string;
    handler: any;
    context: any;
}

export interface EditPivotState {
    // fields_state: any;
    visible_tabs: any;
    selected_tab: number;
    prev_tab: number;
    next_tab: number;
    tabs_state: any;
    vertical_tab_layout: boolean;
    hasQuiz: boolean;
    quiz_questions?: any;
}

class EditPivot extends React.Component<EditPivotProps, EditPivotState> {
    constructor(props: EditPivotProps) {
        super(props);

        this.state = {
            // fields_state: null,
            visible_tabs: [0, 99],
            selected_tab: 0,
            prev_tab: null,
            next_tab: null,
            tabs_state: tabs,
            vertical_tab_layout: false,
            hasQuiz: false
        };
        this.handler_fields = this.handler_fields.bind(this);
        this.handler_attachments = this.handler_attachments.bind(this);
        this.handler_menus = this.handler_menus.bind(this);
        this.handler_pivot = this.handler_pivot.bind(this);
        this.handler_quiz = this.handler_quiz.bind(this);
    }

    public componentDidMount() {
        // this.getData_fields().then((fields: any) => {
        // console.clear();
        //     // console.log('%c : EditPivot -> componentDidMount -> fields', mcc, fields);
        //     this.setState({
        //         fields_state: fields
        //     });
        // });
    }

    public componentDidUpdate(prevProps: EditPivotProps, prevState: EditPivotState) {
        console.log('%c : EditPivot -> componentDidUpdate -> this.state', mcc, this.state);

        const prev_tabs = prevState.visible_tabs;
        console.log('%c : EditPivot -> componentDidUpdate -> prev_tabs', mcc, prev_tabs);
        const new_tabs = this.state.visible_tabs;
        console.log('%c : EditPivot -> componentDidUpdate -> new_tabs', mcc, new_tabs);
        if (prev_tabs.length < new_tabs.length) {
            console.log('%c : FormTabs -> componentDidUpdate -> TAB ADDED', mcc, new_tabs.length);

            // const prev_vis_tab_ids = prev_tabs.map(p => { return p });
            // console.log('%c : FormTabs -> componentDidUpdate -> prev_vis_tab_ids', mcc, prev_vis_tab_ids);

            const new_tab = new_tabs.filter(v => prev_tabs.indexOf(v) === -1)[0];
            console.log('%c : FormTabs -> componentDidUpdate -> new_tab', mcc, new_tab);

            const tab_title = this.state.tabs_state.filter(t => t.id === new_tab)[0].title;
            console.log('%c : EditPivot -> componentDidUpdate -> tab_title', mcc, tab_title);

            changePivotColor(tab_title);

        }

    }

    // public getData_fields = () => new Promise(resolve => {
    //     const the_web = Web(this.props.web);
    //     the_web.lists.getByTitle(this.props.list).fields
    //         .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType'")
    //         .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
    //         .get().then(fields => {
    //             resolve(fields);
    //         });
    // })

    // public getLastTab = () => new Promise(resolve => {
    //     const tab_last = Math.max(this.state.visible_tabs.filter(t => t !== 99));
    //     // console.log('%c : EditPivot -> tab_last', mcc, tab_last);
    // })

    public addTab = (tab_last) => new Promise(resolve => {
        const tab_new_tempmlate = JSON.parse(JSON.stringify(tab_template));
        const tab_new_id = tab_last + 1;
        tab_new_tempmlate.title = 'Page ' + tab_new_id;
        tab_new_tempmlate.id = tab_new_id;
        const tabs_copy = JSON.parse(JSON.stringify(this.state.tabs_state)).concat(tab_new_tempmlate);

        resolve(tabs_copy.sort((a, b) => {
            return a.id - b.id;
        }));
    })

    public navTo_newTab = (newTab) => new Promise(resolve => {

    })

    public handler_menus(event, button) {
        // console.log('%c : Form -> handler_menus -> event', mcc, event);
        // console.log('%c : Form -> handler_menus -> button', mcc, button);

        if (button = 'preview') {
            const slides_exclude = this.state.hasQuiz ? [99] : [90, 99];
            const slides = this.state.tabs_state.filter(t => slides_exclude.indexOf(t.id) === -1);
            this.props.handler('preview', slides);
        }

        if (button == 'prev') {
            // console.log('%c : EditPivot -> handler_menus -> this.state.selected_tab', mcc2, this.state.selected_tab);
            const new_selected_tab = getNextLowestIndex(this.state.visible_tabs, this.state.selected_tab);
            // console.log('%c : EditPivot -> handler_menus -> new_selected_tab PREV', mcc2, new_selected_tab);
            if (new_selected_tab > -1)
                this.setState({
                    selected_tab: new_selected_tab,
                    prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
                    next_tab: getNextHighestIndex(this.state.visible_tabs, new_selected_tab)
                });
        }

        else if (button == 'next') {
            const sel_tab = this.state.selected_tab;
            // console.log('%c : EditPivot -> handler_menus -> sel_tab', mcc2, sel_tab);
            const new_selected_tab = getNextHighestIndex(this.state.visible_tabs, sel_tab);
            // console.log('%c : EditPivot -> handler_menus -> new_selected_tab NEXT', mcc2, new_selected_tab);
            const new_next_tab = getNextHighestIndex(this.state.visible_tabs, new_selected_tab);
            // console.log('%c : EditPivot -> handler_menus -> new_next_tab', mcc2, new_next_tab);
            if (new_selected_tab > -1)
                this.setState({
                    selected_tab: new_selected_tab,
                    prev_tab: sel_tab,
                    // prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
                    next_tab: new_next_tab
                });
        }

        else if (button == 'layout') {
            this.setState({ vertical_tab_layout: !this.state.vertical_tab_layout });
        }


    }

    public handler_fields(field, value, checked) {
        console.log('%c : EditPivot -> handler_fields -> field', mcc2, field);
        console.log('%c : EditPivot -> handler_fields -> value', mcc2, value);
        console.log('%c : EditPivot -> handler_fields -> checked', mcc2, checked);

        const tabs_copy = JSON.parse(JSON.stringify(this.state.tabs_state));
        const this_tab = tabs_copy.filter(t => t.id === this.state.selected_tab)[0];

        const this_section = this_tab.sections.filter(sa => sa.fields.filter(sf => sf.InternalName == field).length > 0)[0];
        console.log('%c : EditPivot -> handler_fields -> this_section', mcc, this_section);

        const this_field = this_section.fields.filter(f => f.InternalName == field)[0];
        // console.log('%c : EditPivot -> handler_fields -> this_field', mcc2, this_field);

        this_field.value = checked === undefined ? value : checked ? 'Yes' : 'No';
        // console.log('%c : EditPivot -> handler_fields -> this_field.value', mcc2, this_field.value);

        const liveScoring_field = this_section.fields.filter(l => l.InternalName == 'EnableLiveScoring')[0];
        const scoringType_field = this_section.fields.filter(l => l.InternalName == 'ScoringType')[0];

        if (field == 'PageHeading') {
            this_tab.title = value;
        }
        else if (field == 'HasQuiz') {
            if (checked) {
                this_field.checked = true;
                liveScoring_field.show = true;
                this.setState({
                    visible_tabs: this.state.visible_tabs.concat(90),
                    hasQuiz: true,
                    tabs_state: tabs_copy
                });
            }
            else {
                this_field.checked = false;
                liveScoring_field.show = false;
                scoringType_field.show = false;
                this.setState({
                    visible_tabs: this.state.visible_tabs.filter(t => t !== 90),
                    hasQuiz: false,
                    tabs_state: tabs_copy
                });
            }
        }
        else if (field == 'EnableLiveScoring') {
            if (checked) {
                this_field.checked = true;
                scoringType_field.show = true;
                this.setState({
                    tabs_state: tabs_copy
                });
            }
            else {
                this_field.checked = false;
                scoringType_field.show = false;
                this.setState({
                    tabs_state: tabs_copy
                });
            }
        }

        // console.log('%c : EditPivot -> handler_fields -> tabs_copy', mcc, tabs_copy);
        this.setState({ tabs_state: tabs_copy });

    }

    public handler_attachments(data, tabId) {
        console.log('%c : EditPivot -> handler_attachments -> data', mcc, data);
        console.log('%c : EditPivot -> handler_attachments -> tabId', mcc, tabId);
        const tabs_copy = JSON.parse(JSON.stringify(this.state.tabs_state));
        const this_tab = tabs_copy.filter(t => t.id === this.state.selected_tab)[0];
        this_tab.attachments = data;
        this.setState({ tabs_state: tabs_copy });
    }

    private handler_pivot(item, event): void {
        // console.log('%c : EditPivot -> handler_pivot -> item', mcc, item);
        // console.log('%c : EditPivot -> handler_pivot -> event', mcc, event);
        const new_selected_tab = parseInt(item.key.split('$')[1]);
        // console.log('%c : EditPivot -> handler_pivot -> new_selected_tab', mcc, new_selected_tab);

        if (new_selected_tab === 99) {
            // console.log('need to add tab now, and then go to the new tab');
            const tabs_real = this.state.visible_tabs.filter(t => t < 90);
            // console.log('%c : EditPivot -> handler_pivot -> tabs_real', mcc, tabs_real);
            const tab_last = Math.max(...tabs_real);
            // const tab_last = Math.max.apply(null, tabs_real);
            // console.log('%c : EditPivot -> handler_pivot -> tab_last', mcc, tab_last);
            this.addTab(tab_last).then(tabs_new => {
                // console.log('%c : EditPivot -> handler_pivot -> tabs_new', mcc, tabs_new);
                this.setState({
                    tabs_state: tabs_new,
                    visible_tabs: this.state.visible_tabs.concat(tab_last + 1)
                });
            });

            // this.getLastTab()
            /* .then(lastTab => { this.addTab(lastTab) })
            .then(nt => this.navTo_newTab(nt))
            .then(asdf => {
                this.setState({

                });
            }); */
        }


        else {
            this.setState({
                selected_tab: new_selected_tab,
                prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
                next_tab: getNextHighestIndex(this.state.visible_tabs, new_selected_tab)
            });
        }
    }

    public handler_quiz(questions) {
        console.log('%c : EditPivot -> handler_quiz -> questions', mcc, questions);
        // this.setState({ quiz_questions: questions });
        const tabs_copy = JSON.parse(JSON.stringify(this.state.tabs_state));
        const my_tab = tabs_copy.filter(t => t.id === 90)[0];
        console.log('%c : EditPivot -> handler_quiz -> my_tab', mcc, my_tab);
        my_tab.quiz_data = questions;
        this.setState({ tabs_state: tabs_copy });
    }

    public render() {
        const { /* fields_state,  */visible_tabs, tabs_state, selected_tab, quiz_questions } = this.state;

        const tabs_sorted = visible_tabs.sort((a, b) => {
            return a - b;
            // return a.id - b.id;
        });
        // console.log('%c : EditPivot -> render -> tabs_sorted', mcc, tabs_sorted);


        const el_tabs = visible_tabs.map(v => {
            // console.log('%c : EditPivot -> render -> v', mcc, v);

            const my_tab = tabs_state.filter(t => t.id == v)[0];
            // console.log('%c : EditPivot -> render -> my_tab', mcc, my_tab);
            if (my_tab && my_tab.sections) {
                my_tab.sections.map(s => {
                    // console.log('%c : EditPivot -> render -> s', mcc2, s);
                    if (s.fields)
                        s.fields.map(f => {
                            // console.log('%c : EditPivot -> render -> f', mcc2, f);
                            // const this_field = fields_state.filter(field => field.InternalName == f.InternalName)[0];
                            // // console.log('%c : EditPivot -> render -> this_field', mcc2, this_field);
                            // f['Description'] = this_field.Description || 'no description';
                            // f['Required'] = this_field.Required;
                            const title_fix = f.InternalName
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => { return str.toUpperCase(); })
                                .trim();
                            f['Title'] = title_fix;
                            // f['TypeAsString'] = this_field.TypeAsString;
                            // f['Choices'] = this_field.Choices || null;
                        });
                });
                // console.log('%c : EditPivot -> render -> my_tab', mcc2, my_tab);
            }
            // else { console.log('no tab/section'); }


            return (
                <PivotItem
                    headerText={my_tab.title}
                    key={my_tab.id}
                    itemIcon={my_tab.itemIcon}
                // key={makeKey(my_tab.title)}
                // onChange={e => // console.log('onChange', e)}
                // onClick={e => // console.log('onClick', e)}
                >
                    <FormTab
                        key={quiz_questions ? quiz_questions.length : 0}
                        tab={my_tab}
                        handler={this.handler_fields}
                        handler_attachments={this.handler_attachments}
                        handler_quiz={this.handler_quiz}
                        context={this.props.context}
                    // quiz_data={quiz_questions}
                    />
                </PivotItem>
            );

        });



        const pivot_className = this.state.vertical_tab_layout ? 'nuTabs verticalPivot' : 'nuTabs';

        return (
            <>
                <TopMenu
                    handler={this.handler_menus}
                />
                <Pivot
                    onLinkClick={this.handler_pivot}
                    selectedKey={'' + selected_tab}
                    styles={{
                        root: {
                            margin: 50,
                        },
                        itemContainer: {
                            margin: '0 120px',
                            // maxWidth: 900
                        }
                    }}
                    className={pivot_className}
                >
                    {el_tabs}
                </Pivot>
                <FormButtons
                    handler={this.handler_menus}
                    isFirstTab={this.state.prev_tab == null || this.state.prev_tab === -1}
                    isLastTab={this.state.next_tab == null || this.state.next_tab === -1}
                />
            </>
        );
    }
}


function changePivotColor(tab_title) {
    console.log('%c : changePivotColor -> tab_title', mcc, tab_title);
    const the_tab = document.querySelector('.nuTabs .ms-Pivot .ms-Button[name="' + tab_title + '"]')
    console.log('%c : changePivotColor -> the_tab', mcc, the_tab);
    setTimeout(() => {
        the_tab.classList.add('new-tab');
    }, 100);
    setTimeout(() => {
        the_tab.classList.remove('new-tab');
    }, 3000);
}

function makeKey(string) {
    return string.replace(/ /g, '');
}

function getNextHighestIndex(arr, value) {
    // console.log('%c : getNextHighestIndex -> arr', mcc, arr);
    // console.log('%c : getNextHighestIndex -> value', mcc, value);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]/* .id */ > value) {
            return i;
        }
    }
    return -1;
}

function getNextLowestIndex(arr, value) {
    // console.log('%c : getNextLowestIndex -> arr', mcc, arr);
    // console.log('%c : getNextLowestIndex -> value', mcc, value);
    for (let i = arr.length - 1; i > -1; i--) {
        if (arr[i]/* .id */ < value) {
            return i;
        }
    }
    return -1;
}

export default EditPivot;