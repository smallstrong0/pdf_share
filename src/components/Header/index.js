import React from 'react'
import styles from './index.css'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
  }

  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div className={styles.header}>
        <img className={styles.logo} src={require('../../assets/logo.png')} alt='' />
        {/* <span className={styles.txt}>书籍</span> */}
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.table}>
          <TabPane tab="书籍" key="1"></TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Header;