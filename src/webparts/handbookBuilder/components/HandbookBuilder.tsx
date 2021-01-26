import * as React from 'react';
// import styles from './HandbookBuilder.module.scss';
import { IHandbookBuilderProps } from './IHandbookBuilderProps';
import App from './App';

export default class HandbookBuilder extends React.Component<IHandbookBuilderProps, {}> {
  public render(): React.ReactElement<IHandbookBuilderProps> {
    return (
      <App context={this.props.context} />
    );
  }
}
