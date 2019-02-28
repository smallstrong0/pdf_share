import React, { Component } from 'react'
import styles from './index.css'
import { message, Input, Icon, List, Tabs, Card } from 'antd'
import { list } from '../../../service/home'
import {fGetCookieMes,fSetCookieMes} from '../../../utils/common'
import copy from 'copy-to-clipboard';
const Search = Input.Search;
const { Meta } = Card;


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: '',
            data_list: [
            ]
        }
    }

    componentDidMount() {
        var search_info = fGetCookieMes('search_info')
        this.setState({
            key:search_info
        }, () => {
            this.search();
        })
    }


    onClick= (ev, arg1) => {
        console.log(ev);
        copy(ev.password);
        message.success(ev.password+'复制密码成功');
        setTimeout(window.location.href=ev.url,500)
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
                message.error('阿欧出错了', 1);
            }
        })

    }

    onChange = (e) => {
        this.setState({ key: e.target.value });
    }

    onChangeSearchInfo = (e) => {
        this.search();
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
            <div className={styles.home} style={{ width: screen_width }} >
                <div className={styles.ipnut_div}>
                    <Search
                        placeholder="输入您要查找的书名"
                        onSearch={this.onChangeSearchInfo}
                        className={styles.input}
                        value={this.state.key}
                        onChange = {this.onChange}
                    />
                </div>
                
                <div className={styles.content}>
                    {this.state.data_list.map((d_item, j) => (
                            <Card onClick={this.onClick.bind(this,d_item)}
                                hoverable
                                className={styles.book_item}
                                cover= {d_item.img?<img className={styles.book_img} src={d_item.img} alt='' />
                                :
                                <img className={styles.book_img} src={require('../../../assets/placehold.png')} alt='' />}
                            >
                                <Meta className={styles.info}
                                    title={<div className={styles.title} ><span className={styles.a} title={d_item.book_name}>{d_item.book_name}</span></div>}
                                    description={"密码：" + d_item.password}
                                />
                            </Card>
                    )
                    )
                    }
                </div>
            </div>



        )
    }
}
