import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Main = styled.div`
    display: flex;
    vertical-align: center;
`;

export default () => {

    return (
        <Main>
            <form>
                <div>
                    Login <input type="text" name="username"/>
                </div>
                <div>
                    Password <input type="password" name="password"/>
                </div>
            </form>
            <Link to="/signup">Don't have an account? Register here.</Link>
        </Main>
    );
}