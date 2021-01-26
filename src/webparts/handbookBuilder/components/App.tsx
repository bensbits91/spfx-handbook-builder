import * as React from 'react';
import EditPivot from './EditPivot';
import Slider from './Slider';
import './temp.css';

/* 

copy slider components from form-slider
if mode == edit ? form-checkbox-tabs : form-slider
button to change modes

*/

const mcc = 'color: red';

export interface AppProps {
    context: any;
}

export interface AppState {
    mode: string;
    slides: any;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            mode: 'edit',
            slides: null
        };
        this.handler_modeSwitch = this.handler_modeSwitch.bind(this);
    }

    public componentDidMount() {
        // console.clear();
    }

    public handler_modeSwitch(mode, slides) {
        console.log('%c : App -> handler_modeSwitch -> mode', mcc, mode);
        if (mode == 'preview') {
            document.querySelectorAll('body')[0].classList.add('darkBody');
            this.setState({ mode: mode, slides: slides });
        }
        else {
            document.querySelectorAll('body')[0].classList.remove('darkBody');
            this.setState({ mode: mode, slides: null });
        }
    }

    public render() {

        const editPivot_style = this.state.mode == 'preview' ? { display: 'none' } : {};

        return (
            <div className='appWrap'>
                <div style={editPivot_style}>
                    <EditPivot
                        handler={this.handler_modeSwitch}
                        context={this.props.context}
                    />
                </div>
                {this.state.mode == 'preview' &&
                    <Slider
                        slides={this.state.slides}
                        handler={this.handler_modeSwitch}
                    />
                }
            </div>
        );
    }
}

export default App;