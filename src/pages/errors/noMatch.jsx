import React from 'react';
import { Button, Result } from 'antd';

const NoMatch = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
);
export default NoMatch;