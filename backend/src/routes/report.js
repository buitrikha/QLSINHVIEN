const express = require('express');
const controller = require('../controllers/report.controller');
const router = express.Router();

// 1. Sinh viên điểm CK cao nhất
router.get('/sv-diem-ck-max', controller.sv_diem_ck_max);

// 2. Môn học chưa có lớp học phần nào
router.get('/mh-chua-co-lophp', controller.mh_chua_co_lophp);

// 3. Sinh viên CNTT chưa đăng ký môn "Cơ sở dữ liệu"
router.get('/sv-cntt-chua-dk-csdldata', controller.sv_cntt_chua_dk_csdldata);

// 4. Sinh viên trong lớp theo tên giảm dần
// Sử dụng query param: /sv-in-lop-sort-desc?Ten_Lop=<tên lớp>
router.get('/sv-in-lop-sort-desc', controller.sv_in_lop_sort_desc);

// 5. Liệt kê môn học SV đã đăng ký cùng thông tin
// Sử dụng param: /sv-mon-dang-ky/:Ma_SV
router.get('/sv-mon-dang-ky/:Ma_SV', controller.sv_mon_dang_ky);

// 6. Tính GPA cho sinh viên theo học kỳ cụ thể
// Sử dụng query param: /gpa-by-hk?Ma_HK=<mã học kỳ>
router.get('/gpa-by-hk', controller.gpa_by_hk);

// 7. Thống kê GPA theo học kỳ từ view
// Sử dụng query param: /view-gpa-by-hk?Ma_HK=<mã học kỳ>
router.get('/view-gpa-by-hk', controller.view_gpa_by_hk);

// 8. Truy vấn chi tiết bảng điểm sinh viên (view)
// Sử dụng param: /bangdiem-chitiet/:Ma_SV
router.get('/bangdiem-chitiet/:Ma_SV', controller.view_bangdiem_chitiet);

// 9. Truy vấn lớp học phần còn chỗ (view)
router.get('/lhp-con-trong', controller.view_lhp_con_trong);

// 10. Truy vấn sinh viên nợ môn theo học kỳ (view)
// Sử dụng query param: /sv-no-mon?Ma_HK=<mã học kỳ>
router.get('/sv-no-mon', controller.view_sv_no_mon);

module.exports = router;