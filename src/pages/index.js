import React from 'react';
import ReactDOM from 'react-dom';

//ts组件
import About from './container/About/index.tsx';



class APP extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>2222222</h2>
                <About />
            </div>
        )
    }
}



ReactDOM.render(<APP />, document.getElementById('root'))