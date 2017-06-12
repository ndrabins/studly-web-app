import React from 'react';
// import { withRR4, Nav, NavText } from 'react-sidenav';
import { BrowserRouter as Router, Route } from 'react-router-dom';




import styled from 'styled-components';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';

// const SideNav = withRR4();
const Icon20 = (props) => (<SvgIcon size={props.size || 20} icon={props.icon} />);

const BaseContainer = props => <div style={{display: 'inline-block', paddingTop: 16, paddingBottom: 16, fontFamily: 'Roboto', width: 240, ...props.style}}>{props.children}</div>;

const Title = styled.div`
    padding: 12px;    
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = (props) => {
    return (
        <SeparatorTitleContainer>
            { props.children }
            <hr style={{border: 0, borderTop: '1px solid #E5E5E5'}}/>
        </SeparatorTitleContainer>
    );
};

const SideNavBar = () => (
    <SideNav highlightBgColor='#00bcd4' defaultSelected='sales'>
            <Title> Basic SideNav </Title>
            <Nav id='dashboard'>
                <NavIcon><Icon20 icon={ic_aspect_ratio}/></NavIcon><NavText> Dashboard </NavText>
            </Nav>
    </SideNav>
);

export default SideNavBar;