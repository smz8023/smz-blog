import React, { Component, useState, useEffect, useCallback, useRef } from 'react';
import {Checkbox} from 'antd'
export default (props) => {

  const [checkedKeys, setcheckedKeys] = useState([])
  const onCheck = (item) => {
    
    setcheckedKeys(item.checkedKeys)
  }
  return <Tree data = {props.data} checkedKeys={checkedKeys}  onCheck={onCheck}></Tree>
}


class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: props.data
      // [
      //   {
      //     title: '我1',
      //     key: "0",
      //     children: [
      //       {
      //         title: '我21',
      //         key: "0-0",
      //         children: [
      //           { title: '我31', key: '0-0-0' },
      //           { title: '我32', key: '0-0-1' },
      //           {
      //             title: '我33', key: '0-0-2', children: [
      //               { title: '我311', key: '0-0-2-0' },
      //               { title: '我322', key: '0-0-2-1' },
      //               { title: '我333', key: '0-0-2-2' },
      //             ],
      //           },
      //         ],
      //       },
      //       {
      //         title: '我22',
      //         key: "0-1",
      //         children: [
      //           { title: '我221', key: '0-1-0' },
      //           { title: '我222', key: '0-1-1' },
      //           { title: '我223', key: '0-1-2' },
      //         ],
      //       },
      //       {
      //         title: '我23',
      //         key: "0-2",

      //       },
      //     ],
      //   },
      //   {
      //     title: '我2',
      //     key: "1",
      //     children: [
      //       { title: '我21', key: '1-0' },
      //       { title: '我22', key: '1-1' },
      //       { title: '我23', key: '1-2' },
      //     ],
      //   },
      //   {
      //     title: '我3',
      //     key: "2",
      //   },
      // ]
    }
  }
  renderTree = (data, parent = null) => data.map(item => {
    let select = this.props.checkedKeys.findIndex(i => i.key === item.key) !== -1;
    // console.log('select',select)
    if (item.children) {
      return (
        <TreenNode checkedKeys={this.props.checkedKeys} parentChild={data.map(i => i.key)} parent={parent} select_={select} onCheck={this.props.onCheck} isLeaf={false} title={item.title} id={item.key} key={item.key} dataRef={item}>
          {this.renderTree(item.children, item.key)}
        </TreenNode>
      );
    }
    return <TreenNode checkedKeys={this.props.checkedKeys} parentChild={data.map(i => i.key)} parent={parent} select_={select} onCheck={this.props.onCheck} isLeaf={true} key={item.key} id={item.key} {...item} dataRef={item} />;
  });
  render() {
    return (
      <div>
        {this.renderTree(this.state.treeData)}
      </div>
    );
  }
}
const TreenNode = ({ id, title, dataRef, children, checkedKeys, isLeaf, onCheck, select_, parent, parentChild }) => {
  const [select, setSelect] = useState(select_)
  const parentChild_ = useRef(parentChild);
  const parent_ = useRef(parent);
  const isLeaf_ = useRef(isLeaf);
  const id_ = useRef(id);
  const checkedKeys_ = useRef(checkedKeys);
  const a = useRef(false);

  const setV = (data, parent) => {
    return data.map(i => {
      if (i.children) {
        return setV(i.children, i.key)
      } else {
        return { parent, key: i.key }
      }
    })
  }
  const setParent = (data, parent, arr = []) => {
    let list = data.filter(i => i.children)
    list.forEach(item => {
      arr.push({ parent, key: item.key })
      setParent(item.children, item.key, arr)
    })
    return arr
  }
  const changeParent = useCallback(() => {

    if (parent_.current) {
      const arr_ = [...checkedKeys_.current]
      let n = 0
      parentChild_.current.forEach(i => {
        if (arr_.findIndex(item => item.key === i) !== -1) {
          n++
        }
      })
      if (n === parentChild_.current.length) {
        arr_.push({ parent: parent_.current.slice(0, -2), key: parent_.current })
      }

      a.current = true
      onCheck({ checkedKeys: arr_ })
    }
  }, [onCheck])

  useEffect(() => {
    if (checkedKeys_.current.length !== checkedKeys.length) {
      checkedKeys_.current = checkedKeys
      if( a.current)  a.current = false
    }
  })

  useEffect(() => {
    if (parent_.current && !isLeaf_.current &&
      checkedKeys_.current.findIndex(i => i.key === id_.current) !== -1 && checkedKeys_.current.findIndex(i => i.key === parent_.current) === -1) {
      !a.current && changeParent()
    }
  }, [a, changeParent])

  const change = () => {
    setSelect(!select)
    if (!isLeaf) {
      const list = setV(dataRef.children, id).flat(Infinity)
      const list_ = setParent(dataRef.children, id)
      const arr = [...list, ...list_, { parent, key: id }]
      if (!select) {
        let arr_ = [...checkedKeys]
        arr.forEach(i => {
          if (arr_.findIndex(item => item.key === i.key) === -1) {
            arr_.push(i)
          }
        })
        onCheck({ checkedKeys: arr_, id, select: !select, parent, isLeaf })
      } else {
        let arr_ = checkedKeys.filter(i => arr.findIndex(item => item.key === i.key) === -1)
        if (parent) {
          const parentArr = parent.split('-')
          for (let i = 0; i < parentArr.length; i++) {
            arr_ = arr_.filter(item => item.key !== parentArr.slice(0, i + 1).join('-'))
          }
        }
        onCheck({ checkedKeys: arr_, id, select: !select, parent, isLeaf })
      }
    } else if (!select && isLeaf) {
      const arr_ = [...checkedKeys, { parent, key: id }]
      if (parent) {
        let n = 0
        parentChild.forEach(i => {
          if (arr_.findIndex(item => item.key === i) !== -1) {
            n++
          }
        })
        if (n === parentChild.length) {
          arr_.push({ parent: parent.slice(0, -2), key: parent })
        }
      }


      onCheck({ checkedKeys: arr_, id, select: !select, parent, isLeaf })
    } else if (select && isLeaf) {

      let arr_ = checkedKeys.filter(i => i.key !== id)
      if (parent) {
        const parentArr = parent.split('-')
        for (let i = 0; i < parentArr.length; i++) {
          arr_ = arr_.filter(item => item.key !== parentArr.slice(0, i + 1).join('-'))
        }
      }
      onCheck({ checkedKeys: arr_, id, select: !select, parent, isLeaf })
    }
  }
  useEffect(() => {
    setSelect(select_)
  }, [select_])
  return <div>
    <div style={{ display: "flex" }} >
      <Checkbox
        // indeterminate={select?false:true}
        checked={select} 
        onChange={change}  
       >{title}</Checkbox>
      
      <div>---{id}</div>
    </div>
    <div style={{ paddingLeft: "40px" }} >{children}</div>
  </div>
}