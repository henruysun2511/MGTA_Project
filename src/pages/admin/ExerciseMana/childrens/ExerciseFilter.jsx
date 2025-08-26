import { Checkbox, Input, Space } from "antd";
import { useDispatch } from "react-redux";

export default function ExcerciseFilter({ skillOptions, onFilterChange }) {
  const { Search } = Input;
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    onFilterChange({ keyword: e.target.value });
  };

  const handleChangeSkill = (selectedSkills) => {
    onFilterChange({ skills: selectedSkills });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: "20px" }}>
        <Search
          placeholder="Tìm kiếm bài tập"
          size="large"
          onChange={handleChangeSearch}
          style={{ width: "100%" }}
        />
        <Space direction="horizontal">
          <p>Kỹ năng:</p>
          <Checkbox.Group options={skillOptions} onChange={handleChangeSkill} />
        </Space>

      </div>

    </>
  );
}