export function formatData( data ){
    
    var product_codes = [];
    for (var d in data.relationship_data){
        product_codes.push(data.relationship_data[d].comp_a);    
        product_codes.push(data.relationship_data[d].comp_b);
    }  
    for(var c in data.component_data){
        product_codes.push(data.component_data[c].o_code);
    }

    const unique_data = [...new Set(product_codes)];
    return unique_data;

}

export function uniqueList ( data ){

    var product_codes = [];
    for(var c in data.data){
        product_codes.push(data.data[c].code);
    }
    const unique_data = [...new Set(product_codes)];
    return unique_data;

}