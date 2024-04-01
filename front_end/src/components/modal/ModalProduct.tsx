import React, { useState } from "react";
import { Button, Modal, Space, notification } from "antd";
import axios from "axios";
interface ModalAntdProps {
  data: any; // Kiểu dữ liệu chính xác cho 'data'
  checkProduct: () => void; // Kiểu dữ liệu chính xác cho 'check'
  // Các thuộc tính khác mà 'ModalAntd' chấp nhận
  // ...
}
const ModalProdudct: React.FC<ModalAntdProps> = ({ data, checkProduct }) => {
  const [open, setOpen] = useState(false);

  const deleteProduct = async (data: any) => {
      try {
        await axios.delete(`http://localhost:8080/api/v1/products/${data}`);
        notification.success({
          message: "Xoá sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
        checkProduct();
      } catch (error) {
        console.log(error);
      }
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    deleteProduct(data);
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
        title="Bạn có muốn xóa sản phẩm khỏi cửa hàng không?"
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};

export default ModalProdudct;
