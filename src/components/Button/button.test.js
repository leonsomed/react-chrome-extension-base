import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import Button from './index';

describe('Button', () => {
  it('works', () => {
    expect(1).to.equal(1);
  });

  it('works very well', () => {
    render(<Button />);

    expect(1).to.equal(1);
  });
});
