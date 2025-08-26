import { deleteAction, updateAction } from "../../../../redux/actions/baseAction";
import { deleteData, updateData } from "../../../../services/baseService";


export const handleDelete = async (dispatch, path, id) => {
    const res = deleteData(dispatch, path, id);
    if (res) {
        dispatch(deleteAction(path, res.id));
        alert("Đã xóa vĩnh viễn");
    }
    else {
        alert("Không thể xóa");
    }
}

export const handleRestore = async (dispatch, path, id, options) => {
    const res = await updateData(path, id, options);
    if (res) {
        dispatch(updateAction(path, res));
        alert("Đã khôi phục");
    } else {
        alert("Không thể khôi phục");
    }
}

export const handleRestoreAll = async (dispatch, path, list,) => {
    for (const item of list) {
        const res = await updateData(path, item.id, { ...item, deleted: false });
        if (res) {
            dispatch(updateAction(path, res));
        }
    }
    alert("Khôi phục danh sách thành công!");
}

export const handleDeleteAll = async (dispatch, path, list,) => {
    for (const item of list) {
        const res = await deleteData(path, item.id);
        if (res) {
            dispatch(deleteAction(path, res.id));
        }
    }
    alert("Khôi phục danh sách thành công!");
}

