import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const HeaderWrapper = styled.div`
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e9eced;
    color: #676d73;
    height: 60px;
    
    @media (max-width: 768px) {
        display: none
    }
`;

const Logo = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
`;

const Links = styled.div`
    display: flex;
    
    a {
        color: #676d73;
        padding: 0 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    
    a:hover {
        box-shadow: inset 0 -2px 0 #d3d4d5;
        color: #2f3033;
    }
`;

const MobileHeader = styled.header`
    display: none;
    justify-content: space-between;
    border-bottom: 1px solid #e9eced;
    color: #676d73;
    height: 60px;
    
    @media (max-width: 768px) {
        display: flex;
    }
`;

const MenuHead = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
    z-index: 1;
`;

const MenuList = styled.div`
    position: fixed;
    transform: ${props => props.open ? "translateY(60px)" : "translateY(-100%)"};
    transition: transform .2s ease-in;
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    font-size: 20px;
    font-weight: 800;
    color: black;
    
    ul {
        list-style-type: none;
    }
    
    li {
        padding-bottom: 20px;
    }
`;

export default () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <HeaderWrapper>
            <Header>
                <Logo>
                    <Link to="/">
                        <img height="17px" width="197px" src={require("../app/logo.png")} alt="Logo"/>
                    </Link>
                </Logo>

                <Links>
                    <Link to="/auth/signup">Join as a photographer</Link>
                    <Link to="/auth/signup">Sign up</Link>
                    <Link to="/auth/login">Login</Link>
                </Links>
            </Header>

            <MobileHeader>
                <MenuHead>
                    <button onClick={toggleMobileMenu}>
                        <img height="17px" width="197px" src={require("../app/logo.png")} alt="Logo"/>
                        <img src={require(isMobileMenuOpen ? './up-arrow.svg' : './down-arrow.svg')}
                             alt=""
                             style={{marginLeft: '10px', height: '13px', width: '13px'}}
                        />
                    </button>
                </MenuHead>
                <MenuList open={isMobileMenuOpen}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/auth/login">Join as a photographer</Link></li>
                        <li><Link to="/auth/signup">Sign up</Link></li>
                        <li><Link to="/auth/login">Log in</Link></li>
                    </ul>
                </MenuList>
            </MobileHeader>
        </HeaderWrapper>
    )
}