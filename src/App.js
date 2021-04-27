import React, { useRef, useState } from "react";
import './App.css';
import { Layout, Row, Col } from 'antd';
import "antd/dist/antd.css";
import Editor from "@monaco-editor/react";
import { Navbar } from "./Components/Navbar";
import {Toolbar} from "./Components/Toolbar";

function App() {

  const editorRef = useRef(null);
  const resultEditorRef = useRef(null);

  const [value, setValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [disiableBtn, setDisiable] = useState(false);
  const [visible, setVisible] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleResultEditorDidMount(editor, monaco) {
    resultEditorRef.current = editor;
  }

  function formatValue() {
    // alert(editorRef.current.getValue());
    const val = editorRef.current.getValue();
    const formatedValue = JSON.stringify(JSON.parse(val), null, 2)
    setResultValue(formatedValue);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log("onValidate:", marker.message));
    Array.isArray(markers) && markers.length > 0 ? setDisiable(true) : setDisiable(false);
  }

  function minifyValue() {
    const val = editorRef.current.getValue();
    // const formatedValue = JSON.stringify(val, null, 4);
    const minifyedValue = JSON.stringify(JSON.parse(val))
    setResultValue(minifyedValue);
  }

  function showPopup() {
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleSave(value) {
    console.log(value);
    const { type, name } = value;
    if (type === "download") {
      downloadJsonFile(name)
    }
    setVisible(false);
  }

  function downloadJsonFile(fileName) {
    if (resultEditorRef) {
      const formatedValue = JSON.stringify(JSON.parse(resultEditorRef.current.getValue()), null, 2)
      const url = window.URL
        .createObjectURL(new Blob([formatedValue]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.json`);
      document.body.appendChild(link);
      link.click();
    }

  }

  return (
    <div className="root">
      <Layout >
        <Navbar />
        <Row>
          <Col span={10}>
            <Editor
              height="100vh"
              defaultLanguage="json"
              defaultValue={value}
              onMount={handleEditorDidMount}
              onValidate={handleEditorValidation}
              theme="vs-dark"
            />
          </Col>
          <Col span={4}>
            <Toolbar formatValue={formatValue} minifyValue={minifyValue} showPopup={showPopup} 
            disiableBtn={disiableBtn} visible={visible} handleSave={handleSave} handleCancel={handleCancel} />
          </Col>
          <Col span={10}>
            <Editor
              height="100vh"
              defaultLanguage="json"
              defaultValue={""}
              value={resultValue}
              options={{ readOnly: true }}
              theme="vs-dark"
              onMount={handleResultEditorDidMount}
            />
          </Col>
        </Row>
      </Layout>
    </div>

  );
}

export default App;
