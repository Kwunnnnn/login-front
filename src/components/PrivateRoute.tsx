import { Route, Redirect } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import { AUTH_STORAGE_NAME } from "../constants/environment";
import auth from "../utils/auth";

const { Content } = Layout;

export const PrivateRoute = ({
  component: Component,
  title = "",
  ...rest
}): any => {
  const token = sessionStorage.getItem(AUTH_STORAGE_NAME);
  const isExpired = auth.isExpiredToken(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token && !isExpired ? (
          <ConfigProvider>
            <Layout id="app-layout">
              <Layout style={{ padding: "32px 26px 48px" }}>
                <Content>
                  <div className="container mx-auto">
                    <Component {...props} />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </ConfigProvider>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};
