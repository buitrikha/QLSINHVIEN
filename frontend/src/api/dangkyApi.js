async function handleResponse(res, defaultError) {
  let payload = null;
  try {
    payload = await res.json();
  } catch (_) {
    // ignore
  }

  if (!res.ok) {
    const message = payload?.error || defaultError || 'Có lỗi xảy ra';
    throw new Error(message);
  }

  return payload;
}

export async function getUpcomingClasses() {
  const res = await fetch('/api/dangky/lop-sap-mo');
  return handleResponse(res, 'Không thể lấy danh sách lớp học phần');
}

export async function registerClass({ Ma_SV, Ma_LHP }) {
  const res = await fetch('/api/dangky', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Ma_SV, Ma_LHP })
  });
  return handleResponse(res, 'Không thể đăng ký lớp học phần');
}

export async function unregisterClass(Ma_SV, Ma_LHP) {
  const res = await fetch(`/api/dangky/${encodeURIComponent(Ma_SV)}/${encodeURIComponent(Ma_LHP)}`, {
    method: 'DELETE'
  });
  return handleResponse(res, 'Không thể hủy đăng ký lớp học phần');
}

