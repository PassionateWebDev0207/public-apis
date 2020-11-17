import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const PageHeader = () => {
  const pages = [
    { to: '/', name: 'PageOne' },
    { to: '/page-two', name: 'PageTwo' },
    { to: '/page-three', name: 'PageThree' }
  ]
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])
  
  return (
    <AppHeader>
      {pages.map(page => (
        <Link to={page.to} key={page.to}>
          <Button
            variant={currentPath === page.to ? 'primary' : 'light'}
            onClick={() => setCurrentPath(page.to)}
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </AppHeader>
  )
}

const AppHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  > a {
    margin-left: 10px;
  }
`;

export default React.memo(PageHeader);