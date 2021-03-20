import React, { Component } from 'react';

export interface InputProps {
  type: string;
  placeholder?: string;
}

export interface InputState {
  value: string;
}

class Input extends Component<InputProps, InputState> {
  state = {
    value: ''
  };

  static defaultProps: InputProps = {
    type: 'text'
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    this.setState({ value });
  };

  render(): React.ReactElement {
    return (
      <>
        <input type={this.props.type} placeholder={this.props.placeholder} onChange={this.inputHandler} value={this.state.value} />
        <div className="dash-line">
          <div className="low-dash" />
          <div className="low-dash" />
          <div className="low-dash" />
          <div className="low-dash" />
          <div className="low-dash" />
          <div className="low-dash" />
        </div>
      </>
    );
  }
}

export default Input;
