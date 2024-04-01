import React, { useState } from "react";
import { Button, Modal, Space, notification } from "antd";
import axios from "axios";
interface ModalAntdProps {
  data: any; // Kiểu dữ liệu chính xác cho 'data'
  check: () => void; // Kiểu dữ liệu chính xác cho 'check'
  // Các thuộc tính khác mà 'ModalAntd' chấp nhận
  // ...
}
const ModalAntd: React.FC<ModalAntdProps> = ({ data, check }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (data: number) => {
    try {
      let response = await axios.delete(
        `http://localhost:8080/api/v1/carts/${data}`
      );
      if (response.data.status === 200) {
        notification.success({
          message: "Sản phẩm đã được xóa khỏi Giỏ hàng!",
          placement: "top",
          duration: 2,
        });
        check();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handleDelete(data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" style={{backgroundColor: "red",fontWeight: "bold"}} onClick={showModal}>
        Xóa
      </Button>
      <Modal
        open={open}
        style={{
          top: 20,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
        title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng không"
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};

export default ModalAntd;
