const reportRepository = require("../repositories/reportRepository");
const getReportSummary = async (req, res) => {

    try{

        const data = await reportRepository.getReportSummary();

        res.json({
            success:true,
            data
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
const getMonthlySales = async (req,res)=>{

    try{

        const data = await reportRepository.getMonthlySales();

        res.json({
            success:true,
            data
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
module.exports = {
    getReportSummary,
    getMonthlySales,
};