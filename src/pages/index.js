import React, { Component } from 'react'
import styles from './index.css'
import { message, Input, Icon, List, Tabs } from 'antd'
import { list } from '../service/home'
import router from 'umi/router';
import { fSetCookieMes } from '../utils/common'
const Search = Input.Search;
const TabPane = Tabs.TabPane;


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: '',
            data_list: []
        }
    }


    search() {
        if (!this.state.key) {
            return
        }
        var body = {
            key: this.state.key,
        }
        console.log(body)

        list(body).then(res => {
            if (res.success) {
                console.log(res)
                this.setState(
                    {
                        data_list: res['data']['result_list']
                    }
                )
            } else {
                message.error('我擦，出错了', 1);
            }
        })

    }


    onChangeSearchInfo = (e) => {
        this.setState({ key: e }, () => {
            this.search();
        });
    }

    callback(key) {
        console.log(key);
    }



    render() {
        const { key } = this.state;
        var screen_width = document.documentElement.clientWidth || document.body.clientWidth;
        var screen_height = document.documentElement.clientHeight || document.body.clientHeight;
        window.onresize = function () {
            screen_width = document.documentElement.clientWidth || document.body.clientWidth;
            screen_height = document.documentElement.clientHeight || document.body.clientHeight;
        }
        return (
            
                    <div  className={styles.login} style={{ width: screen_width, height: screen_height - 64 }} >
                        <Search
                            className={styles.search}
                            placeholder="输入搜索关键字"
                            onSearch={this.onChangeSearchInfo}
                        />

                        <List
                            itemLayout="vertical"
                            className={styles.list}
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 7,
                            }}
                            dataSource={this.state.data_list}

                            renderItem={item => (
                                <List.Item>
                                    <div className={styles.item}>
                                        <a href={item['url']}>{item['name']}</a>
                                    </div>

                                </List.Item>
                            )}
                        />

                        <div className={styles.footer}>
                            pdf share for free
                    </div>
                    </div>

               

        )
    }
}
