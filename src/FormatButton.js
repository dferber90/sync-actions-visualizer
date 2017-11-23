import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseAndFormat } from './utils';

export default class FormatButton extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <button
        onClick={() => {
          this.props.onChange(parseAndFormat(this.props.value));
        }}
      >
        Format
      </button>
    );
  }
}
