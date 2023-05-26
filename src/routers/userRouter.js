import express from "express"
import { layDanhSachDanhGiaTheoNguoiDung, layDanhSachLikeTheoNguoiDung, nguoiDungDatMon } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.get("/layDanhSachLikeTheoNguoiDung/:id", layDanhSachLikeTheoNguoiDung)
userRouter.get("/layDanhSachDanhGiaTheoNguoiDung", layDanhSachDanhGiaTheoNguoiDung)
userRouter.post("/nguoiDungDatMon", nguoiDungDatMon)


export default userRouter