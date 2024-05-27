import { getApiPermission, getMenuPermission } from "@/api/auth";
import { getApiList } from "@/api/system/api";
import { getMenuList } from "@/api/system/menu";
import { IMenuTree } from "@/types";
import { listToTableTree, listToTree } from "@/utils";
import { Steps, Tree } from "antd";
import { useEffect, useState } from "react";

type RoleProp = {
  role: any;
};

const DialogProgress: React.FC<RoleProp> = (props: RoleProp) => {
  const { role } = props;
  const [current, setCurrent] = useState(0);
  const [menuTreeData, setMenuTreeData] = useState<IMenuTree[]>([]);
  const [menuTreeList, setMenuTreeList] = useState<IMenuTree[]>([]);
  const [apiTreeList, setApiTreeList] = useState<IMenuTree[]>([]);
  const [apiTreeData, setApiTreeData] = useState<IMenuTree[]>([]);

  const treeData = [
    {
      title: "0-0",
      key: "0-0",
      children: [
        {
          title: "0-0-0",
          key: "0-0-0",
          children: [
            {
              title: "0-0-0-0",
              key: "0-0-0-0",
            },
            {
              title: "0-0-0-1",
              key: "0-0-0-1",
            },
            {
              title: "0-0-0-2",
              key: "0-0-0-2",
            },
          ],
        },
        {
          title: "0-0-1",
          key: "0-0-1",
          children: [
            {
              title: "0-0-1-0",
              key: "0-0-1-0",
            },
            {
              title: "0-0-1-1",
              key: "0-0-1-1",
            },
            {
              title: "0-0-1-2",
              key: "0-0-1-2",
            },
          ],
        },
        {
          title: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "0-1",
      key: "0-1",
      children: [
        {
          title: "0-1-0-0",
          key: "0-1-0-0",
        },
        {
          title: "0-1-0-1",
          key: "0-1-0-1",
        },
        {
          title: "0-1-0-2",
          key: "0-1-0-2",
        },
      ],
    },
    {
      title: "0-2",
      key: "0-2",
    },
  ];
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [currentTreeData, setCurrentTreeData] = useState({
    key: "",
    title: "",
    children: [],
  });

  const onExpand = (expandedKeysValue: any) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue: any) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue: any, info: any) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const onChange = (value: any) => {
    setCurrent(value);
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
      setSelectedKeys(keys);
      setApiTreeData([...apiTreeList]);
      // nextTick(() => {
      //   if (apiTreeRef.value) {
      //     apiTreeRef.value.setCheckedKeys(keys, false);
      //   }
      // });
    });
  };
  /**
   * 加载菜单数据
   */
  const menuLoad = () => {
    getMenuList().then((res) => {
      const { data: menuList } = res;
      const menuTree = listToTree(menuList, 0, {
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
      setSelectedKeys(keys);
      setMenuTreeData([...menuTreeList]);
      // nextTick(() => {
      //   if (menuTreeRef.value) {
      //     menuTreeRef.value.setCheckedKeys(keys, false);
      //   }
      // });
    });
  };
  const FirstTree = () => {
    if (current == 0) {
      return (
        <Tree
          checkable
          multiple={true}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={menuTreeList}
        />
      );
    } else if (current == 1) {
      return <Tree checkable treeData={apiTreeData} />;
    } else if (current == 2) {
      return <div>待开发</div>;
    }
  };
  useEffect(() => {
    menuLoad();
    apiLoad();
  }, []);
  return (
    <>
      <div>
        <Steps
          current={current}
          onChange={onChange}
          type="navigation"
          items={[
            {
              title: "菜单权限",
              status: "finish",
            },
            {
              title: "接口权限",
              status: "finish",
            },
            {
              title: "数据权限",
              status: "finish",
            },
          ]}
        ></Steps>
        <FirstTree></FirstTree>
        {/* <div v-if="active === 1">
        <el-tree
            ref="menuTreeRef"
            :data="menuTreeData"
            :props="menuProps"
            show-checkbox
            node-key="id"
            highlight-current
        />
    </div>
    <div v-if="active === 2">
        <el-tree
            ref="apiTreeRef"
            :data="apiTreeData"
            :props="apiProps"
            show-checkbox
            node-key="id"
            highlight-current
        />
    </div> */}
        {/* <div v-if="current === 2"> 待开发 </div> */}
      </div>
    </>
  );
};

export default DialogProgress;
