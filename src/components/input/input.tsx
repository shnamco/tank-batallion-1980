import React, { Component } from 'react';
import './input.pcss';

export interface InputProps {
  type: string;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
}

export interface InputState {
  value: string;
  invalid: boolean;
  label: string;
}

export class Input extends Component<InputProps, InputState> {
  state = {
    value: '',
    invalid: false,
    label: ''
  };

  public static defaultProps: InputProps = {
    type: 'text',
    className: 'input',
    disabled: false
  };

  public validate = (): void => {
    if (!this.state.value) {
      this.setState({
        invalid: true,
        label: '-MUST BE PRESENT-  '
      });
    } else {
      this.setState({
        invalid: false,
        label: ''
      });
    }
  };

  public get createClassName(): string {
    if (!this.state.invalid) {
      return 'form-control';
    } else {
      return 'form-control invalid';
    }
  }

  public inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    this.setState({ value });
  };

  public render(): React.ReactElement {
    const { error, ...props } = this.props;
    const { value, label } = this.state;

    return (
      <>
        <div className={this.createClassName}>
          <input {...props} onChange={this.inputHandler} value={value} onBlur={this.validate} />
          <label htmlFor={this.props.className}></label>
          <div className="dash-line">
            <div className="low-dash" />
            <div className="low-dash" />
            <div className="low-dash" />
            <div className="low-dash" />
            <div className="low-dash" />
            <div className="low-dash" />
          </div>
          <span className="form-control__invalid">{label}</span>
          <span className="form-control__error">{error}</span>
        </div>
      </>
    );
  }
}
