/* eslint-disable import/no-anonymous-default-export */
const { alert } = window;

const week = ['일', '월', '화', '수', '목', '금', '토'];

export default {
  checkNull(str) {
    if (typeof str === 'undefined' || str === null || str === '') {
      return true;
    }
    return false;
  },
  convertUTCToISODate(d0) {
    const d = new Date(d0);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0];
  },
  checkCrn(number) {
    const numberMap = number
      .replace(/-/gi, '')
      .split('')
      .map(d => {
        return parseInt(d, 10);
      });

    if (numberMap.length === 10) {
      const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let chk = 0;

      keyArr.forEach((d, i) => {
        chk += d * numberMap[i];
      });

      chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10);
      return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
    }

    return false;
  },
  checkHomepage(url) {
    const regex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    return regex.test(url);
  },
  checkPhoneNumber(phoneNumber) {
    if (phoneNumber.toString().split('-').length !== 3) {
      // 1) - 가 없는경우
      const regex = /^[0-9]{9,12}$/;
      return regex.test(phoneNumber);
    }
    // 1) - 가 있는경우
    const regex = /^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}$/;
    return regex.test(phoneNumber);
  },
  checkEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
  /*
  ※ 이름 마스킹
  ex1) 원본 데이터: 펜타컴, 변경 데이터: 펜*컴
  ex2) 원본 데이터: 구글, 변경 데이터: 구*
  ex3) 원본 데이터: 더그래픽노블스, 변경 데이터: 더*****스
  */
  maskingName(name) {
    if (name.length > 2) {
      const originName = name.split('');
      originName.forEach((_, i) => {
        if (i === 0 || i === originName.length - 1) return;
        originName[i] = '*';
      });
      const joinName = originName.join();
      return joinName.replace(/,/g, '');
    }
    const pattern = /.$/; // 정규식
    return name.replace(pattern, '*');
  },
  /*
  * ID 마스킹
    ex1) 원본 데이터: 펜타컴, 변경 데이터: 펜타컴
    ex2) 원본 데이터: 더그래픽노블스, 변경 데이터: 더그래픽노**
  */
  maskingId(id) {
    if (id.length < 4) {
      return id;
    }
    const pattern = /.{2}$/; // 정규식
    return id.replace(pattern, '**');
  },
  /* 
  ※ 휴대폰 번호 마스킹 
  ex1) 원본 데이터 : 01012345678, 변경 데이터 : 010****5678 
  ex2) 원본 데이터 : 010-1234-5678, 변경 데이터 : 010-****-5678 
  ex3) 원본 데이터 : 0111234567, 변경 데이터 : 011***4567 
  ex4) 원본 데이터 : 011-123-4567, 변경 데이터 : 011-***-4567 
  */
  maskingPhoneNumber(str) {
    const originStr = str;
    let phoneStr;
    let maskingStr;
    if (this.checkNull(originStr) === true) {
      return originStr;
    }
    if (originStr.toString().split('-').length !== 3) {
      // 1) -가 없는 경우
      phoneStr =
        originStr.length < 11
          ? originStr.match(/\d{10}/gi)
          : originStr.match(/\d{11}/gi);
      if (this.checkNull(phoneStr) === true) {
        return originStr;
      }
      if (originStr.length < 11) {
        // 1.1) 0110000000
        maskingStr = originStr
          .toString()
          .replace(
            phoneStr,
            phoneStr.toString().replace(/(\d{3})(\d{3})(\d{4})/gi, '$1***$3'),
          );
      } else {
        // 1.2) 01000000000
        maskingStr = originStr
          .toString()
          .replace(
            phoneStr,
            phoneStr.toString().replace(/(\d{3})(\d{4})(\d{4})/gi, '$1****$3'),
          );
      }
    } else {
      // 2) -가 있는 경우
      phoneStr = originStr.match(/\d{2,3}-\d{3,4}-\d{4}/gi);
      if (this.checkNull(phoneStr) === true) {
        return originStr;
      }
      if (/-[0-9]{3}-/.test(phoneStr)) {
        // 2.1) 00-000-0000
        maskingStr = originStr
          .toString()
          .replace(
            phoneStr,
            phoneStr.toString().replace(/-[0-9]{3}-/g, '-***-'),
          );
      } else if (/-[0-9]{4}-/.test(phoneStr)) {
        // 2.2) 00-0000-0000
        maskingStr = originStr
          .toString()
          .replace(
            phoneStr,
            phoneStr.toString().replace(/-[0-9]{4}-/g, '-****-'),
          );
      }
    }
    return maskingStr;
  },
  checkImageFile(file) {
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert(`jpg, png 파일만 선택해 주세요.\n\n현재 파일 : ${file.name}`);
      return false;
    }
    return true;
  },
  checkFileSize(file, size) {
    if (file.size > 1024 * 1024 * size) {
      // 용량 초과시 경고후 해당 파일의 용량도 보여줌
      alert(
        `${'2MB 이하 파일만 등록할 수 있습니다.\n\n현재파일 용량 : '}${
          Math.round((file.size / 1024 / 1024) * 100) / 100
        }MB`,
      );
      return false;
    }
    return true;
  },
  toStringDateFormat(dateStr, gubun, until) {
    const yyyyMMdd = String(dateStr);
    const sYear = yyyyMMdd.substring(0, 4);
    const sMonth = yyyyMMdd.substring(4, 6);
    const sDate = yyyyMMdd.substring(6, 8);

    return sYear + gubun + sMonth + gubun + sDate;
  },
  getDateRange(startDate, endDate, listDate) {
    const dateMove = new Date(startDate);

    let strDate = startDate;

    if (startDate === endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      const today = new Date(strDate).getDay();
      listDate.push({
        text: strDate.slice(5).replace(/-/g, '.'),
        date: strDate,
        label: week[today],
      });
    } else {
      while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        const today = new Date(strDate).getDay();
        listDate.push({
          text: strDate.slice(5).replace(/-/g, '.'),
          date: strDate,
          label: week[today],
        });
        dateMove.setDate(dateMove.getDate() + 1);
      }
    }

    return listDate;
  },
  copyToClipboard(val) {
    const brRegex = /<br\s*[\\/]?>/gi;

    const t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = val.replace(brRegex, '\r\n');
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  },
  getToday(gubun) {
    const date = new Date();
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());

    // 한자리수일 경우 0을 채워준다.
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }

    return `${year}${gubun}${month}${gubun}${day}`;
  },
  checkUrl(url) {
    const regex = /http:\/\/|https:\/\//gi;
    if (regex.test(url)) {
      return url;
    }
    return `http://${url}`;
  },
  betweenTime(startTime, endTime, startDate, endDate) {
    const thisDate = startDate || this.getToday('-');
    const otherDate = endDate || thisDate;

    const start = new Date(`${thisDate}T${startTime}`);
    const end = new Date(`${otherDate}T${endTime}`);
    const now = new Date();

    if (start.getTime() <= now.getTime() && now.getTime() <= end.getTime()) {
      return true;
    }
    return false;
  },
  openTime(startTime, date) {
    const thisDate = date || this.getToday('-');
    const start = new Date(`${thisDate}T${startTime}`);
    const now = new Date();

    if (start.getTime() <= now.getTime()) {
      return true;
    }
    return false;
  },
  getFormatDate(date, gubun) {
    const year = date.getFullYear(); // yyyy
    let month = 1 + date.getMonth(); // M
    month = month >= 10 ? month : `0${month}`; // month 두자리로 저장
    let day = date.getDate(); // d
    day = day >= 10 ? day : `0${day}`; // day 두자리로 저장

    if (gubun) {
      return `${year}${gubun}${month}${gubun}${day}`;
    }
    return `${year}${month}${day}`;
  },
  getFormatTime(date) {
    let hour = date.getHours();
    hour = hour >= 10 ? hour : `0${hour}`;
    let min = date.getMinutes();
    min = min >= 10 ? min : `0${min}`;
    let sec = date.getSeconds();
    sec = sec >= 10 ? sec : `0${sec}`;

    return `${hour}:${min}:${sec}`;
  },
  // array 나누기
  arrDivision(arr, n) {
    const len = arr.length;
    const cnt = Math.floor(len / n);
    const tmp = [];

    for (let i = 0; i <= cnt; i += 1) {
      tmp.push(arr.splice(0, n));
    }

    return tmp.filter(data => data.length > 0);
  },
};
