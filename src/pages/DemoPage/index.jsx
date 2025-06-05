import DemoComponents from "@components/DemoComponents";
import TellerCreation from "@components/TellerCreation";
import { useEffect, useState } from "react";
import { Button } from "antd";
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
      {/* <DemoComponents /> */}
      <TellerCreation/>
      <div className="title">
        {text + name}
      </div>
      <Button>Antd</Button>
    </>
  );
}

export default DemoPage;
