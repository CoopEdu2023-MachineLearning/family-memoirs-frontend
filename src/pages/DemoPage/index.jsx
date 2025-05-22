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
      <Card />

    </>
  );
}

export default DemoPage;
