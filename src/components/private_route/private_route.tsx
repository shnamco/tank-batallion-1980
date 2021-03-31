import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthService } from '@service/auth_service';

export class Private extends PureComponent {
  public render(): React.ReactElement {
    const authService = new AuthService();

    if (authService.auth) {
      return <>{this.props.children}</>;
    }

    return <Redirect to="/login" />;
  }
}
