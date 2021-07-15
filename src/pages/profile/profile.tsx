import React from 'react';
import { ProfileForm } from './components/profile_form';
import { useKeypress } from '@utils/use_key_press';
import { ROUTE } from '../../interfaces/route';
import { useHistory } from 'react-router-dom';
import './profile.pcss';

export const Profile: React.FC = () => {
  const history = useHistory();

  useKeypress('Escape', () => {
    history.push(ROUTE.MENU);
  });

  return (
    <div className="arcade__background arcade__background-all arcade-profile">
      <div className="arcade__background-content">
        <ProfileForm />
      </div>
    </div>
  );
};
