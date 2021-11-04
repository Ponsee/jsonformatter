import React from "react";
import { Button, Modal, Form, Input, Radio } from 'antd';

export function Toolbar(props) {
	const { formatValue, minifyValue, showPopup, disiableBtn, visible, handleSave, handleCancel } = props;
	const [form] = Form.useForm();
	return (
		<div className="toolbar-root">
			<Button block className="toolbar-btn" onClick={formatValue} disabled={disiableBtn} >Format</Button>
			<Button block className="toolbar-btn" onClick={minifyValue} disabled={disiableBtn} >Minify</Button>
			<Button block className="toolbar-btn" onClick={showPopup} disabled={disiableBtn} >Save</Button>
			<Modal
				visible={visible}
				title="Save"
				okText="Save"
				cancelText="Cancel"
				onCancel={handleCancel}
				onOk={() => {
					form
						.validateFields()
						.then((values) => {
							form.resetFields();
							handleSave(values);
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form
					form={form}
					name="form_in_modal"
					initialValues={{
						type: 'download',
					}}
				>
					<Form.Item
						name="name"
						label="Name"
						rules={[
							{
								required: true,
								message: 'Please input the name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input type="textarea" />
					</Form.Item>
					<Form.Item name="type">
						<Radio.Group>
							<Radio value="download">Download</Radio>
							<Radio value="saveOnline">Save online</Radio>
						</Radio.Group>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}