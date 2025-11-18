// Lấy danh sách sinh viên điểm CK cao nhất
export async function getSvDiemCkMax() {
  const res = await fetch('/api/report/sv-diem-ck-max');
  if (!res.ok) throw new Error("Không thể lấy sinh viên điểm CK cao nhất");
  return res.json();
}

// Lấy môn học chưa có lớp học phần nào
export async function getMhChuaCoLopHP() {
  const res = await fetch('/api/report/mh-chua-co-lophp');
  if (!res.ok) throw new Error("Không thể lấy môn học chưa có lớp");
  return res.json();
}

// Sinh viên CNTT chưa đăng ký môn "Cơ sở dữ liệu"
export async function getSvCnttChuaDkCSDL() {
  const res = await fetch('/api/report/sv-cntt-chua-dk-csdldata');
  if (!res.ok) throw new Error("Không thể lấy sinh viên CNTT chưa đăng ký CSDL");
  return res.json();
}

// SV trong lớp theo tên giảm dần
export async function getSvInLopSortDesc(tenLop) {
  const res = await fetch(`/api/report/sv-in-lop-sort-desc?Ten_Lop=${encodeURIComponent(tenLop)}`);
  if (!res.ok) throw new Error("Không thể lấy sinh viên trong lớp");
  return res.json();
}

// Liệt kê môn học SV đã đăng ký
export async function getSvMonDangKy(maSV) {
  const res = await fetch(`/api/report/sv-mon-dang-ky/${maSV}`);
  if (!res.ok) throw new Error("Không thể lấy môn học SV đã đăng ký");
  return res.json();
}

// Tính GPA theo học kỳ
export async function getGpaByHK(maHK) {
  const res = await fetch(`/api/report/gpa-by-hk?Ma_HK=${encodeURIComponent(maHK)}`);
  if (!res.ok) throw new Error("Không thể tính GPA");
  return res.json();
}

// Thống kê GPA theo học kỳ từ view
export async function getViewGpaByHK(maHK) {
  const res = await fetch(`/api/report/view-gpa-by-hk?Ma_HK=${encodeURIComponent(maHK)}`);
  if (!res.ok) throw new Error("Không thể lấy thống kê GPA");
  return res.json();
}

// Chi tiết bảng điểm sinh viên
export async function getBangDiemChiTiet(maSV) {
  const res = await fetch(`/api/report/bangdiem-chitiet/${maSV}`);
  if (!res.ok) throw new Error("Không thể lấy bảng điểm chi tiết");
  return res.json();
}

// Lớp học phần còn chỗ
export async function getLhpConTrong() {
  const res = await fetch('/api/report/lhp-con-trong');
  if (!res.ok) throw new Error("Không thể lấy lớp học phần còn chỗ");
  return res.json();
}

// Sinh viên nợ môn theo học kỳ
export async function getSvNoMon(maHK) {
  const res = await fetch(`/api/report/sv-no-mon?Ma_HK=${encodeURIComponent(maHK)}`);
  if (!res.ok) throw new Error("Không thể lấy sinh viên nợ môn");
  return res.json();
}