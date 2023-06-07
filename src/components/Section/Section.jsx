import React from 'react';
import PropTypes from 'prop-types';
import Css from './Section.module.css'

export function Section({ title, children }) {
  return (
    <>
      <div className={Css.section}>
        {children}
      </div>
    </>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
