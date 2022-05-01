import React from 'react';  
import { render, screen } from '@testing-library/react'; 
import Navbar from './Navbar'; // component to test
test('render profile link', () => {
  render(<Navbar />);
  expect(screen.getByText(/profile/)).toBeInTheDocument();
})
