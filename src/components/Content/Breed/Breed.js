import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import BigNumber from 'bignumber.js'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Menu from '../../Menu/Menu'
import styled from 'styled-components'
import ABIs from '../../../config/abis.json'
import * as config from "../../../config/config";

const TextTitle = styled.div`
    color: #FDDA33;
    font-size: 60px;
    text-shadow: 4px 0 0 #000, -4px 0 0 #000, 0 4px 0 #000, 0 -4px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
`

const SubTitle = styled.div`
    color: #F2024C;
    font-size: 30px;
    margin-top: 20px;
    text-shadow: 3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
`

const MBox = styled(Box)`
    text-align: center;
    width: 525px;
    height: 500px;
    font-family: Chewy !important;
    text-transform: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 100px;

    .Mui-disabled {
        background-color: rgba(253,218,51,0.8) !important;
    }

    .MuiCircularProgress-colorInherit {
        color: green !important;
    }

    .MuiLoadingButton-loadingIndicator {
        left: 68%;
    }
`

const SButton = styled(LoadingButton)`
    background-color: #FDDA33 !important;
    border-radius: 10px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 300px;
    width: 90%;
    height: 57px;
`

const Breed = ({ account, provider, chainId, utilInstance, setCrobyList, setAlert, setNotice }) => {
    const [gnomeActive, setGnomeActive] = useState(-1)
    const [gnomideActive, setGnomideActive] = useState(-1)
    const [crognomeList, setCrognomeList] = useState([])
    const [crognomideList, setCrognomideList] = useState([])
    const [loading, setLoading] = useState(false)

    const breedCroNFTs = async () => {
        if (gnomeActive !== -1 && gnomideActive !== -1) {
            setLoading(true)
            try {
                if (await isBreedable() === true) {
                    setNotice(["error", "Sorry, this crognomide is alreay used and not able to breed again"])
                    setAlert(true)
                    setLoading(false)
                    return
                }
                const contract = new ethers.Contract(ABIs[4].address, ABIs[4].abi, provider)
                const instance = contract.connect(provider.getSigner())
                const allowance = await instance["allowance"](account, ABIs[0].address)
                const balance = await instance["balanceOf"](account)
                if (new BigNumber(balance.toString()).lt(new BigNumber(300).times(10 ** 18))) {
                    setNotice(["error", "Sorry, you do not have enough CCL token for breed"])
                    setAlert(true)
                    setLoading(false)
                    return
                }

                if (new BigNumber(allowance.toString()).lt(new BigNumber(300).times(10 ** 18))) {
                    await contract.methods.approve(ABIs[0].address, "300000000000000000000000")
                }
                await utilInstance["breedCroby"](crognomeList[gnomeActive], crognomideList[gnomideActive])
                await getCroNFTList()
                setNotice(["success", "Breeding has done"])
                setAlert(true)
                setLoading(false)
            } catch (e) {
                setNotice(["error", "Sorry, error occured during the transaction"])
                setAlert(true)
                setLoading(false)
            }
        } else {
            setNotice(["error", "Please select crognome and crognomide to breed"])
            setAlert(true)
        }
    }

    const isBreedable = async () => {
        return await utilInstance["crognomidUsed"](crognomideList[gnomideActive])
    }

    const getCroNFTList = async () => {
        setCrognomeList(await getWalletOfOwner(1))
        setCrognomideList(await getWalletOfOwner(2))
        setCrobyList(await getWalletOfOwner(3))
    }

    const getWalletOfOwner = async (index) => {
        const contract = new ethers.Contract(ABIs[index].address, ABIs[index].abi, provider)
        const instance = contract.connect(provider.getSigner())
        return await instance["walletOfOwner"](account)
    }

    // useEffect(() => {
    //     if (account !== undefined && rightChain === true) {
    //         getCroNFTList()
    //     }
    // }, [account, rightChain])

    return (
        <MBox>
            <Box>
                <TextTitle>Breed Your Croby</TextTitle>
                <SubTitle>Required: 300 CCL</SubTitle>
            </Box>
            <Menu title='SELECT YOUR CROGNOME'
                name='CROGNOME'
                items={crognomeList}
                active={gnomeActive}
                setActive={setGnomeActive}
                // disabled={loading && rightChain}
                disabled
            />
            <Menu title='SELECT YOUR CROGNOMIDE'
                name='CROGNOMIDE'
                items={crognomideList}
                active={gnomideActive}
                setActive={setGnomideActive}
                // disabled={loading && rightChain}
                disabled
            />
            <SButton loading={loading}
                onClick={breedCroNFTs}
                // disabled={!rightChain}
                disabled
            >
                BREED</SButton>
        </MBox>
    )
}

export default Breed