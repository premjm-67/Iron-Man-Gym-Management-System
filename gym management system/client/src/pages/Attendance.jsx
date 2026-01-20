import "./attendance.css";

export default function Attendance() {
  const membership = {
    plan: "6 Months",
    status: "Active",
    startDate: "01 Jan 2025",
    endDate: "30 Jun 2025",
    totalDays: 180,
    attendedDays: 42,
  };

  const attendanceHistory = [
    "02 Jan 2025",
    "03 Jan 2025",
    "05 Jan 2025",
    "06 Jan 2025",
    "08 Jan 2025",
  ];

  const remainingDays =
    membership.totalDays - membership.attendedDays;

  return (
    <div className="attendance-page">
      {/* HEADER */}
      <div className="attendance-header">
        <h1>Attendance</h1>
        <p>Monitor your gym visits and membership usage</p>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="summary-box">
          <span className="label">Membership</span>
          <h3>{membership.plan}</h3>
          <span className={`status ${membership.status.toLowerCase()}`}>
            {membership.status}
          </span>
        </div>

        <div className="summary-box">
          <span className="label">Attended</span>
          <h3>{membership.attendedDays} Days</h3>
        </div>

        <div className="summary-box">
          <span className="label">Remaining</span>
          <h3>{remainingDays} Days</h3>
        </div>

        <div className="summary-box">
          <span className="label">Validity</span>
          <h3>
            {membership.startDate} – {membership.endDate}
          </h3>
        </div>
      </div>

      {/* HISTORY */}
      <div className="history-card">
        <h2>Recent Attendance</h2>

        {attendanceHistory.length === 0 ? (
          <p className="empty">No attendance recorded yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((date, i) => (
                <tr key={i}>
                  <td>{date}</td>
                  <td className="present">Present</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
