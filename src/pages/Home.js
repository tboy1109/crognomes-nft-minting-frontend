import React, { useState } from 'react'
import styled from 'styled-components'

import Header from '../components/Header/Header'
import Content from '../components/Content/Content'
import Footer from '../components/Footer/Footer'
import WalletConnect from '../components/WalletConnect/WalletConnect'
import CustomizedSnackbars from '../components/Alert/Alert'

const Wrapper = styled.div`
    background-image: url('images/forest.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: Chewy;
    width: 100%;

`

const Shadow = styled.div`
    background-color: rgba(51,51,51,0.58);
    padding-bottom: 100px;
`

const Home = () => {
    const [{ walletProviderName, address, browserWeb3Provider, serverWeb3Provider, connected, chainId }, setWallet] = useState({})
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [notice, setNotice] = useState(["", ""])

    return (
        <div className='top' style={{ height: '100%' }}>
            <Wrapper>
                <Shadow>
                    <CustomizedSnackbars
                        open={alert}
                        setOpen={setAlert}
                        type={notice[0]}
                        message={notice[1]}
                    />
                    <Header
                        account={address}
                        setAlert={setAlert}
                        setNotice={setNotice}
                        setOpen={setOpen}
                    />
                    <Content
                        account={address}
                        provider={browserWeb3Provider}
                        chainId={chainId}
                        setAlert={setAlert}
                        setNotice={setNotice}
                    />
                    <WalletConnect
                        open={open}
                        setOpen={setOpen}
                        setWallet={setWallet}
                    />
                </Shadow>
            </Wrapper>
            <Footer />
        </div>
    )
}

export default Home