import { errorCode, successCode } from "../configs/Response.js";
import sequelize from "../models/index.js";
import initModels from "../models/init-models.js"
const models = initModels(sequelize);
const layDanhSachLikeTheoNguoiDung = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.like_res.findAll({
            where: {
                user_id: id
            },
            include: ["re"]
        })
        if (data.length === 0) {
            successCode(res, data, 'Người dùng này chưa like nhà hàng nào')
        } else {
            successCode(res, data, "Lấy danh sách like thành công")
        }
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const layDanhSachDanhGiaTheoNguoiDung = async (req, res) => {
    try {
        const { idUser } = req.query
        const data = await models.rate_res.findAll({
            where: {
                user_id: idUser
            },
            include: ["re"]
        })
        if (data.length === 0) {
            successCode(res, data, "Người dùng này chưa có đánh giá nào")
        } else {
            successCode(res, data, "Lấy đánh giá người dùng thành công")
        }
    } catch {
        errorCode("Lỗi BE")
    }

}

const nguoiDungDatMon = async (req, res) => {
    try {
        const {userId, foodId, amount, code, arrSubId} = req.body
        const newFood = {
            user_id: userId,
            food_id: foodId,
            amount: amount,
            code: code,
            arr_sub_id: arrSubId
        }
        const data = await models.order.create(newFood)
        successCode(res, data, "Đặt món thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

export {
    layDanhSachLikeTheoNguoiDung,
    layDanhSachDanhGiaTheoNguoiDung,
    nguoiDungDatMon
}