
import React, { Component, PureComponent } from "react";
import { Select, Form } from "antd";
import "./city.css";
import { getProvince } from "@services/leakCheck";
const { Option } = Select;
import { connect } from "react-redux";
@Form.create()
class City extends PureComponent {
  state = {
    capitals: [], // 省份
    cityArr: [], // 市
    areaList: [], // 区
    province: "",
    city: "",
    country: ""
  };
  componentDidMount() {
    this.props.onRef(this);
    this.init();
  }
  // 编辑函数
  edit = object => {
    if (object.province === "") {
      this.setState({
        capitals: []
      });
    } else if (object.city === "") {
      this.setState({
        cityArr: []
      });
    } else if (object.country === "") {
      this.setState({
        areaList: []
      });
    } else {
      this.getCityArr(object.province);
      this.getareaListArr(object.city);
    }
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        this.state[key] = element;

        this.props.form.setFieldsValue({ [key]: element });
      }
    }
  };
  init = () => {
    getProvince({ code: "" }).then(res => {
      //console.log(res);
      this.setState({
        capitals: res.data.result
      });
    });
  };
  getCityArr = code => {
    getProvince({ code }).then(res => {
      // console.log(res);
      this.setState({
        cityArr: res.data.result
      });
    });
  };
  getareaListArr = code => {
    getProvince({ code }).then(res => {
      this.setState({
        areaList: res.data.result
      });
    });
  };
  getprovince = value => {
    this.props.form.validateFields(["province"], { force: false });
    this.props.form.setFieldsValue({ ["city"]: undefined });
    this.props.form.setFieldsValue({ ["country"]: undefined });
    this.setState(
      {
        province: value,
        areaList: [],
        city: null,
        country: null
      },
      () => {
        this.props.changeCityObj("province", value);
        this.getCityArr(value);
      }
    );
  };
  getCity = value => {
    const { setFields } = this.props.form;
    if (this.state.province == null) {
      setFields({
        province: {
          province: this.state.province,
          errors: [new Error("请先选择省份")]
        }
      });
      return;
    }
    if (value == undefined) {
      return;
    }
    this.props.form.validateFields(["city"], { force: false });
    this.props.form.setFieldsValue({ ["country"]: undefined });
    this.setState(
      {
        city: value
      },
      () => {
        this.props.changeCityObj("city", value);

        this.getareaListArr(value);
      }
    );
  };
  getData = value => {
    const { setFields } = this.props.form;
    if (this.state.province == null || this.state.province == "") {
      setFields({
        province: {
          province: this.state.province,
          errors: [new Error("请先选择省份")]
        }
      });
    }
    if (this.state.city == null || this.state.city == "") {
      setFields({
        city: {
          city: this.state.city,
          errors: [new Error("请先选择城市")]
        }
      });
      return;
    }
    this.setState(
      {
        country: value
      },
      () => {
        this.props.form.validateFields(["country"], { force: false });
        this.props.changeCityObj("country", value);
      }
    );
  };
  checkEquipmentName = () => {
    const { setFields } = this.props.form;
    if (!this.state.province) {
      setFields({
        province: {
          province: this.state.province,
          errors: [new Error("请选择省份")]
        }
      });
    }
    if (!this.state.city) {
      setFields({
        city: {
          city: this.state.city,
          errors: [new Error("请选择城市")]
        }
      });
    }
    if (!this.state.country) {
      setFields({
        country: {
          country: this.state.country,
          errors: [new Error("请选择区县")]
        }
      });
    }
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.state.capitals !== nextState.capitals ||
  //     this.state.cityArr !== nextState.cityArr ||
  //     this.state.areaList !== nextState.areaList
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { capitals } = this.state;
    return (
      <div>
        <p style={{ marginTop: "15px", fontWeight: "700" }}>
          <b style={{ color: "#ff0000" }} /> 区划信息
        </p>

        <div className="city">
          <div>
            <Form.Item className="form-style">
              {getFieldDecorator("province", {
                rules: [{ required: false }]
              })(
                <Select
                  // showSearch
                  style={{ width: "70%", marginRight: "15px" }}
                  placeholder="省份"
                  onChange={this.getprovince}
                  getPopupContainer={trigger => trigger.parentNode}
                  // showSearch
                  // optionFilterProp="children"
                >
                  {capitals &&
                    capitals.map(item => (
                      // eslint-disable-next-line no-unused-expressions
                      <Option key={item} value={item.code}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              )}
              <span style={{ marginLeft: "0px" }}> 省</span>
            </Form.Item>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <Form.Item className="form-style">
              {getFieldDecorator("city", { rules: [{ required: false }] })(
                <Select
                  // showSearch
                  style={{ width: "70%", marginRight: "15px" }}
                  placeholder="市"
                  onChange={this.getCity}
                  onFocus={this.getCity}
                  getPopupContainer={trigger => trigger.parentNode}
                >
                  {this.state.cityArr.map(item => (
                    <Option key={item} value={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
              {/* <span> 市</span> */}
            </Form.Item>
          </div>
          <div>
            <Form.Item className="form-style">
              {getFieldDecorator("country", { rules: [{ required: false }] })(
                <Select
                  // showSearch
                  style={{ width: "70%" }}
                  placeholder="区"
                  optionFilterProp="children"
                  onChange={this.getData}
                  onFocus={this.getData}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  getPopupContainer={trigger => trigger.parentNode}
                >
                  {this.state.areaList.map(item => (
                    <Option key={item} value={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
              <span style={{ marginLeft: "10px" }}> 区县</span>
            </Form.Item>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => state.DeviceReducer;
const mapDispatchToProps = dispatch => ({
  dispatch
});
const Citys = Form.create({ name: "City" })(City);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Citys);
