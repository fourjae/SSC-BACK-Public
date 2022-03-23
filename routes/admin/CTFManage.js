const user_info = require("../../models/user_info");
const solver_table = require("../../models/month_CTF");
exports.CheckNull = function CheckNull(req) {
    const {
        Name,
        Url,
        CTFDescription,
        Date1,
        Date2,
        Public
    } = req.body;
    if (
        !Name ||
        !Url ||
        !CTFDescription ||
        !Date1 ||
        !Date2 ||
        !Public
    ) {
        return true;
    } else {
        return false;
    }
};
exports.CTF_upload = async function CTF_upload(req) {
    try{
        const {Name,Url,CTFDescription,Date1,Date2,Public} = req.body;
        await month_CTF.create({
            Name,
            Url,
            CTFDescription,
            Date1,
            Date2,
            Public
        });
        return true;
    }
    catch(error){
        console.log(error)
        return res.status(200).send('{"Error" : "Wrong"}');
    }
};

exports.CTFupdate = async function CTFupdate(req) { 
    try {
        const {Name,Url,CTFDescription,Date1,Date2,Public} = req.body;
        await user_info.update(
            {
                Name,
                Url,
                CTFDescription,
                Date1,
                Date2,
                Public
            });        
        }
        catch (err) {
            console.log(err);
    }
};
exports.pdelete = async function pdelete() {
    const {idx} =req.body.CTFNumber;
    const findidx = await month_CTF.findOne({ where: { CTFNumber: idx } });
    if (findidx) {
        return true;
    } else {
        return false;
    }
    // await models.Users.destroy(); // 문제 전부 삭제
};