import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';

const css = classNames.bind(styles);

const Button = () => (
  <div className={css('sidebar')}>
    1
  </div>
);

export default Button;
