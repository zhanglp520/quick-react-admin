import React from "react";
import { Button, Card, Col, Row } from "antd";
import "./index.less";
const ProductIntroduction: React.FC = () => {
  const yanshi = () => {
    window.open("https://react.quick.ainiteam.com/");
  };
  const kaiyuan = () => {
    window.open("https://gitee.com/zhanglp520/quick-react-admin.git");
  };
  return (
    <>
      <div className="product">
        <Row className="quick-row">
          <Col>
            <Card className="quick-card">
              <div>
                <div className="Card-header">
                  <span>产品名称：quick中后台开发者系统平台</span>
                </div>
              </div>
              <div className="description">
                quick-react-admin
                是一款免费开源快速搭建中后台系统框架。本框架基于
                vite5、react、antd、@reduxjs/toolkit 以及 react-router-dom
                等最新主流技术并封装了通用的组件方便开发者提高工作效率。后期也会通过版本升级的方式来维护并更新，使开发者拥有一款长期并且稳定的脚手架。本团队还提供了基于
                quick 框架开发的各类业务项目，比如：
                订单管理系统、调度管理系统、聊天系统、音视系统
                、监控系统、商城系统、物联网平台、外卖系统、ERP 系统、CMR
                系统、OA 系统、物流管理系统、CRM
                管理系统等等常用的业务系统，如有相关需求联系管理员。
                <br />
                <p>
                  开源地址：
                  <Button
                    type="link"
                    href="https://gitee.com/zhanglp520/quick-react-admin.git"
                  >
                    https://gitee.com/zhanglp520/quick-react-admin.git
                  </Button>
                  <br />
                  演示地址：
                  <Button type="link" href="https://react.quick.ainiteam.com/">
                    https://react.quick.ainiteam.com/
                  </Button>
                  <br />
                  账号密码：admin/123456
                  <br />
                  如果对你有帮助，帮忙点个star吧！
                  也可以fork项目并对项目做出贡献！
                  <br />
                  如果想加入项目，请联系管理员！
                </p>
              </div>
              <div className="action">
                <Button type="primary" onClick={yanshi}>
                  演示版本
                </Button>
                <Button
                  type="primary"
                  danger
                  className="quick-button"
                  onClick={kaiyuan}
                >
                  开源版本
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="quick-row">
          <Col span={12}>
            <Card className="quick-card card2">
              <div>
                <div className="Card-header">
                  <span>特色</span>
                </div>
              </div>
              <Row>
                <Col span={12}>
                  <p>
                    1.使用
                    vite5、react8、redux、@reduxjs/toolkit、react-router-dom、antd
                    和 typescript 等前言技术
                    <br />
                    2.封装了通用的组件
                    <br />
                    3.提供了系统管理常用功能模块 <br />
                    4.提供权限管理模块 <br />
                    5.动态菜单技术
                    <br />
                    6.动态路由技术 <br />
                    7.使用 JWT 鉴权
                    <br />
                    8.使用中间件异常处理
                    <br />
                    9.前后端分离
                    <br />
                    10.后端使用 nestjs 框架
                    <br />
                    11.使用 restful 接口规范
                    <br />
                    12.k8s 分布式
                    <br />
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    13.模块化管理
                    <br />
                    14.使用 mvc 架构及多层设计思想
                    <br />
                    15.token 鉴权
                    <br />
                    16.个人资料修改及密码修改功能
                    <br />
                    17.支持支付功能
                    <br />
                    18.docker 容器化
                    <br />
                    19.jenkins 自动化部署技术
                    <br />
                    20.使用 typeorm 框架，可活支持数据库及多种类型的数据库
                    <br />
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="quick-card">
              <div>
                <div className="Card-header">
                  <span>升级</span>
                </div>
              </div>
              <p>
                发布版本1.0.1
                <br />
                1.菜单优化；
                <br />
                2.路由缓存；
                <br />
                3.修复bug
                <br />
                <br />
                发布版本1.1.0
                <br />
                1.增加：资源管理模块
                <br />
                2.增加：产品介绍页面
                <br />
                3.优化：选项卡
                <br />
                4.优化：面包屑
                <br />
                5.优化：菜单滚动条；
                <br />
                6.修复bug
                <br />
              </p>
            </Card>
          </Col>
        </Row>
        <Row className="quick-row">
          <Col span={12}>
            <Card className="quick-card card4">
              <div>
                <div className="Card-header">
                  <span>服务</span>
                </div>
              </div>
              <p>
                1.开发文档：
                <Button type="link" href=" https://doc.quick.ainiteam.com/">
                  https://doc.quick.ainiteam.com/
                </Button>
                <br />
                2.接口文档：
                <Button
                  type="link"
                  href="https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7"
                >
                  https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7
                </Button>
                <br />
                4.码云地址：
                <Button
                  type="link"
                  href="https://gitee.com/zhanglp520/quick-react-admin/"
                >
                  https://gitee.com/zhanglp520/quick-react-admin/
                </Button>
                <br />
                5.github地址：
                <Button
                  type="link"
                  href="https://gitee.com/zhanglp520/quick-react-admin/"
                >
                  https://github.com/zhanglp520/quick-react-admin/
                </Button>
                <br />
                6.gitlab地址：
                <Button
                  type="link"
                  href="https://gitee.com/zhanglp520/quick-react-admin/"
                >
                  http://110.42.130.88:8099/zhanglp520/quick-react-admin/
                </Button>
                <br />
                7.gitee中发起 Issue
                <br />
                8.qq群帮助：558795174
                <br />
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="quick-card">
              <div>
                <div className="Card-header">
                  <span>合作</span>
                </div>
              </div>
              <p>
                1.承接quick产品的定制化开发
                <br />
                2.承接quick产品的业务项目
                <br />
                3.组件定制化开发
                <br />
                4.其他项目可以联系咨询
                <br />
                qq：1841031740
                <br />
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductIntroduction;
