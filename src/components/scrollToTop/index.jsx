import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

class ScrollToTop extends Component {
    componentDidUpdate(preProps,preState,) {
        if(this.props.location.pathname!==preProps.location.pathname) {
            window.scrollTo(0,0);
        }
    }
    render() {
        return (
            this.props.children
        );
    }
}

export default withTranslation()(withRouter(ScrollToTop));
