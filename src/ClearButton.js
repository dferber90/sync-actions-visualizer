import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClearButton extends Component {
  static propTypes = {
    onClear: PropTypes.func.isRequired,
  };
  render() {
    return <button onClick={() => this.props.onClear()}>Clear</button>;
  }
}
