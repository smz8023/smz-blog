import React from "react";
import { Route, Switch, Redirect, Prompt } from "react-router-dom";
import { getCookie } from "@utils/cookie";
import LayloutHead from "../container/Common/LayloutHead";
import { Login } from "./routes";
class RouteMap extends React.PureComponent {
  componentDidMount() {
    // console.log('Prompt',Prompt)
  }
  render() {
    const { routes } = this.props;

    return (
      <>
        <Switch>
        {
            Login.map(i => {
              const Com = i.component;
              return <Route
                key={i.path}
                path={i.path}
                render={(apiRouter) => {
                  return <Com RedirectPath={i.path}  {...apiRouter} />
                }}
              />
            })
          }
        {routes.map((item, index) => { 
          const RouteComponent = item.component;

          return (
            <Route
              path={item.path}
              render={routeApi => {
                document.title = item.name||'邵明振的博客';
                return (
                  <LayloutHead
                    {...routeApi}
                    routes={routes}
                  >
                    <RouteComponent routes={item.children} {...routeApi} />
                  </LayloutHead>
                );
              }}
              key={item.path}
            />
          );
        })}
        <Redirect exact from='/' to="/login" />
        <Route render={()=>{
          return <div><h1>这个是404 页面</h1></div>
        }}/>
      </Switch>
      </>
    );
  }
}
export default RouteMap;
