import React from 'react';

import list from './list.json';

export default class About extends React.PureComponent<{}, {}>{
    render(): React.ReactNode {
        return <div>
            关于我
            {
                list.a
            }
        </div>
    }
}