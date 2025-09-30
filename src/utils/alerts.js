import Swal from "sweetalert2";

export const alertSuccess = (title = "Thành công", text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
  });
};

export const alertError = (title = "Thất bại", text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Thử lại",
  });
};

export const alertWarning = (title = "Cảnh báo", text = "") => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "OK",
  });
};

export const alertInfo = (title = "Thông tin", text = "") => {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonText: "OK",
  });
};

export const alertConfirm = (
  title = "Bạn có chắc chắn?",
  text = "Hành động này không thể hoàn tác!",
  confirmText = "Xác nhận",
  cancelText = "Hủy"
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};