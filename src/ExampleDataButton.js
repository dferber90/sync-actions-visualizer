import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { exampleDataMap } from './utils';

export default class ExampleDataButton extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  render() {
    return (
      <button
        disabled={!exampleDataMap.hasOwnProperty(this.props.type)}
        onClick={() => {
          const exampleData = exampleDataMap[this.props.type];
          this.props.onClick(exampleData);
        }}
      >
        Use example data
      </button>
    );
  }
}
