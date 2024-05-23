import React, { Component, Fragment } from "react";
import { Upload, Icon, message } from "antd";
import styles from "./Index.less";

const { Dragger } = Upload;

class ZUload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      fileName: "",
      loading: false,
      uid: ""
    };
  }

  componentDidMount() {}

  prevent = e => {
    e.stopPropagation();
  };

  // 删除
  del = file => {
    this.setState(
      {
        ...this.state,
        fileList: [],
        loading: false
      },
      () => {
        this.props.onremove(this.state.uid, this.props.type);
      }
    );
  };

  render() {
    //
    const { fileName } = this.state;
    const props = {
      name: "file",
      accept: ".mp3,.amr,.wav",
      // action: `/individual_repo/temporary`,
      action: `xxxxx`,

      fileList: this.state.fileList,
      onRemove: this.del,
      beforeUpload: file => {
        if (file.size / 1024 / 1024 > 20) {
          message.error("请上传20M以下音频");
          return false;
        }
        if (this.state.fileList.length !== 0) {
          message.error("请删除现有音频");

          return false;
        }
        let str = file.name;
        let length = str.length - 2;

        // if (["mp3", "amr", "wav"].indexOf(str.substr(-3, 3)) > -1) {
        // } else {
        //   message.error("请上传正确格式音频");
        //   return false;
        // }
      },
      onChange: info => {
        const { status } = info.file;
        if (status == "uploading") {
          this.setState({
            ...this.state,
            fileList: [info.file],
            loading: true
          });
          // console.log(info.file, info.fileList);
        }
        if (status === "done") {
          console.log(info);
          this.setState({
            ...this.state,
            fileList: [info.file],
            uid: info.file.uid
          });
          this.props.onpost(info.file, this.props.target, this.props.type);
          // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          console.log(info);
          message.error(
            info.file.response ? info.file.response.message : "上传程序错误"
          );
          // message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    return (
      <Fragment>
        <Dragger {...props}>
          {!this.state.loading ? (
            <p className="ant-upload-drag-icon">
              <img src={upload} />
            </p>
          ) : (
            <p
              onClick={e => {
                this.prevent(e);
              }}
              className={styles.loading}
            >
              <img style={{ width: "100%" }} src={Sounddefault} />
              <Icon
                onClick={() => {
                  this.del();
                }}
                style={{ position: "absolute", right: "10px", top: "10px" }}
                type="close"
              />
            </p>
          )}

          {!this.state.loading ? (
            <p className="ant-upload-text">点击上传或拖拽音频至此</p>
          ) : null}
        </Dragger>
      </Fragment>
    );
  }
}
export default ZUload;
