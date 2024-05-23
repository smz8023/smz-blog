const axios = require("axios");
const { Success, Error } = require("../../DTO/index.js");
const url = 'https://web-api.juejin.im/query';
const cookie = 'QINGCLOUDELB=e1e58a4a208bca72195741a884fb2ba8159949ac964cb3e5740f00f89035177f|Xdt+R|Xdt+R; path=/; HttpOnly';//'QINGCLOUDELB=743155a837e7deb03acb8e760501fb609b6845ac24ccb3b2c31a11c11a0765c2|Xdt9U|Xdt9U';
              
const obj = {
  extensions: {
    query: {id: "653b587c5c7c8a00ddf67fc66f989d42"}
  },
  operationName: "",
  query: "",
  variables: {
    first: 20, 
    after:'',
    order: "POPULAR",
    category: "5562b415e4b00c57d9b94ac8"
  }
}
const heat = async (after) => {
  let result = await axios({
    method: "post",
    url:url,
    headers: {
      accept: "application/json",
      'X-Agent': 'Juejin/Web',
      'X-Legacy-Device-Id': '',//'1574215389751',
      'X-Legacy-Token': '',//'eyJhY2Nlc3NfdG9rZW4iOiJLRGRyVENEYlhqbU8zbGd3IiwicmVmcmVzaF90b2tlbiI6IlVrMWlnVUNIUjQyekE2QjUiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
      'X-Legacy-Uid': '',//'5b16ade45188257d840f2f14'
    },
    data:{...obj,variables:{...obj.variables,after:after||''}}
  });
  console.log('result',result.data)
  return new Success({code:0,data:result.data})
};
module.exports={
  heat
}