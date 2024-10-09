import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
        color: '#CDEF73',
      }}
      spin
    />
);

let requestCount = 0
export const showLoading = () => {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(
        <div style={{zIndex:'9999',position:'fixed',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,0.5)'}}>
          <Spin indicator={antIcon} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%, -50%)'}} size="large"/>
        </div>,dom)
    }
    requestCount++;
}
export const hideLoading = () => {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}