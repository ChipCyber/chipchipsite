import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router-dom"
import { breakpointMap } from '../../theme/base'
import Counter from './counter'
import './index.scss';
import Store from '../../store'
import { decrement, increment, incrementByAmount, incrementAsync } from '../../store/configSlice'

class Home extends Component {
    state = {
        isMobile: false,
    }
    componentDidMount() {
        window.addEventListener('resize', this.watchChangeSize);
        this.watchChangeSize();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.watchChangeSize);
    }
    watchChangeSize = () => {  
        let w = document.documentElement.clientWidth;
        if(w<breakpointMap.sm){
            this.setState({isMobile: true});
        }else{
            this.setState({isMobile: false});
        }
    }
    render() {
        const {isMobile} = this.state;
        return (
            <Root >
                <div className='content'>Home</div>
                <div>{this.props.count}</div>
                <button onClick={()=>Store.dispatch(this.props.increment())}>+</button>
                <button onClick={()=>Store.dispatch(this.props.decrement())}>-</button>
                <button onClick={()=>Store.dispatch(this.props.incrementByAmount(2))}>+2</button>
                <button onClick={()=>Store.dispatch(this.props.incrementAsync())}>async +1</button>
                <Counter/>
            </Root>
        )
    }
}

const Root = styled.div`
font-size: 16px;
`
const mapStateToProps = (state) => ({
    count: state.counter.value,
});

export default withTranslation()(withRouter(connect(mapStateToProps, { increment, decrement, incrementByAmount, incrementAsync })(Home)));
