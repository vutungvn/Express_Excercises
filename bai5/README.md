# Express Role-Based Blog API System

Hệ thống API quản lý Blog hỗ trợ phân quyền người dùng (RBAC), Upload thumbnail bài viết và tự động xóa cascaded comments khi xóa bài viết.

---

## Danh sách Endpoints & Middleware áp dụng

| Method     | Endpoint         | Description                       | Middlewares Áp Dụng                         |
| :--------- | :--------------- | :-------------------------------- | :------------------------------------------ |
| **GET**    | `/api/posts`     | Lấy danh sách bài viết            | None                                        |
| **GET**    | `/api/posts/:id` | Lấy chi tiết bài viết kèm comment | None                                        |
| **POST**   | `/api/posts`     | Tạo bài viết mới (kèm thumbnail)  | `authenticate`, `uploadThumbnailMiddleware` |
| **DELETE** | `/api/posts/:id` | Xóa bài viết & toàn bộ comment    | `authenticate`, `authorize('admin')`        |
| **POST**   | `/api/comments`  | Tạo bình luận mới cho bài viết    | `authenticate`                              |

---

## Kịch bản Test trên Postman

### 1. Xóa bài viết thành công kèm Cascade Delete (200 OK)

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/posts/1`
- **Headers:** `Authorization: admin`
- **Expected Result:** Status `200 OK`, JSON message báo xóa bài viết và 2 bình luận liên quan thành công.

### 2. Từ chối xóa bài viết do không đủ quyền (403 Forbidden)

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/posts/2`
- **Headers:** `Authorization: user`
- **Expected Result:** Status `403 Forbidden`, Message: `"Không đủ quyền truy cập"`.

### 3. Từ chối truy cập do chưa truyền Auth Token (401 Unauthorized)

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/comments`
- **Headers:** _(Không truyền Authorization)_
- **Expected Result:** Status `401 Unauthorized`, Message: `"Chưa đăng nhập"`.

### 4. Tạo bình luận vào bài viết không tồn tại (404 Not Found)

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/comments`
- **Headers:** `Authorization: user`
- **Body (json):** `{ "postId": 999, "content": "Bình luận dạo" }`
- **Expected Result:** Status `404 Not Found`, Message: `"Không tìm thấy bài viết để bình luận"`.

### 5. Upload bài viết mới không hợp lệ do dung lượng > 2MB (400 Bad Request)

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/posts`
- **Headers:** `Authorization: user`
- **Body (form-data):** `title: Bài viết 3`, `content: Nội dung`, `thumbnail: <File > 2MB>`
- **Expected Result:** Status `400 Bad Request`, Message: `"File vượt quá dung lượng cho phép (2MB)"`.
