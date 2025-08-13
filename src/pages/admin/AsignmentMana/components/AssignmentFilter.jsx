import { Checkbox, Input, Select, Space } from "antd";

export default function AssignmentFilter({ skillOptions, classOptions, onSearch, onSkillChange, onClassChange }) {
  const { Search } = Input;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: "20px" }}>
        <Search
          placeholder="Tìm kiếm bài tập"
          size="large"
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
        <Space direction="horizontal">
          <p>Kỹ năng:</p>
          <Checkbox.Group options={skillOptions} onChange={onSkillChange} />
        </Space>

        <Space direction="horizontal">
          <p>Lớp:</p>
          <Select
            size="large"
            defaultValue="all"
            options={classOptions}
            onChange={onClassChange}
            style={{ width: 200 }}
          />
        </Space>
      </div>

    </>
  );
}