import React, { Component } from 'react';
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import { createSyncProducts } from '@commercetools/sync-actions';
import './App.css';

class App extends Component {
  state = {
    type: 'products',
    before: '',
    now: '',
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
      return 'Could not parse "before"';
    }
    try {
      now = JSON.parse(this.state.now);
    } catch (e) {
      return 'Could not parse "now"';
    }
    switch (this.state.type) {
      case 'products': {
        const syncProducts = createSyncProducts();
        return syncProducts.buildActions(before, now);
      }
      default:
        return `Unknown service "${this.state.type}"`;
    }
  };
  render() {
    return (
      <div className="container">
        <div>sync-actions</div>
        <div>
          <select value={this.state.type}>
            <option value="products">Products</option>
          </select>
        </div>
        <div className="io">
          <div className="in">
            <div>
              <h3>Before</h3>
              <textarea
                value={this.props.before}
                onChange={this.handleStagedChange}
              />
            </div>
            <div>
              <h3>Now</h3>
              <textarea
                value={this.props.now}
                onChange={this.handleDraftChange}
              />
            </div>
          </div>
          <div>
            <h3>Actions</h3>
            <Inspector
              data={this.getValue()}
              filterOptions={{ ignoreCase: true }}
              isExpanded={() => true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
