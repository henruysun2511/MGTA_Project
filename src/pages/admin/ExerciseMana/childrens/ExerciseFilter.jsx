import { EditOutlined } from "@ant-design/icons";
import { Checkbox, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useDebounce from "../../../../hooks/useDebounce";

export default function ExcerciseFilter({ skillData, onFilterChange }) {
  const { Search } = Input;
  const dispatch = useDispatch();


  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    onFilterChange({ title: debouncedSearch });
  }, [debouncedSearch]);

  const handleChangeSkill = (selectedSkills) => {
    const params = {};
    if (selectedSkills && selectedSkills.length > 0) {
      params.skillName = selectedSkills;
    } else {
      params.skillName = undefined;
    }
    onFilterChange(params);
  };

  const uniqueSkills = Array.from(
    new Map(skillData?.map(item => [item.skillName, item])).values()
  );

  const skillOptions = uniqueSkills.map(item => ({
    value: item.skillName,
    label: item.skillName
  }));

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: "20px" }}>
        <Search
          placeholder="Tìm kiếm bài tập"
          size="large"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "100%" }}
        />
        <Space direction="horizontal" size="large">
          <p>Kỹ năng:</p>
          <Checkbox.Group options={skillOptions} onChange={handleChangeSkill} />
          <Link to={"/admin/skillMana"}><EditOutlined /></Link>
        </Space>

      </div>

    </>
  );
}