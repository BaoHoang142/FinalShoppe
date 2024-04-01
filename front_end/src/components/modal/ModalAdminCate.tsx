import React, { useState } from "react";
import { Button, Modal, Space, notification } from "antd";
import axios from "axios";
interface ModalAntdProps {
  data: any; // Kiểu dữ liệu chính xác cho 'data'
  check: () => void; // Kiểu dữ liệu chính xác cho 'check'
  // Các thuộc tính khác mà 'ModalAntd' chấp nhận
  // ...
}
const ModalAdminCate: React.FC<ModalAntdProps> = ({ data, check }) => {
  const [open, setOpen] = useState(false);

  const deleteCategory = async (data: string) => {
      try {
        await axios.delete(`http://localhost:8080/api/v1/categories/${data}`);
        notification.success({
          message: "Xoá mặt hàng thành công!",
          placement: "top",
          duration: 2,
        });
        check();
      } catch (error) {
        console.log(error);
      } 
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    deleteCategory(data);
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
        title="Bạn có muốn xóa loại mặt hàng này không?"
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};

export default ModalAdminCate;
