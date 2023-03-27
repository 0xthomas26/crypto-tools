import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return <div>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</div>;
};

export default Navbar;
