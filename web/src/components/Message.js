import { Message, Icon } from "antd";
import styles from "./message.less";
import React from "react";
Message.config({
  top: "10%"
});
// 成功提示
export const success = text =>
  Message.open({
    content: (
      <div
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "4px",
          display: "flex",
          background: "#07c98a",
          justifyContent: "space-between",
          padding: "8px 20px",
          alignItems: "center"
        }}
      >
        <Icon style={{ fontSize: "14px", color: "white" }} type="check" />
        <div style={{ color: "white" }}>{text}</div>
      </div>
    ),
    duration: 1
  });

// 失败提示
export const error = (text, time) =>
  Message.open({
    content: (
      <div className={styles.conent}>
        <Icon
          type="exclamation-circle"
          style={{ color: "#fff", fontSize: "18px" }}
          theme="filled"
        />
        {/* <Icon className={styles.error} type="exclamation-circle" /> */}
        <div style={{ color: "white" }}>{text}</div>
      </div>
    ),
    duration: time ? time : 1
  });

// 异常提示
export const warning = (text, time) =>
  Message.open({
    content: (
      <div className={styles.conentwarning}>
        <Icon
          style={{ color: "#fff", fontSize: "20px" }}
          type="warning"
          theme="filled"
        />
        <div style={{ color: "white", fontSize: "14px" }}>{text}</div>
      </div>
    ),
    duration: time ? time : 1
  });
