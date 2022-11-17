import Button from '@mui/material/Button'
import styled from 'styled-components'
import Logo from '../../assets/logo.png'

const Wrapper = styled.div`
    background-color: #F4CACA;
    width: 100%;
`

const HiDiscord = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    height: 345px;
    border-top: 5px solid;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 0px;
`

const Social = styled.div`
    background-color: rgba(7, 2, 19, 0.9);
    height: 300px;
    text-align: center;
    padding: 50px 0px;
`

const TextField = styled.div`
    font-family: Chewy;
    font-style: normal;
    font-weight: normal;
    text-transform: capitalize;
    font-size: 16px;
    color: #EDEDED;
`

const MButton = styled(Button)`
    background-color: #ECCB2E !important;
    border-radius: 10px !important;
    color: white !important;
    font-family: Chewy !important;
    font-size: 18px !important;
    line-height: 14px !important;
    padding: 36px 12px !important;
    width: 176px;
    height: 55px;
    text-transform: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
`

const Footer = () => {
    return (
        <Wrapper>
            <HiDiscord>
                <TextField style={{ fontSize: '20px' }}>
                    Do you know where your Crypto cards actually come from?
                </TextField>
                <TextField style={{ fontSize: '50px', color: '#7767C7' }}>
                    Come say hi to the early birds in the discord
                </TextField>
                <MButton>
                    Meet The Crognomes
                </MButton>
            </HiDiscord>
            <Social>
                <img src={Logo} style={{ width: 218, height: 70 }} alt="logo" />
                <TextField style={{ fontFamily: 'Montserrat', marginTop: 40, lineHeight: '26px' }}>Copyright © CROGNOMES 2021</TextField>
                <TextField style={{ fontFamily: 'Montserrat', lineHeight: '26px' }}>*Not affiliated with crypto.com</TextField>
            </Social>
        </Wrapper>
    )
}

export default Footer