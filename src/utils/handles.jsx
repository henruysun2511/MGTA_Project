import { createAction, deleteAction, updateAction } from "../redux/actions/baseAction";
import { createData, createImageData, deleteData, updateData } from "../services/baseService";
import { alertConfirm, alertError, alertSuccess } from "./alerts";


export const handleCreate = async (dispatch, apiPath, reduxPath, options, onSuccess) => {
    try {
        const res = await createData(apiPath, options);
        if (res.statusCode === 201) {
            dispatch(createAction(reduxPath, res.data));
            alertSuccess(res.message);
            if (onSuccess) onSuccess();
        } else {
            alertError(res.message);
        }
        console.log(res);
    } catch (err) {
        console.error(err);
        alertError("Có lỗi xảy ra khi thêm. Vui lòng thử lại!");
    }
}

export const handleUpdate = async (dispatch, apiPath, reduxPath, id, options, onCancel) => {
    try {
        const res = await updateData(apiPath, id, options);
        console.log(res);
        if (res.statusCode === 200) {
            dispatch(updateAction(reduxPath, res.data));
            alertSuccess(res.message);
            if (onCancel) onCancel();
        } else {
            alertError(res.message);
        }
    } catch (err) {
        console.error(err);
        alertError("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!");
    }
}

export const handleRestoreAll = async (dispatch, apiPath, reduxPath, list) => {
    try {
        const result = await alertConfirm(
            "Xác nhận khôi phục tất cả?",
            "",
            "Xóa",
            "Hủy"
        );
        if (result.isConfirmed) {
            for (const item of list) {
                const res = await updateData(apiPath, item._id, { ...item, deleted: false });
                console.log(res);
                if (res.statusCode === 200) {
                    dispatch(updateAction(reduxPath, res.data));
                    alertSuccess(res.message);
                } else {
                    alertError(res.message);
                }
            }
        }

    } catch (err) {
        console.error(err);
        alertError("Có lỗi xảy ra khi khôi phục. Vui lòng thử lại!");
    }
}

export const handleDelete = async (dispatch, apiPath, reduxPath, id, name) => {
    try {
        const result = await alertConfirm(
            "Xác nhận xóa?",
            `Bạn có chắc muốn xóa "${name}" không?`,
            "Xóa",
            "Hủy"
        );
        if (result.isConfirmed) {
            const res = await deleteData(apiPath, id);
            console.log(res);
            if (res.statusCode === 200) {
                dispatch(deleteAction(reduxPath, res.data._id));
                alertSuccess(res.message);
            } else {
                alertError(res.message);
            }
        } else {
            return;
        }
    } catch (err) {
        console.error(err);
        alertError("Có lỗi xảy ra khi xóa. Vui lòng thử lại!");
    }
}

export const handleDeleteAll = async (dispatch, apiPath, reduxPath, list) => {
    try {
        const result = await alertConfirm(
            "Xóa vĩnh viễn tất cả?",
            "",
            "Xóa",
            "Hủy"
        );
        if (result.isConfirmed) {
            for (const item of list) {
                const res = await deleteData(apiPath, item._id);
                console.log(res);
                if (res) {
                    dispatch(deleteAction(reduxPath, res.data._id));
                    alertSuccess(res.message);
                }else{
                    alertError(res.message);
                }
            }
        }
    } catch (err) {
        console.error(err);
        alertError("Có lỗi xảy ra khi xóa. Vui lòng thử lại!");
    }
}

export const handleUploadImage = async (files, setLoading) => {
    try {
        setLoading(true);

        if (!files || files.length === 0) {
            setLoading(false);
            return [];
        }

        const formData = new FormData();

        // Nếu chỉ có 1 file
        if (files.length === 1) {
            formData.append("image", files[0].originFileObj);
        } else {
            // Nếu nhiều file
            files.forEach((file) => {
                formData.append("images", file.originFileObj);
            });
        }

        for (let [key, value] of formData.entries()) {
            console.log("FormData:", key, value);
        }

        const endpoint = files.length === 1 ? "upload" : "upload/uploads";
        const res = await createImageData(endpoint, formData);
        if (res.statusCode === 200) {
            alertSuccess(res.message);
        } else {
            alertSuccess(res.message);
        }
        setLoading(false);
        return res.data || [];

    } catch (err) {
        setLoading(false);
        console.error(err);
        alertError("Có lỗi xảy ra khi up ảnh. Vui lòng thử lại!");
    }
};







