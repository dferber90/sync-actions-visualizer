import React, { Component } from 'react';
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import './App.css';
import FormatButton from './FormatButton';
import ExampleDataButton from './ExampleDataButton';
import ClearButton from './ClearButton';
import ActionGroupSelection from './ActionGroupSelection';
import { parse, format, getSyncActions } from './utils';
import pkg from '../package.json';

const ACTIONS_VIEWS = {
  PLAIN: 'PLAIN',
  INSPECTOR: 'INSPECTOR',
};

const stateToConfig = state => ({
  shouldOmitEmptyString: state.shouldOmitEmptyString === 'yes',
});

const initialType = 'createSyncProducts';

class App extends Component {
  state = {
    type: initialType,
    before: format({ name: { en: 'Hajo' } }),
    now: format({ name: { en: 'ojaH' } }),
    actionsView: ACTIONS_VIEWS.PLAIN,
    actionGroups: [],
    shouldOmitEmptyString: 'no',
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
      before = parse(this.state.before);
    } catch (e) {
      return { source: 'before', error: e.toString() };
    }
    try {
      now = parse(this.state.now);
    } catch (e) {
      return { source: 'now', error: e.toString() };
    }
    return getSyncActions({
      now,
      before,
      type: this.state.type,
      actionGroups: this.state.actionGroups,
      config: stateToConfig(this.state),
    });
  };
  render() {
    const value = this.getValue();
    const areAllInputsFilled =
      this.state.before.length > 0 && this.state.now.length > 0;
    const version = pkg.dependencies['@commercetools/sync-actions'];

    return (
      <div className="container">
        <div>
          <h1>Sync Actions Visualizer</h1>
          <a
            href="https://commercetools.github.io/nodejs/sdk/api/syncActions.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
          <pre>@commercetools/sync-actions v{version}</pre>
        </div>
        <div>
          Service{' '}
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
        <div>
          <div className="action-groups">
            <ActionGroupSelection
              value={this.state.actionGroups}
              onChange={actionGroups => {
                this.setState({ actionGroups });
              }}
            />
          </div>
          <div className="options">
            <code>shouldOmitEmptyString</code>{' '}
            <select
              value={this.state.shouldOmitEmptyString}
              onChange={event => {
                this.setState({ shouldOmitEmptyString: event.target.value });
              }}
            >
              <option value="no">No (default)</option>
              <option value="yes">Yes</option>
            </select>
            <div>
              <small>
                Note that <code>shouldOmitEmptyString</code> only works with{' '}
                <code>Product Types</code> so far.
              </small>
            </div>
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
                />{' '}
                <ExampleDataButton
                  type={this.state.type}
                  onClick={data => this.setState({ before: format(data) })}
                />
                <div className="clear-button-container">
                  <ClearButton
                    onClear={() => {
                      this.setState({ before: '' });
                    }}
                  />
                </div>
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
                />{' '}
                <ExampleDataButton
                  type={this.state.type}
                  onClick={data => this.setState({ now: format(data) })}
                />
                <div className="clear-button-container">
                  <ClearButton
                    onClear={() => {
                      this.setState({ now: '' });
                    }}
                  />
                </div>
              </div>
              <textarea
                value={this.state.now}
                onChange={this.handleNowChange}
              />
            </div>
          </div>
          {areAllInputsFilled && (
            <div className="out">
              <h3>Generated Actions</h3>
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

              {(() => {
                if (value.error) {
                  if (typeof value.error === 'string')
                    return (
                      <div style={{ padding: 2 }}>
                        Could not parse <code>{value.source}</code>
                        <pre>{value.error}</pre>
                      </div>
                    );
                  else
                    return (
                      <div style={{ padding: 2 }}>
                        Could not generate sync actions. See console for more
                        information.
                      </div>
                    );
                }

                return (
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
                );
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
