// API CRUD cho Môn học
export async function getMonhocs() {
  const res = await fetch('/api/monhoc');
  if (!res.ok) throw new Error("Không thể lấy danh sách môn học");
  return res.json();
}

export async function addMonhoc(mh) {
  const res = await fetch('/api/monhoc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mh),
  });
  if (!res.ok) throw new Error("Không thể thêm môn học");
  return res.json();
}

export async function updateMonhoc(id, mh) {
  const res = await fetch(`/api/monhoc/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mh),
  });
  if (!res.ok) throw new Error("Không thể cập nhật môn học");
  return res.json();
}

export async function deleteMonhoc(id) {
  const res = await fetch(`/api/monhoc/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Không thể xóa môn học");
  return res.json();
}