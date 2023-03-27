import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import { Dashboard, Hub, PersonOutlined, SwapHoriz } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi';
import { useMe } from '@/src/hooks/useAccount';

const DesktopNavbar = () => {
    const router = useRouter();

    const { disconnectAsync } = useDisconnect();

    const { user, mutateUser } = useMe();

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        mutateUser();
        await disconnectAsync();
        router.push('/');
    };

    return (
        <nav
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                top: 0,
                left: 0,
                width: '250px',
                position: 'fixed',
                backgroundColor: '#1E1F25',
            }}
        >
            <div style={{ marginTop: '70px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                {user && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <PersonOutlined style={{ fontSize: '40px' }} />
                        <Typography>{`${user?.account?.substring(0, 4)}...${user?.account?.substring(
                            user?.account?.length - 4
                        )}`}</Typography>
                        <Button onClick={() => logout()}>Logout</Button>
                    </div>
                )}
            </div>
            <List style={{ marginTop: '60px' }}>
                <ListItem
                    disablePadding
                    style={{ borderRight: router.pathname === '/' ? '3px solid #405BBB' : undefined }}
                >
                    <ListItemButton onClick={() => router.push('/')}>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Portfolio" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    style={{ borderRight: router.pathname === '/swap' ? '3px solid #405BBB' : undefined }}
                >
                    <ListItemButton onClick={() => router.push('/swap')}>
                        <ListItemIcon>
                            <SwapHoriz />
                        </ListItemIcon>
                        <ListItemText primary="Swap" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    style={{
                        borderRight: router.pathname === '/bridge' ? '3px solid #405BBB' : undefined,
                    }}
                >
                    <ListItemButton onClick={() => router.push('/bridge')}>
                        <ListItemIcon>
                            <Hub />
                        </ListItemIcon>
                        <ListItemText primary="Bridge" />
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    );
};

export default DesktopNavbar;
