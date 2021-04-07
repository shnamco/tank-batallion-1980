import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '@store/auth/auth.selectors';
import { RootState } from '@store/store';

interface PrivateProps {
  isLoggedIn: boolean;
}

// eslint-disable-next-line
class PrivateComponent extends React.PureComponent<any> {
  public render(): React.ReactElement {
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      return <>{this.props.children}</>;
    }

    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state: RootState): PrivateProps => {
  return {
    isLoggedIn: isLoggedIn(state)
  };
};
export const Private = connect(mapStateToProps)(PrivateComponent);
