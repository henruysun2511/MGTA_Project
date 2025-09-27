import useFetch from "../../../../hooks/useFetch";
import { formatDuration } from "../../../../utils/formatDate";

export default function ExerciseDetailRanking({ exerciseId }) {
    const [data] = useFetch(`exercise/ranking/${exerciseId}`, {}, {});
    const results = data || []; 

    return (
        <div className="rank">
            <h2>🏆 BẢNG XẾP HẠNG</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hạng</th>
                        <th>Học sinh</th>
                        <th>Thời gian hoàn thành</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results
                            .map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.studentId?.name}</td>
                                    <td>{formatDuration(item.duration)}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="4">Chưa có dữ liệu xếp hạng</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}