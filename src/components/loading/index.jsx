import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CssSprite from './loading';
import AnimateImg from '../../assets/util/loading.png'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.sprite = React.createRef()
    }
    render() {
        let webProps = {
            paused: false,
            loop: 1,
            // 如果frames没有定义宽度，可以在css中定义
            frames: [[1,1,107,86],[110,1,107,86],[219,1,107,86],[328,1,107,86],[1,89,107,86],[110,89,107,86],[219,89,107,86],[328,89,107,86],[1,177,107,86],[110,177,107,86],[219,177,107,86],[328,177,107,86],[1,265,107,86],[110,265,107,86],[219,265,107,86],[328,265,107,86],[1,353,107,86],[110,353,107,86],[219,353,107,86],[328,353,107,86]],
        }
        return (
            <LoadingWapper>
                <LoadingContent>
                    {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> */}
                    <CssSprite
                        images={AnimateImg}
                        {...webProps}
                        style={{ width: "100%", height: "100%", zIndex: 101 }}
                        ref={this.sprite}
                        paused={false}
                        loop={-1}
                      />
                </LoadingContent>
            </LoadingWapper>
        );
    }
}

const LoadingWapper = styled.div`
z-index: 99999;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.6);
`
const LoadingContent = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`
export default withTranslation()(withRouter(Loading));
