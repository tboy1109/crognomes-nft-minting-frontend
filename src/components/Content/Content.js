import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import Grid from '@mui/material/Grid'
import styled from 'styled-components'

import ABIs from '../../config/abis.json'
import Gnomes from '../../assets/gnomes.png'

import Claim from './Claim/Claim'
import Breed from './Breed/Breed'
import Grow from './Grow/Grow'

import * as config from "../../config/config";

const GnomeDiv = styled.div`
    max-width: 730px;
    width: 90%;
    height: 125px;
    background-color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
`

const Content = ({ account, provider, chainId, setAlert, setNotice }) => {
    const [utilInstance, setUtilInstance] = useState(null)
    const [crobyList, setCrobyList] = useState([])

    useEffect(() => {
        if (account !== undefined && chainId === config.configVars.rpcNetwork_mainnet.chainId) {
            const contract = new ethers.Contract(ABIs[0].address, ABIs[0].abi, provider)
            setUtilInstance(contract.connect(provider.getSigner()))
        }
    }, [account, chainId])

    return (
        <>
            <Grid container style={{ justifyContent: 'center', marginTop: 120, height: '100%' }}>
                <Claim account={account}
                    provider={provider}
                    chainId={chainId}
                    utilInstance={utilInstance}
                    setAlert={setAlert}
                    setNotice={setNotice}
                />
                <Breed account={account}
                    provider={provider}
                    chainId={chainId}
                    utilInstance={utilInstance}
                    setCrobyList={setCrobyList}
                    setAlert={setAlert}
                    setNotice={setNotice}
                />
                <Grow account={account}
                    provider={provider}
                    chainId={chainId}
                    utilInstance={utilInstance}
                    crobyList={crobyList}
                    setCrobyList={setCrobyList}
                    setAlert={setAlert}
                    setNotice={setNotice}
                />
            </Grid>
            <GnomeDiv>
                <img src={Gnomes} style={{ width: 271, height: 144, marginTop: -20 }} alt="gnome" />
            </GnomeDiv>
        </>
    )
}

export default Content