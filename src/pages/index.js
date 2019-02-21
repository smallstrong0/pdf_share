import React, { Component } from 'react'
import styles from './index.css'
import { message, Input, Icon, List, Tabs,Card } from 'antd'
import { list } from '../service/home'
import { fSetCookieMes } from '../utils/common'
import router from 'umi/router';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { Meta } = Card;


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search_info: '',
            tab_list: [
                {tab:"前端",data_list:[
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    },
                    
                ]},
                {tab:"后端",data_list:[
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    }
                ]},
                {tab:"移动端",data_list:[
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    }
                ]},
                {tab:"算法",data_list:[
                    {
                        book_name:"程序员的自我修养",
                        author:"smallstrong",
                        password:"wwxp"
                    }
                ]},
                {tab:"大数据",data_list:[{
                    book_name:"程序员的自我修养",
                    author:"smallstrong",
                    password:"wwxp"
                }]}
            ],
            activeKey:"前端",
        }
    }

    search = (e) =>{
        console.log(e)
        fSetCookieMes('search_info',e)
        router.push('/main/search');
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
                                            // <div className={styles.book_item}>
                                            //     <img className={styles.book_img} src={require('../assets/bg.png')} alt='' />
                                            //     <span className={styles.info}>书名：{d_item.book_name}</span>
                                            //     <span className={styles.info}>作者：{d_item.author}</span>
                                            //     <span className={styles.info}>密码：{d_item.password}</span>
                                            // </div>
                                            <Card
                                                hoverable
                                                className={styles.book_item}
                                                cover={<img className={styles.book_img} src={require('../assets/bg.png')} alt='' />}
                                            >
                                            <Meta className={styles.info}
                                                title= {"书名："+ d_item.book_name}
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
