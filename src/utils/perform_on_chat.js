export function GetUnread(id, messages) {
  const filtered = messages.filter((msg) => msg.user_id !== id);

  if (filtered.length === 0) return 0;

  let left = 0;
  let right = filtered.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (filtered[mid].is_read) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return filtered.length - left;
}
