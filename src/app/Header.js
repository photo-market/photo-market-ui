import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e9eced;
    color: #676d73;
    height: 60px;
`;

const Logo = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
`;

const Links = styled.div`
    display: flex;
    
    > a {
        color: #676d73;
        padding: 0 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    
    > a:hover {
        box-shadow: inset 0 -2px 0 #d3d4d5;
        color: #2f3033;
    }
`;

export default () => {

    return (
        <Header>
            <Logo>
                <Link to="/">
                    <img height="17px" width="197px" src={require("./logo.png")} alt="Logo"/>
                </Link>
            </Logo>

            <Links>
                <Link to="/signup">Join as a photographer</Link>
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Login</Link>
            </Links>
        </Header>
    )
}