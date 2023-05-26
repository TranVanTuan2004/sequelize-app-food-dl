import express from "express"
import { danhGiaNhaHang, layDanhSachDanhGiaTheoNhaHang, layDanhSachLikeTheoNhahang, likeRestaurant } from "../controllers/restaurantController.js"

const restaurantRouter = express.Router()

restaurantRouter.post("/like-restaurant", likeRestaurant)
restaurantRouter.get("/layDanhSachLikeTheoNhaHang/:id", layDanhSachLikeTheoNhahang)
restaurantRouter.post("/danhGiaNhaHang", danhGiaNhaHang)
restaurantRouter.get("/layDanhSachDanhGiaTheoNhaHang", layDanhSachDanhGiaTheoNhaHang)

export default restaurantRouter