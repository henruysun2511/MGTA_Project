import { Checkbox } from "antd";

export default function PermissionCard({ permissionData, checked, onChange }) {
    return (
        <>
            <div className="permission__item">
                <div className="permission__commom">
                    <div className="permission__method">{permissionData.method}</div>
                    <div className="permission__info">
                        <h3>{permissionData.name}</h3>
                        <p>{permissionData.apiPath}</p>
                    </div>
                </div>
                <div className='permission__action'>
                    <Checkbox
                        checked={checked}
                        onChange={(e) => onChange(permissionData._id, e.target.checked)}
                    />
                </div>
            </div>
        </>
    )
}