// API CRUD cho Giảng viên
export async function getGiangviens() {
  const res = await fetch('/api/giangvien');
  if (!res.ok) throw new Error("Không thể lấy danh sách giảng viên");
  return res.json();
}

export async function addGiangvien(gv) {
  const res = await fetch('/api/giangvien', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gv),
  });
  if (!res.ok) throw new Error("Không thể thêm giảng viên");
  return res.json();
}

export async function updateGiangvien(id, gv) {
  const res = await fetch(`/api/giangvien/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gv),
  });
  if (!res.ok) throw new Error("Không thể cập nhật giảng viên");
  return res.json();
}

export async function deleteGiangvien(id) {
  const res = await fetch(`/api/giangvien/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Không thể xóa giảng viên");
  return res.json();
}