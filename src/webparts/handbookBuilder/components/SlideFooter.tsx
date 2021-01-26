import * as React from 'react';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

import styles from './Slider.module.scss';
import { colors } from './definitions';



const icon_feedback: IIconProps = {
    iconName: 'Feedback',
    color: colors.yellow
};

const icon_share: IIconProps = {
    iconName: 'Share',
    color: colors.yellow
};



export interface SlideFooterProps {
    theme?: any;
}

export interface SlideFooterState {

}

class SlideFooter extends React.Component<SlideFooterProps, SlideFooterState> {
    constructor(props: SlideFooterProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { theme } = this.props;
        return (
            <div className={styles.footerWrap}>
                <div className='footer-inner'>
                    <div>
                        <ActionButton
                            text='Give us feedback'
                            iconProps={icon_feedback}
                            size={32}
                        />
                    </div>
                    <div>
                        <ActionButton
                            text='Share this module'
                            iconProps={icon_share}
                            size={32}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default SlideFooter;