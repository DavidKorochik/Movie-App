import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand'
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://korochik-weather-app.herokuapp.com/">
                <img width="50" height="50" />
            </Wrapper>
        );
    }
}

export default Logo;