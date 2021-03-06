import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import SubscriptionPopup from '../../components/ui/SubscriptionPopup';


@inject('stores', 'actions') @observer
export default class SubscriptionPopupScreen extends Component {
  state = {
    complete: false,
  };

  completeCheck(event) {
    const { url } = event;

    if (url.includes('recurly') && url.includes('confirmation')) {
      this.setState({
        complete: true,
      });
    }
  }

  render() {
    return (
      <SubscriptionPopup
        url={this.props.router.params.url}
        closeWindow={() => window.close()}
        completeCheck={e => this.completeCheck(e)}
        isCompleted={this.state.complete}
      />
    );
  }
}


SubscriptionPopupScreen.wrappedComponent.propTypes = {
  router: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
