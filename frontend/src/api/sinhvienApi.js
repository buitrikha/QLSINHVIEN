// API CRUD cho Sinh viên
export async function getSinhviens() {
  const res = await fetch('/api/sinhvien');
  if (!res.ok) throw new Error("Không thể lấy danh sách sinh viên");
  return res.json();
}

export async function addSinhvien(sv) {
  const res = await fetch('/api/sinhvien', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sv),
  });
  if (!res.ok) throw new Error("Không thể thêm sinh viên");
  return res.json();
}

export async function updateSinhvien(id, sv) {
  const res = await fetch(`/api/sinhvien/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sv),
  });
  if (!res.ok) throw new Error("Không thể cập nhật sinh viên");
  return res.json();
}

export async function deleteSinhvien(id) {
  const res = await fetch(`/api/sinhvien/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Không thể xóa sinh viên");
  return res.json();
}