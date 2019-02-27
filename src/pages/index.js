import React, { Component } from 'react'
import styles from './index.css'
import { message, Input, Icon, List, Tabs,Card } from 'antd'
import { recommend } from '../service/home'
import { fSetCookieMes } from '../utils/common'
import router from 'umi/router';
import copy from 'copy-to-clipboard';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { Meta } = Card;


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search_info: '',
            tab_list: [
            ],
            activeKey:"后端",
        }
    }

    search = (e) =>{
        console.log(e)
        fSetCookieMes('search_info',e)
        router.push('/main/search');
    }

    componentDidMount() {
        this.go_recommend()
    }

    go_recommend() {
        var body = {
        }
        console.log(body)
        recommend(body).then(res => {
            if (res.success) {
                console.log(res)
                this.setState(
                    {
                        tab_list: res['data']['result_list']
                    }
                )
            } else {
                message.error('阿欧出错了', 1);
            }
        })

    }

    onClick= (ev, arg1) => {
        console.log(ev);
        copy(ev.password);
        message.success(ev.password+'复制密码成功');
        setTimeout(window.location.href=ev.url,500)
    }


    render() {
        const { activeKey } = this.state;
        var screen_width = document.documentElement.clientWidth || document.body.clientWidth;
        var screen_height = document.documentElement.clientHeight || document.body.clientHeight;
        window.onresize = function () {
            screen_width = document.documentElement.clientWidth || document.body.clientWidth;
            screen_height = document.documentElement.clientHeight || document.body.clientHeight;
        }
        return (
                <div  className={styles.home} style={{ width: screen_width}} >
                    <div className={styles.bg}>
                        <img className={styles.bg_img} src={require('../assets/bg.png')} alt='' />
                        <span className={styles.slogan}>偷书不算偷</span>
                        <Search
                            placeholder="输入您要查找的书名"
                            onSearch={this.search}
                            className={styles.input}
                            />
                    </div>
                    <div className={styles.sep}>
                            <div className={styles.line}/>
                            <span className={styles.txt}>我的推荐</span>
                            <div className={styles.line}/>
                    </div>

                    <Tabs defaultActiveKey="1" onChange={this.callback} defaultActiveKey={activeKey}>
                        {
                            this.state.tab_list.map((item,i) => (
                                <TabPane tab={item.tab} key={item.tab} className={styles.TabPane}>
                                    {item.data_list.map((d_item,j) => (
                                            <Card onClick={this.onClick.bind(this,d_item)}
                                                hoverable
                                                className={styles.book_item}
                                                cover={<img className={styles.book_img} src={d_item.img} alt='' />}
                                            >
                                            <Meta className={styles.info}
                                                title={<div className={styles.title} ><span className={styles.a} title={d_item.book_name}>{d_item.book_name}</span></div>}
                                                description={"密码："+ d_item.password}
                                            />
                                            </Card>
                                        )
                                    )
                                    }
                                </TabPane>
                            ))
                  
                        }  
                    </Tabs>
                        
                </div>
        )
    }
}
