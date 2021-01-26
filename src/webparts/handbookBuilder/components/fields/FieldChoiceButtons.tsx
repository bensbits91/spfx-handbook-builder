import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { colors } from '../definitions';
import hexToRgba from 'hex-to-rgba';

import styles from './FieldChoiceButtons.module.scss';

const mcc = 'color:lime;';







export interface FieldChoiceButtonsProps {
    field: any;
    handler?: any;
    dark?: boolean;
    theme?: any;
    slideId?: number;
}

export interface FieldChoiceButtonsState {
    selectedKey: string;
}


class FieldChoiceButtons extends React.Component<FieldChoiceButtonsProps, FieldChoiceButtonsState> {
    constructor(props: FieldChoiceButtonsProps) {
        super(props);
        this.state = {
            selectedKey: null
        };
    }

    public onChange_option(choice) {
        // this.props.handler(this.props.slideId, this.props.field, choice);
        this.setState({ selectedKey: makeKey(choice) });
    }

    public render() {
        const { field, dark, theme } = this.props;
        const choices = field.Choices;
        const isCompact = choices.length > 3;

        const options = choices.map(c => {
            const itsMe = this.state.selectedKey == makeKey(c);

            const style_choiceGroup = {
                root: {
                    float: isCompact ? 'left' : 'none',
                    marginRight: isCompact ? 10 : 0
                },
                choiceFieldWrapper: {
                    backgroundColor: hexToRgba(itsMe ? colors.yellow : colors.mint, itsMe ? .9 : .7),
                    padding: isCompact ? 20 : 40,
                    width: isCompact ? 300 : 250,
                    selectors:
                    {
                        '&:hover': {
                            backgroundColor: hexToRgba(colors.yellow, itsMe ? 1 : .7),
                        },
                        '& *': {
                            color: colors.navy,
                        }
                    }
                },
                field: {
                    color: itsMe ? colors.navy : colors.gray.c,
                },
                input: {
                    cursor: 'pointer'
                },
            }



            return (
                {
                    key: makeKey(c),
                    text: c,
                    styles: style_choiceGroup,
                    // className: styles.ChoiceGroup,
                    onChange: e => this.onChange_option(c)
                }
            );
        });

        return (
            <>
                <ChoiceGroup
                    options={options}
                    selectedKey={this.state.selectedKey}
                    className={styles.ChoiceButtons}
                />
            </>
        );
    }
}




// how do i move this to separate files?????????????????????
function makeKey(string) {
    return string.replace(/ /g, '');
}

export default FieldChoiceButtons;