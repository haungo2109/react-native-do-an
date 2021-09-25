
const converObjToFormData = (items={})=>{
    var form_data = new FormData();
    for (var key in items) {
        form_data.append(key, items[key]);
    }
    return form_data;
}

export default converObjToFormData;