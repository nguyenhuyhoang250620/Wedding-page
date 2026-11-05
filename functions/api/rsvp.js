function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.RSVP_DB) {
    console.error('The RSVP_DB D1 binding is not configured.');
    return jsonResponse({ error: 'Dịch vụ xác nhận hiện chưa được cấu hình.' }, 500);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Dữ liệu gửi lên phải có định dạng JSON.' }, 415);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Dữ liệu gửi lên không hợp lệ.' }, 400);
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return jsonResponse({ error: 'Dữ liệu gửi lên không hợp lệ.' }, 400);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const attendance = payload.attendance;
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';

  if (!name || name.length > 120) {
    return jsonResponse({ error: 'Vui lòng nhập họ tên không quá 120 ký tự.' }, 400);
  }

  if (attendance !== 'yes' && attendance !== 'no') {
    return jsonResponse({ error: 'Vui lòng chọn trạng thái tham dự hợp lệ.' }, 400);
  }

  if (phone && !/^[0-9\s\+\-\(\)]{1,20}$/.test(phone)) {
    return jsonResponse({ error: 'Số điện thoại không hợp lệ.' }, 400);
  }

  let guests = 0;
  if (attendance === 'yes') {
    guests = Number(payload.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 3) {
      return jsonResponse({ error: 'Số người tham dự phải từ 1 đến 3.' }, 400);
    }
  }

  try {
    await env.RSVP_DB
      .prepare(
        'INSERT INTO rsvps (name, attendance, guests, phone) VALUES (?, ?, ?, ?)'
      )
      .bind(name, attendance, guests, phone)
      .run();

    return jsonResponse({ ok: true, message: 'Đã lưu xác nhận của bạn.' }, 201);
  } catch (error) {
    console.error('Unable to save RSVP to D1.', error);
    return jsonResponse({ error: 'Không thể lưu xác nhận lúc này. Vui lòng thử lại.' }, 500);
  }
}
