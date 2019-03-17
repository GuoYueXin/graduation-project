import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ loading, home }) => ({ loading, home }))
class index extends PureComponent {
  render() {
    const {
      msg
    } = this.props.home;
    return (
      <div>
        {msg}
      </div>
    );
  }
}

export default index;