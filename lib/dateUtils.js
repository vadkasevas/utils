formatRuDateTime = function(date) {
    if(date==null)
        return 'Не определено';
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

inDateRange = function(date,dateFrom,dateTo){
    if(dateFrom&&date&&dateFrom.getTime()>date.getTime())
        return false;
    if(dateTo&&date&&dateTo.getTime()<date.getTime())
        return false;
    return true;
};
