/*CREATE OR REPLACE FUNCTION doStockLevel(w_id,d_id,threshold) LANGUAGE JAVASCRIPT AS "doStockLevel" AT "udftestlib1" ;
EXECUTE FUNCTION doStockLevel(1,10,15);
*/


function doStockLevel(w_id,d_id,threshold){

        var params = [w_id, d_id];
        var query = N1QL('SELECT D_NEXT_O_ID FROM default:default.tpcc.DISTRICT WHERE D_W_ID = $1 AND D_ID = $2',params);
        var result = [];
        for (const row of query) {
             result.push(row);
        }
        
        var  o_id = result[0]['D_NEXT_O_ID'];
        params = [w_id, d_id, o_id, (o_id - 20), w_id, threshold];
        query = N1QL('SELECT COUNT(DISTINCT(o.OL_I_ID)) AS CNT_OL_I_ID FROM  default:default.tpcc.ORDER_LINE o INNER JOIN default:default.tpcc.STOCK s ON (o.OL_W_ID == s.S_W_ID AND o.OL_I_ID ==  s.S_I_ID) WHERE o.OL_W_ID = $1 AND o.OL_D_ID = $2 AND o.OL_O_ID < $3 AND o.OL_O_ID >= $4 AND s.S_QUANTITY < $6',params);
        var result = [];
        for (const row of query) {
             result.push(row);
         }
        return result;
}
