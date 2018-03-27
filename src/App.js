import React, { Component } from 'react';
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import {
  createSyncCategories,
  createSyncCustomers,
  createSyncInventories,
  createSyncOrders,
  createSyncProducts,
  createSyncProductTypes,
  createSyncProductDiscounts,
  createSyncDiscountCodes,
  createSyncCustomerGroup,
  createSyncCartDiscounts,
} from '@commercetools/sync-actions';
import './App.css';
import FormatButton from './FormatButton';
import ClearButton from './ClearButton';
import ActionGroupSelection from './ActionGroupSelection';
import { format } from './utils';
import parseJson from 'parse-json';
import pkg from '../package.json';

const ACTIONS_VIEWS = {
  PLAIN: 'PLAIN',
  INSPECTOR: 'INSPECTOR',
};

class App extends Component {
  state = {
    type: 'createSyncProducts',
    before: '{"name":{"en":"ojaH"}}',
    now: '{"name":{"en":"Hajo"}}',
    actionsView: ACTIONS_VIEWS.PLAIN,
    actionGroups: [],
  };
  handleBeforeChange = event => {
    this.setState({ before: event.target.value });
  };
  handleNowChange = event => {
    this.setState({ now: event.target.value });
  };
  getValue = () => {
    let before;
    let now;
    try {
      before = parseJson(this.state.before);
    } catch (e) {
      return { source: 'before', error: e.toString() };
    }
    try {
      now = parseJson(this.state.now);
    } catch (e) {
      return { source: 'now', error: e.toString() };
    }
    switch (this.state.type) {
      case 'createSyncCategories': {
        const sync = createSyncCategories(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncCustomers': {
        const sync = createSyncCustomers(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncInventories': {
        const sync = createSyncInventories(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncOrders': {
        const sync = createSyncOrders(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncProducts': {
        const sync = createSyncProducts(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncProductTypes': {
        const sync = createSyncProductTypes(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncProductDiscounts': {
        const sync = createSyncProductDiscounts(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncDiscountCodes': {
        const sync = createSyncDiscountCodes(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncCustomerGroup': {
        const sync = createSyncCustomerGroup(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      case 'createSyncCartDiscounts': {
        const sync = createSyncCartDiscounts(this.state.actionGroups);
        return { data: sync.buildActions(now, before) };
      }
      default:
        return { error: `Unknown service "${this.state.type}"` };
    }
  };
  render() {
    const value = this.getValue();
    const areAllInputsFilled =
      this.state.before.length > 0 && this.state.now.length > 0;

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
          <pre>
            @commercetools/sync-actions v{
              pkg.dependencies['@commercetools/sync-actions']
            }
          </pre>
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
            <option value="createSyncProductTypes">Product Types</option>
            <option value="createSyncProductDiscounts">
              Product Discounts
            </option>
            <option value="createSyncDiscountCodes">Discount Codes</option>
            <option value="createSyncCustomerGroup">Customer Group</option>
            <option value="createSyncCartDiscounts">Cart Discounts</option>
          </select>
        </div>
        <div className="action-groups">
          <h3>Action Groups</h3>
          <div>
            <ActionGroupSelection
              value={this.state.actionGroups}
              onChange={actionGroups => {
                this.setState({ actionGroups });
              }}
            />
          </div>
        </div>
        <div className="io">
          <div className="in">
            <div>
              <h3>Before</h3>
              <div>
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
              </div>
              <textarea
                value={this.state.before}
                onChange={this.handleBeforeChange}
              />
            </div>
            <div>
              <h3>Now</h3>
              <div>
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
              </div>
              <textarea
                value={this.state.now}
                onChange={this.handleNowChange}
              />
            </div>
          </div>
          {areAllInputsFilled && (
            <div className="out">
              <h3>Actions</h3>
              <label htmlFor="plainActionsView">
                <input
                  type="radio"
                  id="plainActionsView"
                  name="actionsView"
                  checked={this.state.actionsView === ACTIONS_VIEWS.PLAIN}
                  value={ACTIONS_VIEWS.PLAIN}
                  onChange={e => {
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
                    this.setState({ actionsView: ACTIONS_VIEWS.INSPECTOR });
                  }}
                />{' '}
                Inspector
              </label>

              {value.error ? (
                <div style={{ padding: 2 }}>
                  Could not parse <code>{value.source}</code>
                  <pre>{value.error}</pre>
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
