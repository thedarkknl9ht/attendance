import {
  ConfigProvider,
  AuthProvider,
  AccessProvider,
} from "~/library/services";

import Pages from "~/pages";

const App = () => (
  <AuthProvider>
    <ConfigProvider>
      <AccessProvider>
        <Pages />
      </AccessProvider>
    </ConfigProvider>
  </AuthProvider>
);

export default App;
