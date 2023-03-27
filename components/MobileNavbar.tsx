import React, { useRef } from 'react';
import {
    Box,
    IconButton,
    Typography,
    List,
    ListItem,
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
} from '@mui/material';
import { Menu, Dashboard, Hub, PersonOutlined, SwapHoriz } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useMe } from '@/src/hooks/useAccount';
import { useDisconnect } from 'wagmi';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MobileNavbar = () => {
    const router = useRouter();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const { disconnectAsync } = useDisconnect();

    const { user, mutateUser } = useMe();

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        mutateUser();
        await disconnectAsync();
        router.push('/');
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
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
            <List>
                <ListItem
                    disablePadding
                    style={{ borderLeft: router.pathname === '/' ? '3px solid #405BBB' : undefined }}
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
                    style={{ borderLeft: router.pathname === '/swap' ? '3px solid #405BBB' : undefined }}
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
                        borderLeft: router.pathname === '/bridge' ? '3px solid #405BBB' : undefined,
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
        </Box>
    );

    return (
        <nav style={{ padding: '5%', backgroundColor: '#1E1F24' }}>
            <div
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Typography variant="h2">Crypto Tools</Typography>
                <IconButton onClick={toggleDrawer('right', true)}>
                    <Menu />
                </IconButton>
            </div>
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1E1F24',
                    },
                }}
            >
                {list('right')}
            </Drawer>
        </nav>
    );
};

export default MobileNavbar;
