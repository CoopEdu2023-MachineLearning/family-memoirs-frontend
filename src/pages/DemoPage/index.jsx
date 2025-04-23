import DemoComponents from "@components/DemoComponents";
import { useEffect, useState } from "react";
import { Button } from "@douyinfe/semi-ui";
import { demoApi } from "@apis";

const DemoPage = ({ name }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    demoApi()
      .then(data => {
        setText(data);
      });
  }, []);

  return (
    <>
      <DemoComponents />
      <div className="title">
        {text + name}
      </div>
      <Button>semi</Button>
    </>
  );
}

export default DemoPage;
