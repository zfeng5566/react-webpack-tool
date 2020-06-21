import React from 'react';

import list from './list.json';

import iconTimg from './timg.jpg';

export default class About extends React.PureComponent<{}, {}>{
    render(): React.ReactNode {
        return <div>
            关于我
            {
                list.a
            }
            <div>
                <img src={iconTimg}></img>
            </div>
        </div>
    }
}