import { Input, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../../../../../hooks/usePagination";
import { fetchAction } from "../../../../../redux/actions/baseAction";
import { getAllData } from "../../../../../services/baseService";
const { Search } = Input;
const { Column } = Table;

export default function ExerciseNotSubmitTable({ exerciseData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllData("results").then((res) => dispatch(fetchAction("results", res)));
    getAllData("students").then((res) => dispatch(fetchAction("students", res)));
    getAllData("deadlines").then((res) => dispatch(fetchAction("deadlines", res)));
    getAllData("classes").then((res) => dispatch(fetchAction("classes", res)));
  }, [dispatch]);

  const resultData = useSelector((state) => state.results.list);
  const classData = useSelector((state) => state.classes.list);
  const deadlineData = useSelector((state) => state.deadlines.list);
  const studentData = useSelector((state) => state.students.list);

  // --- State filter ---
  const [filters, setFilters] = useState({
    keyword: "",
    classId: "all",
  });

  // Lấy các deadline của bài tập này
  const deadlinesByExercise = deadlineData.filter(
    (dl) => String(dl.exerciseId) === String(exerciseData[0].id)
  );

  // Lấy danh sách classId từ deadlines
  const classIds = deadlinesByExercise.map((dl) => dl.classId);

  // Lấy danh sách học sinh thuộc các lớp đó
  const classStudents = studentData.filter((st) =>
    classIds.includes(st.classId)
  );

  // Lấy kết quả nộp của bài tập này
  const resultsByExercise = resultData.filter(
    (rs) => String(rs.exerciseId) === String(exerciseData[0].id)
  );
  const submittedIds = resultsByExercise.map((rs) => rs.studentId);

  // Học sinh chưa nộp
  let notSubmitted = classStudents.filter(
    (st) => !submittedIds.includes(st.id)
  );

  // --- Apply filter ---
  if (filters.classId !== "all") {
    notSubmitted = notSubmitted.filter((st) => st.classId === filters.classId);
  }
  if (filters.keyword) {
    notSubmitted = notSubmitted.filter((st) =>
      st.name.toLowerCase().includes(filters.keyword.toLowerCase())
    );
  }

  // Lấy ra thông tin lớp từ classData theo classIds
  const classesOfExercise = classData.filter((cl) =>
    classIds.includes(cl.id)
  );

  const classOptions = [
    { value: "all", label: "Tất cả" },
    ...classesOfExercise.map((item) => ({
      value: item.id,
      label: item.className,
    })),
  ];

  const { getPagination, getIndex } = usePagination(10);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Search
          placeholder="Tìm kiếm học sinh"
          size="large"
          style={{ width: "50%" }}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, keyword: e.target.value }))
          }
        />
        <Space direction="horizontal">
          <p>Lớp: </p>
          <Select
            options={classOptions}
            size="large"
            defaultValue={"all"}
            style={{ width: "200px", fontSize: "18px" }}
            onChange={(value) => setFilters((prev) => ({ ...prev, classId: value }))}
          />
        </Space>
      </div>

      <Table
        dataSource={notSubmitted}
        pagination={getPagination(notSubmitted.length)}
        rowKey="id"
      >
        <Column
          title="STT"
          key="index"
          render={(text, record, index) => getIndex(index)}
        />
        <Column title="Họ và tên" dataIndex="name" key="name" />
        <Column title="Lớp" dataIndex="class" key="class" />
      </Table>
    </Space>
  );
}