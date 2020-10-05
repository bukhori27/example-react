const dayoff = require('./dayoff.json');
const harboltong = require('./harboltong.json');
import dayjs from 'dayjs'
class Helper {  
    constructor() {
        this.currentDate = null;
        this.startDate = null;
        this.endDate = null;
        this.listRangeDays = [];
        this.startShipping = [];
        this.textCurrentDate = "";
    }
    checkFormat(value) {
        if (typeof(value)==='number') {
            let val = (value / 1).toFixed(0).replace(',', '.')
            return 'Rp' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
        return value;
        
    }
    formatTracker(index) {
        if (index.length > 40) {
            return index.substr(0, 40) 
        }
        return index.replace(/ /g,"_");
    }   
    formatelipsis(index) {
        if (index.length > 40) {
            return index.substr(0, 40) + '...'
        }
        return index;
    }   
    formatElipsisCustom(index, lenght) {
        if (index.length > lenght) {
            return index.substr(0, lenght) + '...'
        }
        return index;
        
    }   
    replaceTagHTMLTotext (index){
        return index.replace(/(<([^>]+)>)/ig, "");
    }

    formatbank(index) {
        if (index) {
            return index.substring(0, 4) + ' ' + index.substring(4, 8) + ' ' + index.substring(8, 12) + ' ' + index.substring(12, 20);
        }
        return index;
    } 
    changeDateDetail (date) {
        const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        let dump = new Date(date)
        let dd = dump.getDate()
        if (dd < 10) dd = '0' + dd
        let mm = month[dump.getMonth()]
        let yyyy = dump.getFullYear()
        let day = days[dump.getDay()]
        let hh = dump.getHours()
        if (hh < 10) hh = '0' + hh
        let mn = dump.getMinutes()
        if (mn < 10) mn = '0' + mn
        return day + ', ' + dd + ' '+ mm + ' ' + yyyy + ', ' + hh + ':' + mn + ' WIB'
    }
    changeNumber (dates) {
        let dump = new Date(dates)
        let dd = dump.getDate()
        if (dd < 10) dd = '0' + dd
        return dd
    }
    changeMonth (dates) {
        const month = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES']
        let dump = new Date(dates)
        return month[dump.getMonth()] 
    }
    changeDay (dates) {
        const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
        let dump = new Date(dates)
        return days[dump.getDay()] 
    }
    changeYear (dates) {
        let dump = new Date(dates)
        return dump.getFullYear()
    }
    changeStartTime (time) {
        return time.substr(0, 2) 
    }

    changeToTime (time) {
        return time.substr(3, 2) 
    }
    checkDayOff (date) {
        let stringDay =this.changeDay(date);
        for (let i = 0 ; i< dayoff.length; i ++) {
            if (dayoff[i].day === date) {
                return 1;
            }
            else if(stringDay === "MIN") {
                return 1;
            }
        }
        return 0;
    }
    checkDateOff (date) {
        let stringDay =this.changeDay(date);
        if(stringDay === "JUM") {
            return 1;
        }else { return 0 }
    }
    setCurrentDate(currentDate) {
        this.currentDate = dayjs(currentDate, "YYYY-MM-DD")
        this.textCurrentDate = currentDate;
    }
    getTotalWorkDay(momentDate, number) {
        let stringDay = momentDate.format("dd");
        switch (stringDay) {
            case "Su":
                return this.getTotalWorkDay(momentDate.add(1, "days"),number+1);
                break;
            default:
                if (number >= 2) {
                    return number;
                } else {
                    return this.getTotalWorkDay(momentDate.add(1, "days"),number+1);
                }
                break;
        }
    }
    setStartDate() {
        let dateShipping = dayjs(this.currentDate).add(1, 'day')
        let  dumpDate = new Date(dateShipping.format("YYYY-MM-DD"));
        while(this.startShipping.length < 2) {
            const momentDate = dayjs(this.getValidDate(dumpDate));
            this.startShipping.push(momentDate.format("YYYY-MM-DD"));
            dumpDate = new Date(momentDate);
            dumpDate = new Date(dumpDate.setDate(dumpDate.getDate() + 1));
         };
        this.startDate = dumpDate
    }
    getValidDate(currentDate) {
        let textDay = dayjs(currentDate).format("dd");
        const dayoffDump = dayjs(currentDate).format("DD/MMM/YYYY")
        let i = 0 ;
        while (i< dayoff.length) {
            if (dayoff[i].day === dayoffDump) {
                return this.getValidDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
            }
            else if(textDay=== "Su") {
                return this.getValidDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
            }
            else {
                i++;
            }
        }
        return currentDate
    }
    setRangeDays() {
        let nowDate = this.startDate;
        while(this.listRangeDays.length < 2) {
           const momentDate = dayjs(this.getValidDate(nowDate));
           this.listRangeDays.push(momentDate.format("YYYY-MM-DD"));
           nowDate = new Date(momentDate);
           nowDate = new Date(nowDate.setDate(nowDate.getDate() + 1));
        };
    }
    handle(callback) {
        this.setStartDate();
        this.setRangeDays();
        callback(this.listRangeDays)
    }
    checkBrowser() {
        let objappVersion = navigator.appVersion; 
        let objAgent = navigator.userAgent; 
        let objbrowserName = navigator.appName; 
        let objfullVersion = ''+parseFloat(navigator.appVersion); 
        let objBrMajorVersion = parseInt(navigator.appVersion,10); 
        let objOffsetName,objOffsetVersion,ix; 
        // In Chrome 
        if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { 
            objbrowserName = "Chrome"; objfullVersion = objAgent.substring(objOffsetVersion+7); 
        } 
        // In Microsoft internet explorer 
        else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { 
            objbrowserName = "Microsoft Internet Explorer"; objfullVersion = objAgent.substring(objOffsetVersion+5); 
        } 
        // In Firefox 
        else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
            objbrowserName = "Firefox"; 
        } 
        // In Safari 
        else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
            objbrowserName = "Safari"; 
            objfullVersion = objAgent.substring(objOffsetVersion+7); 
            if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
        } 
        // For other browser "name/version" is at the end of userAgent 
        else if ( (objOffsetName=objAgent.lastIndexOf(' ')+1) < (objOffsetVersion=objAgent.lastIndexOf('/')) ) { 
            objbrowserName = objAgent.substring(objOffsetName,objOffsetVersion); objfullVersion = objAgent.substring(objOffsetVersion+1); 
            if (objbrowserName.toLowerCase()==objbrowserName.toUpperCase()) { objbrowserName = navigator.appName; } 
        }         

        // trimming the fullVersion string at semicolon/space if present 
        if ((ix=objfullVersion.indexOf(";"))!=-1) objfullVersion=objfullVersion.substring(0,ix); if ((ix=objfullVersion.indexOf(" "))!=-1) objfullVersion=objfullVersion.substring(0,ix); objBrMajorVersion = parseInt(''+objfullVersion,10); if (isNaN(objBrMajorVersion)) { objfullVersion = ''+parseFloat(navigator.appVersion); objBrMajorVersion = parseInt(navigator.appVersion,10); }


        console.log(objBrMajorVersion);
    }
    checkHarboltong (date) {
        for (let i = 0 ; i< harboltong.length; i ++) {
            if (harboltong[i].day === date) {
                return 1;
            }
        }
        return 0;
    }
}

export default Helper