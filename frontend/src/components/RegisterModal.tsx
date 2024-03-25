import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import modules from "../../modules.json"
import { Background } from "reactflow";
import './registerModal.css'
import { url } from "inspector";

interface ModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<ModalProps> = ({ onClose }) => {
  console.log("-----------", modules);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // console.log(values.email);
      modules.push({
        "name": values.name,
        "url": values.url,
        "image": "/img/frontpage/comai-logo.png",
        "description": "Telemetry of Commune Ai",
        "registerKey": "5EJ9AUpSGafWeagdP5nwc5AwcYBkagYSZyx2BmLKWJrGBZUZ",
        "verified": false,
        "tags": [
          "stats",
          "staking",
          "wallet"
        ]
      })
      console.log("modulsesadfasdfasdf", modules);
      onClose(); // Close the modal
    });
  };

  return (
    <Modal
      title="Register Module"
      open={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} className="bg-blue-800">
          Submit
        </Button>,
      ]}
    >
      <Form form={form}
        labelCol={{ span: 6 }}    
        layout="vertical"
        // disabled={componentDisabled}
        style={{ maxWidth: 600 }}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter module name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[
            { required: true, message: "Please enter module url" },
            { type: "url", message: "Please enter a valid url" },
          ]}
        ><Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            { required: true, message: "Please enter image" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter module description" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="registerkey"
          label="Registerkey"
          rules={[
            { required: true, message: "Please enter Registerkey" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            { required: true, message: "Please enter Module tags" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;