import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GROUPS = { BLACK: 'black', WHITE: 'white' };

export default class ActionGroupSelection extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        group: PropTypes.oneOf(['black', 'white']),
      })
    ).isRequired,
  };
  state = {
    addGroup: null,
    addType: '',
  };
  render() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (!this.state.addType) {
              alert('Missing type');
              return;
            }
            if (!this.state.addGroup) {
              alert('Missing group');
              return;
            }
            if (
              this.props.value.some(
                actionGroup => actionGroup.type === this.state.addType
              )
            ) {
              alert('An action group with this type already exists');
              return;
            }

            this.props.onChange([
              ...this.props.value,
              { type: this.state.addType, group: this.state.addGroup },
            ]);
            this.setState({ addType: '', addGroup: null });
          }}
        >
          Action Groups{' '}
          <input
            type="text"
            value={this.state.addType}
            placeholder="Type"
            onChange={event => {
              this.setState({ addType: event.target.value });
            }}
          />
          <label htmlFor="add-black">
            <input
              type="radio"
              id="add-black"
              name="add-group"
              checked={this.state.addGroup === GROUPS.BLACK}
              value={GROUPS.BLACK}
              onChange={() => {
                this.setState({ addGroup: GROUPS.BLACK });
              }}
            />{' '}
            Black
          </label>
          <label htmlFor="add-white">
            <input
              type="radio"
              id="add-white"
              name="add-group"
              checked={this.state.addGroup === GROUPS.WHITE}
              value={GROUPS.WHITE}
              onChange={() => {
                this.setState({ addGroup: GROUPS.WHITE });
              }}
            />{' '}
            White
          </label>
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.props.value.map((actionGroup, index) => {
            return (
              <li key={actionGroup.type}>
                {actionGroup.type}{' '}
                <label htmlFor={`group-black-${index}`}>
                  <input
                    type="radio"
                    id={`group-black-${index}`}
                    name={`group-${index}`}
                    checked={actionGroup.group === GROUPS.BLACK}
                    value={GROUPS.BLACK}
                    onChange={() => {
                      this.props.onChange([
                        ...this.props.value.slice(0, index),
                        { ...actionGroup, group: GROUPS.BLACK },
                        ...this.props.value.slice(index + 1),
                      ]);
                    }}
                  />{' '}
                  Black
                </label>
                <label htmlFor={`group-white-${index}`}>
                  <input
                    type="radio"
                    id={`group-white-${index}`}
                    name={`group-${index}`}
                    checked={actionGroup.group === GROUPS.WHITE}
                    value={GROUPS.WHITE}
                    onChange={() => {
                      this.props.onChange([
                        ...this.props.value.slice(0, index),
                        { ...actionGroup, group: GROUPS.WHITE },
                        ...this.props.value.slice(index + 1),
                      ]);
                    }}
                  />{' '}
                  White
                </label>
                <button
                  onClick={() => {
                    this.props.onChange([
                      ...this.props.value.slice(0, index),
                      ...this.props.value.slice(index + 1),
                    ]);
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
