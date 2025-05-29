import DemoComponents from "@components/DemoComponents";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { demoApi } from "@apis";
import { Card } from "@components/CardComponent";

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
      <Button>Antd</Button>
      <Card place="呼和浩特市" eventTag="矿区" tagOne="煤矿场" tagTwo="资源枯竭"/>

    </>
  );
}

export default DemoPage;
