export const getMonthlyrevenue=(orders)=>{
    const monthlyrevenue={}
    orders.forEach((order)=>{
        if(!order.date){
            return;
        }
        const month=new Date(order.date).toLocaleString("default",{
            month:"short",
        });
        if(!monthlyrevenue[month]){
            monthlyrevenue[month]=0;
        };
        monthlyrevenue[month]=monthlyrevenue[month]+Number(order.total);
    })
    

    return Object.entries(monthlyrevenue).map(([month,revenue])=>{
        return {
            month:month,
            revenue:revenue
        }
    })
};