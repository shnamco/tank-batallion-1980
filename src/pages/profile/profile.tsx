import React from 'react';
import { ProfileForm } from '@pages/profile/components/profile_form';
import './profile.pcss';

export const Profile: React.FC = () => {
  return (
    <div className="arcade__background arcade__background-all arcade-profile">
      <ProfileForm />
    </div>
  );
};
