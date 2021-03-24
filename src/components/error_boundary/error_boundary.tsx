import React, { Component } from 'react';

export class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(): void {
    this.setState({
      hasError: true
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div className="error-boundary"></div>;
    }

    return this.props.children;
  }
}
