import { updateAction } from "../../../../redux/actions/baseAction";
import { updateData } from "../../../../services/baseService";


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


