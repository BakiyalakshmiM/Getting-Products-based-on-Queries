const {Product} = require("../models/product")

const getAllProducts = async (req, res, next)=>{
    // throw new Error("Testing express-async-errors")
    console.log(req.query)
    let queryObj = {};
    let {featured, name, company, sort, field, limit, page, numericField} = req.query
    if(featured){
        queryObj["featured"] = featured === "true" ? true : false 
    }
    if(name){
        queryObj["name"] = {$regex: name, $options: 'i'}
    }
    if(company){
        queryObj["company"] = company
    }
    if(numericField){
        let regex = /(<=|>=|=|<|>)/g
        let operationMap = {
            "<=": "$lte",
            "<" : "$lt",
            ">=": "$gte",
            ">" : "$gt",
            "=" : "$eq"
        }
        let filters = numericField.replace(regex, (match)=>{
            console.log(match)
            return "-"+operationMap[match]+"-";
        })
        console.log(filters)
        let fieldValues = ["price", "rating"];
        filters.split(",").forEach((item)=>{
            let [tag,operator,value] = item.split("-")
            if(fieldValues.includes(tag)){
                queryObj[tag] = { [operator] : Number(value)}
                console.log(queryObj[tag])
            }
        })
    }
    sort = sort ? sort : ""
    field = field ? field.replace(",", " ") : "";
    limit = limit ? Number(limit) : 0;
    page = page ? Number(page) : 1;
    let skip = Math.abs(page - 1)*limit
    let products = await Product.find(queryObj).sort(sort).select(field).limit(limit).skip(skip);
    res.status(200).json({nhits : products.length, products})
}

const getAllProductsStatic = async (req, res, next)=>{
    let getProduct = await Product.find({})
    res.status(200).json({nhits : getProduct.length, products: getProduct})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}