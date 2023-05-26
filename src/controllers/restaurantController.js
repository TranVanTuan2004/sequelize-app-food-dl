import { errorCode, successCode } from "../configs/Response.js";
import sequelize from "../models/index.js";
import initModels from "../models/init-models.js"
const models = initModels(sequelize);
const likeRestaurant = async (req, res) => {
    const { user_id } = req.body
    const { res_id } = req.body

    const existingLike = await models.like_res.findOne({
        where: {
            user_id,
            res_id
        }
    })
    if (existingLike) {
        try {
            const data = await models.like_res.destroy({
                where: { user_id, res_id }
            })
            successCode(res, data, "unLike thành công")
        } catch {
            errorCode(res, "Lỗi BE")
        }
    } else {
        // Tạo một like mới
        try {
            const data = await models.like_res.create({ user_id, res_id })
            successCode(res, data, "Like thành công")
        } catch {
            errorCode(res, "Lỗi BE")
        }
    }

}

const layDanhSachLikeTheoNhahang = async (req, res) => {
    const { id } = req.params
    const data = await models.like_res.findAll({
        where: {
            res_id: id
        },
        include: ["user"]
    })
    successCode(res, data)
}


const danhGiaNhaHang = async (req, res) => {
    try {
        let { userId, resId, danhGia } = req.body
        let newDanhGia = {
            user_id: userId,
            res_id: resId,
            amount: danhGia,
            date_rate: new Date()
        }
        // kiểm tra user đã danh giá chưa nếu đánh giá rồi thì update giá trị còn chưa thì tạo đánh giá mới
        const checkRated_res = await models.rate_res.findOne({
            where: {
                user_id: userId,
                res_id: resId
            }
        })
        if (checkRated_res) {
            const updatedDanhGia = await models.rate_res.update(newDanhGia, {
                where: {
                    user_id: userId,
                    res_id: resId
                }
            });
            successCode(res, newDanhGia, "Update đánh giá thành công")
        } else {
            const data = await models.rate_res.create(newDanhGia)
            successCode(res, data, "Đánh giá Thành công")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi BE")
    }
}

// lấy danh sách đánh giá theo nhà hàng

const layDanhSachDanhGiaTheoNhaHang = async (req, res) => {
    const { idNhaHang } = req.query
    const data = await models.rate_res.findAll({
        where: {
            res_id: idNhaHang,
        },
        include: [
            {
                model: models.restaurant,
                as: 're',
                attributes: ['res_name']
            }, "user"],
    })
    successCode(res, data)
}


export {
    likeRestaurant,
    layDanhSachLikeTheoNhahang,
    danhGiaNhaHang,
    layDanhSachDanhGiaTheoNhaHang
}