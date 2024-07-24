import {
  getApiPermission,
  getMenuPermission,
  rolePermission,
} from "@/api/auth";
import { getApiList } from "@/api/system/api";
import { getMenuList } from "@/api/system/menu";
import { IApi, IMenuTree } from "@/types";
import { listToTableTree, listToLeftTree } from "@/utils";
import { Steps, Tree, message } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type RoleProp = {
  role: any;
  onActive: any;
};

const DialogProgress: React.FC<RoleProp> = forwardRef(
  (props: RoleProp, ref) => {
    const { role, onActive } = props;
    const menuTreeRef = useRef(null);
    const apiTreeRef = useRef(null);
    const [active, setActive] = useState(0);
    const [menuIds, setMenuIds] = useState("");
    const [apiIds, setApiIds] = useState("");
    const [menuTreeList, setMenuTreeList] = useState<IMenuTree[]>([]);
    const [apiTreeList, setApiTreeList] = useState<IApi[]>([]);
    const [checkedMenuKeys, setCheckedMenuKeys] = useState([""]);
    const [checkedApiKeys, setCheckedApiKeys] = useState([""]);

    const prev = () => {
      if (active > 0) {
        if (active === 1) {
          const apiIdKeys = checkedApiKeys ? checkedApiKeys.join(",") : "";
          setApiIds(apiIdKeys);
        } else if (active === 2) {
          //TODO:数据权限
        }

        setActive(active - 1);
      }
    };
    const next = () => {
      if (active < 2) {
        if (active === 0) {
          const menuIdKeys = checkedMenuKeys ? checkedMenuKeys?.join(",") : "";
          setMenuIds(menuIdKeys);
        } else if (active === 1) {
          const apiIdKeys = checkedApiKeys ? checkedApiKeys.join(",") : "";
          setApiIds(apiIdKeys);
        }
        setActive(active + 1);
        // active++;
      }
    };
    const save = (done: any) => {
      rolePermission({
        roleId: role.id,
        menuIds: menuIds,
        apiIds: apiIds,
      }).then(() => {
        message.success("角色授权成功");
        done();
      });
    };
    // 暴露给父组件使用
    useImperativeHandle(ref, () => ({
      next,
      prev,
      save,
      active,
    }));

    const onMenuCheck = (checkedKeysValue: any) => {
      console.log("onMenuCheck", checkedKeysValue);
      setCheckedMenuKeys(checkedKeysValue);
    };
    const onApiCheck = (checkedKeysValue: any) => {
      console.log("onApiCheck", checkedKeysValue);
      setCheckedApiKeys(checkedKeysValue);
    };
    const onChange = (value: any) => {
      setActive(value);
    };
    /**
     * 加载接口数据
     */
    const apiLoad = () => {
      getApiList().then((res) => {
        const { data: apiList } = res;
        setApiTreeList([...apiList]);
        getApiPermission1(role.id!.toString());
      });
    };

    const getApiPermission1 = (id: string) => {
      getApiPermission(id).then((res) => {
        const { data: keys } = res;
        setCheckedApiKeys(keys);
      });
    };
    /**
     * 加载菜单数据
     */
    const menuLoad = () => {
      getMenuList().then((res) => {
        const { data: menuList } = res;
        const menuTree = listToLeftTree(menuList, 0, {
          pId: "pId",
          label: "menuName",
        });
        console.log("menuTree", menuTree);
        setMenuTreeList([...menuTree]);
        getMenuPermission1(role.id!.toString());
      });
    };
    const getMenuPermission1 = (id: string) => {
      getMenuPermission(id).then((res) => {
        const { data: keys } = res;
        setCheckedMenuKeys(keys);
      });
    };
    const FirstTree = () => {
      if (active == 0) {
        return (
          <Tree
            checkable
            ref={menuTreeRef}
            multiple={true}
            onCheck={onMenuCheck}
            checkedKeys={checkedMenuKeys}
            treeData={menuTreeList}
          />
        );
      } else if (active == 1) {
        return (
          <Tree
            checkable
            ref={apiTreeRef}
            onCheck={onApiCheck}
            checkedKeys={checkedApiKeys}
            treeData={apiTreeList}
            fieldNames={{
              title: "apiName",
              key: "id",
            }}
          />
        );
      } else if (active == 2) {
        return <div>待开发</div>;
      }
    };

    useEffect(() => {
      if (active === 0) {
        menuLoad();
      } else if (active === 1) {
        apiLoad();
      }
      onActive(active);
    }, [active]);

    return (
      <>
        <div>
          <Steps
            current={active}
            onChange={onChange}
            type="navigation"
            items={[
              {
                title: "菜单权限",
                disabled: true,
              },
              {
                title: "接口权限",
                disabled: true,
              },
              {
                title: "数据权限",
                disabled: true,
              },
            ]}
          ></Steps>
          <FirstTree></FirstTree>
        </div>
      </>
    );
  }
);

export default DialogProgress;
