import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import * as walletMetamask from "../../helpers/wallet-metamask"
import * as walletConnect from "../../helpers/wallet-connect"
import * as walletDefiwallet from "../../helpers/wallet-defiwallet"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 350,
    width: '70%',
    backgroundColor: 'rgba(196,196,196,0.7)',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

const header = {
    fontSize: '25px',
    fontWeight: 600,
    fontFamily: 'Chewy',
    color: '#280D5f',
}

const button = {
    marginTop: 2,
    fontSize: 20,
    fontFamily: 'Chewy',
    background: 'rgba(253,218,51,0.8)',
    '&:hover': {
        background: 'rgba(253,218,158,0.8)'
    },
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'space-between'
}

export default function KeepMountedModal(props) {
    const handleClose = () => props.setOpen(false);
    let wallet = null;

    const onConnect = async (connector) => {
        props.setOpen(false)
        switch (connector) {
            case 'metamask':
                wallet = await walletMetamask.connect()
                break;
            case 'walletconnect':
                wallet = await walletConnect.connect()
                break;
            default:
                wallet = await walletMetamask.connect()
        }
        if (wallet !== null) props.setWallet(wallet)
    }

    return (
        <div>
            <Modal
                keepMounted
                open={props.open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={header}>
                        Connect Wallet
                    </Typography>
                    <Button fullWidth sx={button} onClick={() => onConnect('metamask')}>
                        <img src="/images/metamask.svg" width="30" height="30" style={{ marginRight: 10 }} />
                        Metamask
                    </Button>
                    <Button fullWidth sx={button} onClick={() => onConnect('walletconnect')}>
                        <img src="/images/walletconnect.svg" width="30" height="30" style={{ marginRight: 10 }} />
                        Wallet Connect
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}