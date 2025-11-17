// pages/404.jsx

import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Trang này không tồn tại</h1>
      <Link href="/">
        Quay về Trang chủ
      </Link>
    </div>
  );
}