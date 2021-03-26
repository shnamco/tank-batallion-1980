import React from 'react';
import './underline.pcss';

export interface UnderlineProps {
  count?: number;
}

export const Underline: React.FC<UnderlineProps> = ({ count }) => {
  function renderUnderline() {
    if (!count) {
      return;
    }

    const underline = [];

    for (let i = 0; i < count; i++) {
      const dash = <div className="low-dash" key={i} />;

      underline.push(dash);
    }

    return underline;
  }

  return <div className="dash-line">{renderUnderline()}</div>;
};
