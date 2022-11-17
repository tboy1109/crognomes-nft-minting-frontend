import React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const DownIcon = () => {
    return (
        <div>
            <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4001 22.5116C15.7692 23.001 16.3424 23.2942 16.9553 23.3069C17.5682 23.3197 18.1531 23.0506 18.5423 22.5769L31.8731 6.35075C32.3593 5.75888 32.4648 4.94128 32.1447 4.24537C31.8246 3.54947 31.1351 3.09752 30.3693 3.08158L4.39417 2.54112C3.62834 2.52518 2.92068 2.94806 2.57191 3.63005C2.22314 4.31204 2.29453 5.13333 2.75575 5.74491L15.4001 22.5116Z" fill="#FDDA33" stroke="#FDDA33" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

const MButton = styled(Button)`
    background-color: rgba(196,196,196,0.7) !important;
    border-radius: 17px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 400px;
    width: 90%;
    height: 87px;
`

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 400,
        maxwidth: 400,
        backgroundColor: 'transparent',
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            border: '5px solid #000',
            borderRadius: 6,
            marginTop: 3,
            height: 70,
            backgroundColor: 'rgba(196,196,196,0.7)',
            fontFamily: 'Chewy',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 20,
            color: 'white',
            textShadow: '0px 3px rgba(0,0,0,0.4)'
        },
    },
}));

const CustomMenu = ({ title, name, items, active, setActive }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (index) => {
        setAnchorEl(null);
        if (index !== -1) {
            setActive(index)
        }
    };

    return (
        <div>
            <MButton
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<DownIcon />}
            >
                {active === -1 || items.length === 0 ? title : `${name} ${items[active].toString(10)}`}
            </MButton>
            {items.length !== 0 && <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(0)}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem onClick={() => handleClose(index)} key={index} disableRipple>
                            {`${name} ${item.toString(10)}`}
                        </MenuItem>
                    )
                })}
            </StyledMenu>}
        </div>
    );
}

export default CustomMenu