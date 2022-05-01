import React from 'react';  
import { render, screen } from '@testing-library/react'; 
import Navbar from '../components/Navbar'; // component to test
const links = [
  { text: 'Logout', location: "/" },
  { text: 'Home', location: "/home" },
  { text: 'Profile', location: "/profile" },
  { text: 'Search', location: "/search" },
  
  //test every link
  test.each(links)(
  "Click the links to check if Nav Bar has %s link.",
  (link) => {
    render(<NavBar />); 
    expect(links).toHaveAttribute("href", link.location);
  }
test('Check if have link to page', () => {
    render(<NavBar />);
    expect(links).toHaveAttribute("href", "/"); 
