import * as React from 'react';
import /* * as  */ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { colors } from '../definitions';

const mcc = 'color:lime;';


export interface ReactQuillOneProps {
    field: any;
    handler: any;
}

export interface ReactQuillOneState {
    text: any;
}

class ReactQuillOne extends React.Component<ReactQuillOneProps, ReactQuillOneState> {
    constructor(props: ReactQuillOneProps) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    public componentDidMount() {
        console.clear();
        console.log('%c : ReactQuillOne -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: ReactQuillOneProps, prevState: ReactQuillOneState) {
        console.log('%c : ReactQuillOne -> componentDidUpdate -> this.state', mcc, this.state);
    }

    // public modules = {
    //     toolbar: [
    //         [{ 'header': [1, 2, false] }],
    //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    //         ['link', 'image'],
    //         ['clean']
    //     ],
    // };

    public avail_colors = [colors.gray.e, colors.mint, colors.yellow, colors.pink];

    public modules = {
        // 'syntax': true,
        'toolbar': [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': this.avail_colors }, { 'background': [] }],
            // [{ 'color': ['#eee', '#34bebd', '#ffc658', '#be347a'] }, { 'background': [] }],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['direction', { 'align': [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean']
        ]
    }


    public formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    public handleChange(value) {
        this.setState({ text: value });
        this.props.handler(this.props.field.InternalName, value);
    }


    public render() {
        return (
            <ReactQuill
                theme='snow'
                modules={this.modules}
                // formats={this.formats}
                defaultValue={this.state.text}
                onChange={this.handleChange}
            />
        );
    }
}

export default ReactQuillOne;