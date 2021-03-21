import React, { Component } from 'react';
import './input.pcss';

export interface InputProps {
  type: string;
  placeholder?: string;
  className?: string;
}

export interface InputState {
  value: string;
}

class Input extends Component<InputProps, InputState> {
  state = {
    value: ''
  };

  public static defaultProps: InputProps = {
    type: 'text',
    className: 'input'
  };

  public inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    this.setState({ value });
  };

  public render(): React.ReactElement {
    return (
      <>
        <input
          className={this.props.className}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.inputHandler}
          value={this.state.value}
        />
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
