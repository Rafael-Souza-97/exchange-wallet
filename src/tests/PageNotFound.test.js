import React from 'react';
import { screen } from '@testing-library/react';
import PageNotFound from '../pages/PageNotFound';
import renderWthRouterAndRedux from './helpers/renderWith';

describe('Teste a page "PageNotFound.js"', () => {
  test('Teste se a página contém um heading "h2" com "Page not found"', () => {
    renderWthRouterAndRedux(<PageNotFound />);
    const notFoundMessage = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFoundMessage).toBeInTheDocument();
  });
});
