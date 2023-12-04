import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ILoginParams } from "@/types";
import "./index.less";
import { AppDispatch } from "@/store";
import { login } from "@/store/modules/auth";
import { getUserInfo, getPermission1 } from "@/store/modules/user";
import { IQuickResponseData } from "@/utils/request";

const Login: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const [title] = useState("quick-react18-admin");
  const [loadings, setLoadings] = useState<boolean>(false);
  const [form, setForm] = useState<ILoginParams>({
    tenant: "",
    username: "",
    password: "",
  });
  const handleInputChanage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
  };
  const handleLogin = async (): Promise<void> => {
    console.log("form", form);
    const { username } = form;
    setLoadings(true);
    try {
      await dispatch(login(form));
      const { payload } = await dispatch(getUserInfo(username));
      const { data: user } = payload as IQuickResponseData<IUser>;
      const { id } = user;
      await dispatch(getPermission1(id!.toString()));
      navigate("/");
    } catch (error) {
      console.log("login error", error);
    } finally {
      setLoadings(false);
    }
  };
  return (
    <div className="login-box">
      <div className="form">
        <Card>
          <div className="item">
            <div className="tilte">
              <span>{title}</span>
            </div>
          </div>
          <div className="item">
            <Input
              name="username"
              placeholder="用户名"
              prefix={<UserOutlined className="site-form-item-icon" />}
              //   value={form.username}
              size="large"
              onChange={handleInputChanage}
            />
          </div>
          <div className="item">
            <Input.Password
              name="password"
              placeholder="密码"
              prefix={<LockOutlined className="site-form-item-icon" />}
              //   value={form.password}
              size="large"
              onChange={handleInputChanage}
            />
          </div>
          <div className="item">
            <Button
              type="primary"
              loading={loadings}
              size="large"
              block
              onClick={handleLogin}
            >
              登录
            </Button>
          </div>
          <div className="test">测试账号密码：admin/123456</div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
