import React, { Component } from "react";
import styled from 'styled-components'
import {isEmpty} from '../../constants/constantsFunction'

class ListDefaultImg extends Component {
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
        //     src: require('../../assets/default_list.png').default
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
                {showDefault&&<BottomImg src={require('../../assets/default_list.png').default}/>}
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

export default ListDefaultImg;