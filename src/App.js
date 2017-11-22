import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import {
  createSyncCategories,
  createSyncCustomers,
  createSyncInventories,
  createSyncOrders,
  createSyncProducts,
  createSyncProductDiscounts,
  createSyncDiscountCodes,
  createSyncCustomerGroup,
  createSyncCartDiscounts,
} from '@commercetools/sync-actions';
import './App.css';

const ACTIONS_VIEWS = {
  PLAIN: 'PLAIN',
  INSPECTOR: 'INSPECTOR',
};

const format = data => JSON.stringify(data, null, 2);

const parseAndFormat = str => {
  try {
    const parsed = JSON.parse(str);
    return format(parsed);
  } catch (e) {
    return str;
  }
};

class FormatButton extends Component {
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

class ClearButton extends Component {
  static propTypes = {
    onClear: PropTypes.func.isRequired,
  };
  render() {
    return <button onClick={() => this.props.onClear()}>Clear</button>;
  }
}

class App extends Component {
  state = {
    type: 'createSyncProducts',
    before: '{"name":{"en":"Hajo"}}',
    now: '{"name":{"en":"ojaH"}}',
    actionsView: ACTIONS_VIEWS.PLAIN,
  };
  handleStagedChange = event => {
    this.setState({ before: event.target.value });
  };
  handleDraftChange = event => {
    this.setState({ now: event.target.value });
  };
  getValue = () => {
    let before;
    let now;
    try {
      before = JSON.parse(this.state.before);
    } catch (e) {
      return { error: 'Could not parse "before"' };
    }
    try {
      now = JSON.parse(this.state.now);
    } catch (e) {
      return { error: 'Could not parse "now"' };
    }
    switch (this.state.type) {
      case 'createSyncCategories': {
        const syncProducts = createSyncCategories();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncCustomers': {
        const syncProducts = createSyncCustomers();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncInventories': {
        const syncProducts = createSyncInventories();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncOrders': {
        const syncProducts = createSyncOrders();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncProducts': {
        const syncProducts = createSyncProducts();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncProductDiscounts': {
        const syncProducts = createSyncProductDiscounts();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncDiscountCodes': {
        const syncProducts = createSyncDiscountCodes();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncCustomerGroup': {
        const syncProducts = createSyncCustomerGroup();
        return { data: syncProducts.buildActions(before, now) };
      }
      case 'createSyncCartDiscounts': {
        const syncProducts = createSyncCartDiscounts();
        return { data: syncProducts.buildActions(before, now) };
      }
      default:
        return { error: `Unknown service "${this.state.type}"` };
    }
  };
  render() {
    const value = this.getValue();
    const areAllInputsFilled =
      this.state.before.length > 0 && this.state.now.length > 0;
    console.log(areAllInputsFilled);
    return (
      <div className="container">
        <div>
          <h1>Sync Action Visualizer</h1>
          <a
            href="https://commercetools.github.io/nodejs/sdk/api/syncActions.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
        <div>
          <select
            value={this.state.type}
            onChange={event => {
              this.setState({ type: event.target.value });
            }}
          >
            <option value="createSyncCategories">Categories</option>
            <option value="createSyncCustomers">Customers</option>
            <option value="createSyncInventories">Inventories</option>
            <option value="createSyncOrders">Orders</option>
            <option value="createSyncProducts">Products</option>
            <option value="createSyncProductDiscounts">
              Product Discounts
            </option>
            <option value="createSyncDiscountCodes">Discount Codes</option>
            <option value="createSyncCustomerGroup">Customer Group</option>
            <option value="createSyncCartDiscounts">Cart Discounts</option>
          </select>
        </div>
        <div className="io">
          <div className="in">
            <div>
              <h3>Before</h3>
              <FormatButton
                value={this.state.before}
                onChange={formatted => {
                  this.setState({ before: formatted });
                }}
              />
              <ClearButton
                onClear={() => {
                  this.setState({ before: '' });
                }}
              />
              <textarea
                value={this.state.before}
                onChange={this.handleStagedChange}
              />
            </div>
            <div>
              <h3>Now</h3>
              <FormatButton
                value={this.state.now}
                onChange={formatted => {
                  this.setState({ now: formatted });
                }}
              />
              <ClearButton
                onClear={() => {
                  this.setState({ now: '' });
                }}
              />
              <textarea
                value={this.state.now}
                onChange={this.handleDraftChange}
              />
            </div>
          </div>
          {areAllInputsFilled && (
            <div id="out">
              <h3>Actions</h3>
              <label htmlFor="plainActionsView">
                <input
                  type="radio"
                  id="plainActionsView"
                  name="actionsView"
                  checked={this.state.actionsView === ACTIONS_VIEWS.PLAIN}
                  value={ACTIONS_VIEWS.PLAIN}
                  onChange={e => {
                    console.log(e);
                    this.setState({ actionsView: ACTIONS_VIEWS.PLAIN });
                  }}
                />{' '}
                Plain
              </label>

              <label htmlFor="inspectorActionsView">
                <input
                  type="radio"
                  id="inspectorActionsView"
                  name="actionsView"
                  checked={this.state.actionsView === ACTIONS_VIEWS.INSPECTOR}
                  value={ACTIONS_VIEWS.INSPECTOR}
                  onChange={e => {
                    console.log(e);
                    this.setState({ actionsView: ACTIONS_VIEWS.INSPECTOR });
                  }}
                />{' '}
                Inspector
              </label>

              {value.error ? (
                <div>
                  <code>{value.error}</code>
                </div>
              ) : (
                <div>
                  {this.state.actionsView === ACTIONS_VIEWS.PLAIN && (
                    <textarea value={format(value.data)} disabled={true} />
                  )}
                  {this.state.actionsView === ACTIONS_VIEWS.INSPECTOR && (
                    <Inspector
                      data={value.data}
                      filterOptions={{ ignoreCase: true }}
                      isExpanded={() => true}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
