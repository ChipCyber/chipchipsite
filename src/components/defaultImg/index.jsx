import React, { Component } from "react";
import styled from 'styled-components'
import {isEmpty} from '../../constants/constantsFunction'

class DefaultImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDefault: true,
        }
    }
    handleImageLoaded() {
        this.setState({showDefault:false});
    }
    handleImageErrored() {
        this.setState({showDefault:true});
        // this.setState({
        //     src: require('../../assets/default.png').default
        // });
    }
    render() {
        let props = this.props;
        let {showDefault} = this.state;
        if(isEmpty(props.src)){
            showDefault = true;
        }
        return (
            <Root>
                <BottomImg src={require('../../assets/default.png').default}/>
                {showDefault&&<BottomImg src={require('../../assets/default.png').default}/>}
                <Img {...props}
                    src={props.src}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                />
            </Root>
        );
    }
}
const Root = styled.div`
position: relative;
width: 100%;
height: 100%;
`
const BottomImg = styled.img`
object-fit: cover;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
`
const Img = styled.img`
object-fit: cover;
`

export default DefaultImg;