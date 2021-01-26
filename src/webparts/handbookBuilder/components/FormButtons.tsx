import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { colors, def_form_buttons_items, def_form_buttons_farItems } from './definitions';
// import styles from './FormTab.module.scss';


const mcc = 'color:aqua;';


export interface FormButtonsProps {
    handler: any;
    isFirstTab: boolean;
    isLastTab: boolean;
}

export interface FormButtonsState {

}

class FormButtons extends React.Component<FormButtonsProps, FormButtonsState> {
    constructor(props: FormButtonsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { /* theme, dark,  */handler, isFirstTab, isLastTab } = this.props;
        // console.log('%c : FormButtons -> render -> isFirstTab', mcc, isFirstTab);
        // console.log('%c : FormButtons -> render -> isLastTab', mcc, isLastTab);

        const itemStyles = {
            // root: {
            //     backgroundColor: 'none',
            //     // width: 700,
            //     // marginLeft: 100,
            //     // marginTop: 50,
            // },
            // primarySet: { background: 'none' },
            // secondarySet: { background: 'none' },
            // rootHovered: { backgroundColor: colors.black.b5 },
            icon: { color: colors.mint },
            iconHovered: { color: colors.navy },
            // label: { color: colors.black.b9 },
            // labelHovered: { color: colors.gray.c },
        };

        const styles_commandBar = {
            root: {
                backgroundColor: 'transparent',
                marginLeft: 100,
                marginTop: 50,
                width: 700,
                selectors: {
                    '& .ms-Button': {
                        backgroundColor: 'transparent',
                    }
                }
            },
            // primarySet: {
            //     backgroundColor: 'transparent',
            // },
            // secondarySet: {
            //     backgroundColor: 'transparent',
            // },
        };


        const CustomButton: React.FunctionComponent<IButtonProps> = (props: any) => {
            // console.log('%c : TopMenu -> render -> props', mcc, props);
            return (
                <CommandBarButton
                    {...props}
                    onClick={e => handler(e, props.button_id)}
                    styles={{
                        ...props.styles,
                        ...itemStyles
                    }}
                // className={styles. }
                />
            );
        };


        return (
            <CommandBar
                items={[{
                    key: 'prev',
                    button_id: 'prev',
                    text: 'Previous Form',
                    iconProps: { iconName: 'Back' },
                    disabled: this.props.isFirstTab
                }]}
                // overflowItems={def_top_menu_overflowItems}
                // overflowButtonProps={overflowProps}
                farItems={[{
                    key: 'next',
                    button_id: 'next',
                    text: 'Next Form',
                    iconProps: { iconName: 'Forward' },// move icon to right
                    disabled: this.props.isLastTab
                }]}
                ariaLabel='Use left and right arrow keys to navigate between commands'
                buttonAs={CustomButton}
                // className={styles.formButtons}
                styles={styles_commandBar}

            />
        );
    }
}

export default FormButtons;