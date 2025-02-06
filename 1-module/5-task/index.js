function truncate(str, maxlength) {
  return (String(str).length > maxlength) ? String(str).substring(0, maxlength-1) + '…' : str;
}
